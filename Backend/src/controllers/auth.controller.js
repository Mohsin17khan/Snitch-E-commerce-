import { config } from "../config/config.js";
import userModel from "../models/user.model.js";
import JWT from "jsonwebtoken";

async function generateToken(user, res) {
  const token = JWT.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    config.JWT_SECRET,
    { expiresIn: "2d" },
  );

  res.cookie("token", token);

  return token;
}

export const register = async (req, res) => {
  const { fullName, email, contact, password, isSeller } = req.body;

  try {
    const isUserExist = await userModel.findOne({
      $or: [{ email }, { contact }],
    });

    if (isUserExist) {
      return res
        .status(400)
        .json({ message: "User with this email or contact already exists" });
    }

    const user = await userModel.create({
      fullName,
      email,
      contact,
      password,
      role: isSeller ? "seller" : "buyer"
    });

    generateToken(user, res);

    return res
      .status(201)
      .json({ message: "User registered successfully", user });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({
      email,
    });
    
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    generateToken(user, res);
    return res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};



export const googleCallBack = async ( req, res ) => {
  const { id, displayName, emails, photos } = req.user
  const email = emails[0].value;
  const profilePic = photos[0].value

  let user = await userModel.findOne({
    email
  });

  if(!user) {
    user = await userModel.create({
      email,
      fullName:displayName,
      googleId:id

    })
  }

 const token = JWT.sign(
    {
      id: user._id,
    },
    config.JWT_SECRET,
    { expiresIn: "7d" },
  );

  res.cookie("token", token);

  res.redirect("http://localhost:5173/")
}