const Blog = require("../models/blogModel.js");
const { errorHandler } = require("../utils/error.js");

const createBlog = async (req, res, next) => {
  try {
    const blog = await Blog.create(req.body.body);
    return res.status(201).json({ status: true, blog });
  } catch (error) {
    next(error);
  }
};

const deleteBlog = async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return next(errorHandler(404, "Blog not found!"));
  }

  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: true, message: "Blog has been deleted!" });
  } catch (error) {
    next(error);
  }
};

const updateBlog = async (req, res, next) => {
  const listing = await Blog.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, "Blog not found!"));
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body.body,
      {
        new: true,
      }
    );
    res.status(200).json(updatedBlog);
  } catch (error) {
    next(error);
  }
};

const getBlog = async (req, res, next) => {
  try {
    const listing = await Blog.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, "Blog not found!"));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

const getBlogs = async (req, res, next) => {
  try {
    const { search, skip } = req.query;

    let query = {};
    if (search) {
      query = { name: { $regex: search, $options: "i" } };
    }

    const blogs = await Blog.find({
      ...query,
    })
      .sort({ _id: -1 })
      .skip(parseInt(skip))
      .limit(20);
    res.json(blogs);
  } catch (error) {
    next(error);
  }
};

module.exports = { createBlog, deleteBlog, updateBlog, getBlog, getBlogs };
