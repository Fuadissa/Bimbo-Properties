import React, { useEffect, useMemo, useRef, useState } from "react";
import { app } from "../../../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageUploader from "quill-image-uploader";
import "firebase/storage";
import "./AddBlog.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import DOMPurify from "dompurify";
Quill.register("modules/imageUploader", ImageUploader);

const UpdateBlog = () => {
  const [formData, setFormData] = useState({
    description: "",
    title: "",
  });
  const params = useParams();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const oldListing = async () => {
      const blogId = params.blogId;
      const { data } = await axios.get(`/api/blog/get/${blogId}`);

      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setFormData(data);
      const sanitizedContent = DOMPurify.sanitize(data.description);
      setEditorHtml(sanitizedContent);
    };
    oldListing();
  }, [params.blogId]);

  const [editorHtml, setEditorHtml] = useState("");
  const navigate = useNavigate();

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "image"],
          ["clean"],
        ],
      },
      imageUploader: {
        upload: (file) => {
          return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
              "state_changed",
              (snapshot) => {
                const progress =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload is ${progress}% done`);
              },
              (error) => {
                reject(error);
              },
              () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  // const range = editorRef.current.getSelection();
                  // editorRef.current.insertEmbed(
                  //   range.index,
                  //   "image",
                  //   downloadURL
                  // );
                  resolve(downloadURL);
                });
              }
            );
          });
        },
      },
    }),
    []
  );

  const editorRef = useRef(null);

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  const handleEditorChange = (html) => {
    setEditorHtml(html);
    setFormData((prev) => ({ ...prev, description: html }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      if (!formData.title && !formData.description)
        return setError("You must input some data");
      setLoading(true);
      setError(false);
      const res = await axios.post(`/api/blog//update/${params.blogId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          ...formData,
        },
      });
      console.log(res);
      setLoading(false);
      if (res.data.status) {
        navigate(`/blog/${res.data.blog._id}`);
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <form className="add-blog__div" onSubmit={handleSubmit}>
      <h2>Update Blog</h2>
      <div className="add-blog__title">
        <h3> Update Title</h3>
        <input
          placeholder="Your blog article..."
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
        />
      </div>
      <div className="add-blog__descrip">
        <h3>Update Description</h3>
        <ReactQuill
          theme="snow"
          value={editorHtml}
          onChange={handleEditorChange}
          modules={modules}
          formats={formats}
          placeholder="Write something..."
          ref={editorRef}
          className="react-quill"
        />
      </div>
      <button className="add-blog__btn">Update Blog</button>
    </form>
  );
};

export default UpdateBlog;
