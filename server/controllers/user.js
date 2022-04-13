import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User not found" });
    const isValidPassword = bcrypt.compare(password, existingUser.password);
    if (!isValidPassword)
      return res.status(401).json({ message: "Invalid credentials" });
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      `secret123`,
      { expiresIn: "2h" }
    );
    res.status(200).json({ data: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signUp = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(409).json({ message: "User already registered" });
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      name: `${firstName} ${lastName}`,
      email,
      password: hashedPassword,
    });
    await user.save();
    const token = jwt.sign({ email: user.email, id: user._id }, "secret123", {
      expiresIn: "2h",
    });
    res.status(201).json({ data: user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
