import mongoose from "mongoose";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { v2 as cloudinary } from "cloudinary";
import Skill from "../models/skillSchema.js";
import ErrorHandler from "../middlewares/error.js";

export const addNewSkill = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Skills Banner Required!!", 400));
  }

  const { svg } = req.files;
  const {
    title,
    proficiency,
  } = req.body;

  if (
    !title ||
    !proficiency
  ) {
    return next(new ErrorHandler("Please provide all the details", 400));
  }

  const cloudinaryResponseForSkillSvg = await cloudinary.uploader.upload(
    svg.tempFilePath,
    { folder: "PORTFOLIO SKILL SVG" }
  );
  if (!svg || !svg.tempFilePath) {
    return next(new ErrorHandler("File upload failed or no tempFilePath available", 400));
  }

  if (
    !cloudinaryResponseForSkillSvg ||
    cloudinaryResponseForSkillSvg.error
  ) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponseForSkillSvg.error || "Some cloudinary error "
    );
    return next(
      new ErrorHandler("Cloudinary upload of skill svg failed", 500)
    );
  }

  const skill = await Skill.create({
    title,
    proficiency,
    skillSvg: {
      public_id: cloudinaryResponseForSkillSvg.public_id,
      url: cloudinaryResponseForSkillSvg.secure_url,
    },
    user: req.user._id,
  });

  res.status(200).json({
    success: true,
    message: "Skill Added",
    skill,
  });
});

export const deleteSkill = catchAsyncErrors(async (req, res, next) => {

   const { id } = req.params;
    let skill = await Skill.findById(id);
    if (!skill) {
      return next(new ErrorHandler("Already Deleted!", 404));
    }

  const skillSvgImg = skill.skillSvg.public_id;
  await cloudinary.uploader.destroy(skillSvgImg);
  await skill.deleteOne();
  res.status(200).json({
    success: true,
    message: "Skill Deleted!",
  });
});

export const updateSkill = catchAsyncErrors(async (req, res, next) => {

 const { id } = req.params;
   let skill = await Skill.findById(id);
   if (!skill) {
     return next(new ErrorHandler("Skill not found!", 404));
   }

  const { proficiency } = req.body;
  const UpdatedSkill = await Skill.findByIdAndUpdate(
    id,
    { proficiency },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.status(200).json({
    success: true,
    message: "Skill Updated!",
    UpdatedSkill,
  });
});

export const getAllSkills = catchAsyncErrors(async (req, res, next) => {
 const skills = await Skill.find();
   res.status(200).json({
     success: true,
     skills,
   });
});
