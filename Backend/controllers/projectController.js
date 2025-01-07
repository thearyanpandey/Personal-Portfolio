import express from "express";
import { v2 as cloudinary } from "cloudinary";
import lib from "express-fileupload";
import Project from "../models/projectSchema.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";

export const addNewProject = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Project Banner Required!!", 400));
  }

  const { projectBanner } = req.files;

  const {
    title,
    description,
    gitRepoLink,
    projectLink,
    technologies,
    stack,
    deployed,
  } = req.body;

  if (
    !title ||
    !description ||
    !gitRepoLink ||
    !projectLink ||
    !stack ||
    !technologies ||
    !deployed
  ) {
    return next(new ErrorHandler("Please Provide All Details!", 400));
  }

  const cloudinaryResponseForProjectBanner = await cloudinary.uploader.upload(
    projectBanner.tempFilePath,
    { folder: "PORTFOLIO PROJECT BANNER" }
  );

  if (
    !cloudinaryResponseForProjectBanner ||
    cloudinaryResponseForProjectBanner.error
  ) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponseForProjectBanner.error || "Some cloudinary error "
    );
    return next(
      new ErrorHandler("Cloudinary upload of portfolio Banner failed", 500)
    );
  }

  const project = await Project.create({
    title,
    description,
    gitRepoLink,
    projectLink,
    technologies,
    stack,
    deployed,
    user: req.user._id,  // Add the user reference
    projectBanner: {
      public_id: cloudinaryResponseForProjectBanner.public_id,
      url: cloudinaryResponseForProjectBanner.secure_url,
    },
  });

  res.status(200).json({
    success: true,
    message: "Project Added",
    project,
  });
});

export const updateProject = catchAsyncErrors(async (req, res, next) => {

  const newProjectData = {
    title: req.body.title,
    description: req.body.description,
    stack: req.body.stack,
    technologies: req.body.technologies,
    deployed: req.body.deployed,
    projectLink: req.body.projectLink,
    gitRepoLink: req.body.gitRepoLink,
  };
  if (req.files && req.files.projectBanner) {
    const projectBanner = req.files.projectBanner;
    const project = await Project.findById(req.params.id);
    const projectImageId = project.projectBanner.public_id;
    await cloudinary.uploader.destroy(projectImageId);
    const newProjectImage = await cloudinary.uploader.upload(
      projectBanner.tempFilePath,
      {
        folder: "PORTFOLIO PROJECT IMAGES",
      }
    );
    newProjectData.projectBanner = {
      public_id: newProjectImage.public_id,
      url: newProjectImage.secure_url,
    };
  }
  const updatedProject = await Project.findByIdAndUpdate(
    req.params.id,
    newProjectData,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    message: "Project Updated!",
    project: updatedProject,
  });
});

export const deleteProject = catchAsyncErrors(async (req, res, next) => {

const { id } = req.params;
  const project = await Project.findById(id);
  if (!project) {
    return next(new ErrorHandler("Already Deleted!", 404));
  }

  const projectImageId = project.projectBanner.public_id;
  await cloudinary.uploader.destroy(projectImageId);
  await project.deleteOne();
  res.status(200).json({
    success: true,
    message: "Project Deleted!",
  });
});

export const getAllProjects = catchAsyncErrors(async (req, res, next) => {
  const projects = await Project.find();
    res.status(200).json({
      success: true,
      projects,
    });
});

export const getSingleProject = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
    try {
      const project = await Project.findById(id);
      res.status(200).json({
        success: true,
        project,
      });
    } catch (error) {
      res.status(400).json({
        error,
      });
    }
});
