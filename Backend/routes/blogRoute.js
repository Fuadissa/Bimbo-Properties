const express = require("express");
const {
  createBlog,
  deleteBlog,
  updateBlog,
  getBlog,
  getBlogs,
} = require("../controllers/blogsController");

const router = express.Router();

router.post("/create", createBlog);
router.delete("/delete/:id", deleteBlog);
router.post("/update/:id", updateBlog);
router.get("/get/:id", getBlog);
router.get("/", getBlogs);

module.exports = router;
