import React, { useEffect, useState } from "react";
import "../../Listing/AllListing/AllListing.css";
import House5Lg from "../../../../assets/img/houses/house5lg.png";
import { MdDelete } from "react-icons/md";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import axios from "axios";
import { ImSpinner2 } from "react-icons/im";

const AllBlog = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      if (!skip) {
        setLoading(true);
      }
      const response = await axios.get(
        `/api/blog?search=${searchData.query || ""}&skip=${skip}`
      );
      const newProducts = response.data;
      if (!skip) {
        setProducts(newProducts);
        setLoading(false);
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

  const [searchData, setSearchData] = useState({
    query: "",
  });

  const filterSearchDatas = (e) => {
    e.preventDefault();
    // navigate(
    //   `/admin/all-listing/${searchData.query || ""}/${searchData.sort || ""}/${
    //     searchData.price || ""
    //   }/${searchData.state || ""}`
    // );
    setSkip(0);
    fetchProducts();
  };

  const deleteBlog = async (deleteId) => {
    const { data } = await axios.delete(`/api/blog/delete/${deleteId}`);
    if (data.status) {
      const updatedItems = products.filter((item) => item._id !== deleteId);
      setProducts(updatedItems);
    }
  };

  const extractFirstImageUrl = (htmlContent) => {
    const doc = new DOMParser().parseFromString(htmlContent, "text/html");
    const imgElement = doc.querySelector("img");

    if (imgElement) {
      const imageUrl = imgElement.getAttribute("src");
      return imageUrl;
    }
  };

  const [skipLoader, setSkipLoader] = useState(false);

  const skipBtn = () => {
    setSkipLoader(true);
    setSkip((prev) => prev + 20);
  };
  return (
    <div className="all-listing__div">
      <h2>All Blogs</h2>
      <form className="all-listing__firstDiv" onSubmit={filterSearchDatas}>
        <div>
          <input
            placeholder="Enter Your Keyboard..."
            onChange={(e) =>
              setSearchData((prev) => ({ ...prev, query: e.target.value }))
            }
          />
        </div>
        <button>Search</button>
      </form>
      {loading ? (
        <div className="mb-[12rem] h-[80vh] flex justify-center items-center">
          <ImSpinner2 className="mx-auto animate-spin text-[#0b2850] text-4xl mt-[200px]" />
        </div>
      ) : (
        <div className="all-blog__imageCard__grid">
          {products.map((blog) => (
            <div key={blog._id} className="all-blog__imageCard">
              <img src={extractFirstImageUrl(blog.description)} alt="" />
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
                <div className="all-listing__card__bottom">
                  <div>
                    <div className="all-listing__card__avatar">
                      <img src={House5Lg} alt="" />
                    </div>
                    <h3>Litvak</h3>
                  </div>
                  <div className="all-blog__icons">
                    <div>
                      <Link to={`/admin/update-blog/${blog._id}`}>
                        <BiSolidMessageSquareEdit />
                      </Link>
                    </div>
                    <div onClick={() => deleteBlog(blog._id)}>
                      <MdDelete />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {skipLoader ? (
        <div className="mb-[12rem] h-[30vh] flex justify-center items-center">
          <ImSpinner2 className="mx-auto animate-spin text-[#0b2850] text-4xl mt-[200px]" />
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

export default AllBlog;
