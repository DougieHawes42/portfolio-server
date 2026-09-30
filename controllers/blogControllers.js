const cloudinary = require("../config/cloudinary");

const Blog = require("../models/blogModel");

exports.createBlog = async (req, res) => {
  try {
    console.log("Request body:", req.body);

    const { title, text } = req.body;

    const tags = JSON.parse(req.body.tags);

    const imageUploads = req.files.map((file) => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "portfolio-blog",
          },
          (error, result) => {
            if (error) {
              return reject(error);
            }

            resolve(result.secure_url);
          },
        );

        uploadStream.end(file.buffer);
      });
    });

    const images = await Promise.all(imageUploads);

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
