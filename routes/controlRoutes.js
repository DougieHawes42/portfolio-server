const router = require("express").Router();

const { sendEmail } = require("../controllers/contactControllers.js");

router.post("/send-email", sendEmail);

module.exports = router;
