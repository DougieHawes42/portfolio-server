const cloudinary = require("../config/cloudinary");

const Work = require("../models/workModel");

exports.createWork = async (req, res) => {
  try {
    const {
      title,
      category,
      gitHubClientLink,
      gitHubServerLink,
      siteLink,
      description,
    } = req.body;

    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    const tags = req.body.tags
      .split(" ")
      .map((tag) => tag.trim())
      .filter(Boolean);

    const imageUploads = req.files.map((file) => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "portfolio-work",
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

    const newWork = await Work.create({
      title,
      category,
      gitHubClientLink,
      gitHubServerLink,
      siteLink,
      description,
      tags,
      images,
    });

    res.status(201).json(newWork);
  } catch (error) {
    console.error("CREATE WORK ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getWork = async (req, res) => {
  try {
    const work = await Work.find();

    res.status(200).send(work);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

exports.getWorkItem = async (req, res) => {
  const id = req.params.id;

  try {
    const workItem = await Work.findById(id);

    res.status(200).send(workItem);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};
