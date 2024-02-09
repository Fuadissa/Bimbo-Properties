import React, { useEffect, useState } from "react";
import "./Blogs.css";
import axios from "axios";
import DOMPurify from "dompurify";
import { ImSpinner2 } from "react-icons/im";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Blogs = () => {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);

  const [loading, setLoading] = useState(false);
  const fetchProducts = async () => {
    try {
      if (!skip) {
        setLoading(true);
      }
      const response = await axios.get(`/api/blog?skip=${skip}`);
      const newProducts = response.data;
      if (!skip) {
        setProducts(newProducts);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } else {
        if (!newProducts.length) {
          setSkip(0);
        }
        setProducts((prevProducts) => [...prevProducts, ...newProducts]);
        setSkipLoader(false);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [skip]);

  const extractFirstImageUrl = (htmlContent) => {
    const doc = new DOMParser().parseFromString(htmlContent, "text/html");
    const imgElement = doc.querySelector("img");

    if (imgElement) {
      const imageUrl = imgElement.getAttribute("src");
      return imageUrl;
    }
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const [skipLoader, setSkipLoader] = useState(false);

  const skipBtn = () => {
    setSkipLoader(true);
    setSkip((prev) => prev + 20);
  };

  return (
    <div>
      <motion.div
        className="blog__div__image"
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
        transition={{ duration: 1 }}
      >
        <div></div>
        <p>Blogs</p>
      </motion.div>
      <div className="our__blog__div">
        <h2>Our Blogs</h2>
      </div>
      {loading ? (
        <div className="mb-[12rem] h-[80vh] flex justify-center items-center">
          <ImSpinner2 className="mx-auto animate-spin text-[#65ed5a] text-4xl mt-[200px]" />
        </div>
      ) : (
        <div className="blogs__grid__div">
          {products.map((blog, index) => (
            <Link to={`/blog/${blog._id}`} key={blog._id}>
              <div key={blog._id} className="all-blog__imageCard__about">
                <img
                  src={extractFirstImageUrl(blog.description)}
                  alt="blogsImages"
                />
                <div className="all-blog__innerCard__div">
                  <div className="all-blog__innerCard__div__h2Div">
                    <h2>{blog.title}</h2>
                  </div>
                  <div className="all-blog__card__descrip">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(blog.description, {
                          ALLOWED_TAGS: [],
                        }),
                      }}
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      {skipLoader ? (
        <div className="mb-[12rem] h-[30vh] flex justify-center items-center">
          <ImSpinner2 className="mx-auto animate-spin text-[#65ed5a] text-4xl mt-[200px]" />
        </div>
      ) : (
        ""
      )}
      <div className="handle__show__more">
        <button
          disabled={skipLoader}
          onClick={() => skipBtn()}
          className="hover:opacity-95 disabled:opacity-80"
        >
          {skipLoader ? "Loading..." : "Show More"}
        </button>
      </div>
    </div>
  );
};

export default Blogs;
