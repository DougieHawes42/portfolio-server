const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  if (!email || !password || !confirmPassword) {
    return res.status(400).send("All fields are required");
  }

  if (password !== confirmPassword) {
    return res.status(400).send("Passwords do not match");
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).send("Invalid credentials");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(201).send({
      user: {
        id: newUser._id,
        email: newUser.email,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  } finally {
  }
};

exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("All fields are required");
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).send("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send("Invalid credentials");
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(200).send({
      user: {
        id: user._id,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
