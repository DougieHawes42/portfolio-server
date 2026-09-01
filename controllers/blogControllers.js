const Blog = require("../models/blogModel");

exports.createBlog = async (req, res) => {
  try {
    const { title, text, tags, images } = req.body;

    const newBlog = await Blog.create({
      title,
      text,
      tags,
      images,
    });

    res.status(201).send(newBlog);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getBlog = async (req, res) => {
  try {
    const blogs = await Blog.find();

    res.status(200).send(blogs);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

exports.getBlogItem = async (req, res) => {
  const id = req.params.id;

  try {
    const BlogItem = await Blog.findById(id);

    res.status(200).send(BlogItem);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};
