import React, { useEffect, useState } from "react";
import "./BlogDetails.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import DOMPurify from "dompurify";
import { ImSpinner2 } from "react-icons/im";

const BlogDetails = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const oldListing = async () => {
      setLoading(true);
      const blogId = id;
      const { data } = await axios.get(`/api/blog/get/${blogId}`);

      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setFormData(data);
      setLoading(false);
    };
    oldListing();
  }, [id]);

  if (loading) {
    return (
      <div className="mb-[12rem] h-[100vh] flex justify-center items-center">
        <ImSpinner2 className="mx-auto animate-spin text-[#65ed5a] text-4xl mt-[200px]" />
      </div>
    );
  }
  return (
    <div className="blog__details__article__cont">
      <h1>{formData?.title}</h1>
      <div
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(formData?.description),
        }}
        className="blog__details__article"
      />
    </div>
  );
};

export default BlogDetails;
