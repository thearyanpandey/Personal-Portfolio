import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from 'crypto'

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "FirstName Required"],
  },
  lastName: {
    type: String,
    required: [true, "LastName Required"],
  },
  email: {
    type: String,
    required: [true, "Email Required"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone Number Required"],
  },
  aboutMe: {
    type: String,
    required: [true, "About Me Required"],
  },
  education: [{
    type: String,
    required: [true, "Education Required"],
  }],
  awards: {
    type: String,
  },
  city: {
    type: String,
    required: [true, "About Me Required"],
  },
  password: {
    type: String,
    required: [true, "Password Required"],
    minLenght: [6, "Password should be minimum of 6 character long"],
    select: false, //this will don't get fetched when you'll access the userSchema by default
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  portfolio: {
    type: String,
  },
  gitHub: {
    type: String,
  },
  instagram: {
    type: String,
  },
  twitter: {
    type: String,
  },
  linkedIn: {
    type: String,
  },
  ResumeLink: {
    type: String,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

//Address missing?

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//this is schema method to compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateJsonWebToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

//Genreating Reset Password
userSchema.methods.getResetPasswordToken = function () {
  //Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  //Hashing and Adding Reset Password Token To Schema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  //Setting Reset Password Token Expiry Time
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model("User", userSchema);
export default User;
