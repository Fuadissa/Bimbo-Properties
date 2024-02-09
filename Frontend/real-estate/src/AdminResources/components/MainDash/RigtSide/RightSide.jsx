import React from "react";
import "./RightSide.css";
import House8Lg from "../../../../assets/img/houses/house8lg.png";
import DOMPurify from "dompurify";
import { Link } from "react-router-dom";

const RightSide = ({ adminBlog }) => {
  const extractFirstImageUrl = (htmlContent) => {
    const doc = new DOMParser().parseFromString(htmlContent, "text/html");
    const imgElement = doc.querySelector("img");

    if (imgElement) {
      const imageUrl = imgElement.getAttribute("src");
      return imageUrl;
    }
  };
  return (
    <div className="rightside__blog__cont">
      <h2>Blogs</h2>

      {adminBlog.slice(0, 3).map((blog) => (
        <div className="rightside__blog__card">
          <img src={extractFirstImageUrl(blog.description)} alt="" />
          <div>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(blog.description, {
                  ALLOWED_TAGS: [],
                }),
              }}
              className="rightside__blog__card__title"
            />
          </div>
        </div>
      ))}
      <Link to="/admin/all-blog">
        <button className="righside__blog__btn">See all blogs</button>
      </Link>
    </div>
  );
};

export default RightSide;
