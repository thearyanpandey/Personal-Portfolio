import express from "express";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { v2 as cloudinary } from "cloudinary";
import User from "../models/userSchema.js";
import crypto from "crypto";
import { generateToken } from "../utils/jwtToken.js";
import lib from "express-fileupload";
import { sendEmail } from "../utils/sendEmail.js";
import Project from "../models/projectSchema.js";
import Skill from "../models/skillSchema.js";

export const register = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Avatar Required!!", 400));
  }

  const { avatar } = req.files;

  //Posting Avatar
  const cloudinaryResponseForAvatar = await cloudinary.uploader.upload(
    avatar.tempFilePath,
    { folder: "PORTFOLIO AVATAR" }
  );

  if (!cloudinaryResponseForAvatar || cloudinaryResponseForAvatar.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponseForAvatar.error || "Some cloudinary error"
    );
    return next(new ErrorHandler("Cloudinary upload of Avatar failed", 500));
  }

  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    aboutMe,
    education,
    awards,
    city,
    password,
    portfolio,
    ResumeLink,
    gitHub,
    instagram,
    twitter,
    linkedIn,
  } = req.body;

  const user = await User.create({
    firstName,
    lastName,
    email,
    education,
    awards,
    phoneNumber,
    aboutMe,
    password,
    portfolio,
    ResumeLink,
    gitHub,
    city,
    instagram,
    twitter,
    linkedIn,
    avatar: {
      public_id: cloudinaryResponseForAvatar.public_id,
      url: cloudinaryResponseForAvatar.secure_url,
    },
  });
  generateToken(user, "Registered!", 201, res);
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    console.log("Missing email or password"); // Debug log
    return next(new ErrorHandler("Provide Email And Password!", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    console.log("User not found"); // Debug log
    return next(new ErrorHandler("Invalid Email Or Password", 404));
  }

  const isPasswordMatched = await user.comparePassword(password);
  console.log("Password match:", isPasswordMatched); // Debug log

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email Or Password", 401));
  }
  generateToken(user, "Login Successfully!", 200, res);
});

export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      httpsOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logged Out Successfully",
    });
});

export const getUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});

export const updateProfile = catchAsyncErrors(async (req, res, next) => {
  // Debug logging
  console.log("Request Files:", req.files);
  console.log("Request Body:", req.body);

  try {
    const newUserData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      education: req.body.education,
      aboutMe: req.body.aboutMe,
      awards: req.body.awards,
      city: req.body.city,
      gitHub: req.body.gitHub,
      instagram: req.body.instagram,
      portfolio: req.body.portfolio,
      twitter: req.body.twitter,
      linkedIn: req.body.linkedIn,
      ResumeLink: req.body.ResumeLink,
    };

    // Handle file upload
    if (req.files && req.files.avatar) {
      // Get existing user to delete old avatar
      const user = await User.findById(req.user.id);
      if (user.avatar && user.avatar.public_id) {
        await cloudinary.uploader.destroy(user.avatar.public_id);
      }

      // Upload new avatar
      const avatar = req.files.avatar;
      const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];

      if (!allowedTypes.includes(avatar.mimetype)) {
        return res.status(400).json({
          success: false,
          message: "Please upload an image file (png, jpg, jpeg)",
        });
      }

      const newProfileImage = await cloudinary.uploader.upload(
        avatar.tempFilePath,
        {
          folder: "PORTFOLIO AVATAR",
        }
      );

      newUserData.avatar = {
        public_id: newProfileImage.public_id,
        url: newProfileImage.secure_url,
      };
    }

    // Update user
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      message: "Profile Updated Successfully!",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export const updatePassword = catchAsyncErrors(async (req, res, next) => {
  const { currentPassword, newPassword, confirmNewPassword } = req.body;
  const user = await User.findById(req.user.id).select("+password");

  if (!currentPassword || !newPassword || !confirmNewPassword) {
    return next(new ErrorHandler("Please fill all the fields!!", 400));
  }

  const isMatchedPassword = await user.comparePassword(currentPassword);

  if (!isMatchedPassword) {
    return next(new ErrorHandler("Please enter correct password", 400));
  }

  if (newPassword !== confirmNewPassword) {
    return next(
      new ErrorHandler("New Password And Confirm New Password Do Not Match!")
    );
  }

  user.password = newPassword;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Password Updated!",
  });
});


export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User does not Exists", 404));
  }

  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordURL = `${process.env.DASHBORD_URL}/password/reset/${resetToken}`;

  const message = `Your Reset Password Token is:- \n\n ${resetPasswordURL}  \n\n If 
  You've not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Personal Portfolio Dashboard Password Recovery`,
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

export const resetPassword = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.params;
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Reset password token is invalid or has been expired.",
        400
      )
    );
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password & Confirm Password do not match"));
  }
  user.password = await req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  generateToken(user, "Reset Password Successfully!", 200, res);
});

export const getUserForPortfolio = catchAsyncErrors(async (req, res, next) => {
  const id = "6721bacfb7f3f0ab369bb136";
  const user = await User.findById(id);
  res.status(200).json({
    success: true,
    user,
  });
});