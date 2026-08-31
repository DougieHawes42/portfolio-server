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
      tags,
    } = req.body;

    const images = req.files.map((file) => file.filename);

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

    res.status(201).send(newWork);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getWork = async (req, res) => {
  try {
    const work = await Work.find();

    res.status(200).send(work);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
