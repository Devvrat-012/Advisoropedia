import bcryptjs from "bcryptjs";
import User from "../modals/user.modal.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const signUp = async (req, res, next) => {
  const { name, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ name, email, password: hashedPassword });
  try {
    const checkUser = await User.findOne({ email });
    if (checkUser) return res.json("User already exists!");
    await newUser.save();
    res.status(201).json("User created successfully!");
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandller(404, "User not found!"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandller(401, "Wrong Credentials!"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    const expirationTime = new Date();
    expirationTime.setDate(expirationTime.getDate() + 1);
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("my_token", token, { httpOnly: true, expires: expirationTime })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
