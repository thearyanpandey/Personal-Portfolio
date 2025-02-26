import express from "express";
import {
  addNewProject,
  updateProject,
  deleteProject,
  getAllProjects,
  getSingleProject,
} from "../controllers/projectController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();;

//Protected routes for dashboard
router.post("/add", isAuthenticated, addNewProject);
router.delete("/delete/:id", isAuthenticated, deleteProject);
router.put("/update/:id", isAuthenticated, updateProject);
router.get("/getall", getAllProjects);
router.get("/get/:id", getSingleProject);

export default router;
