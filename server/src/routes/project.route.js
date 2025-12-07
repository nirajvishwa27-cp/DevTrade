import express from "express"
import { getAllProject, uploadProject, updateProject, deleteProject, getMyProject, getProjectById } from "../controllers/project.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router()

router.get("/", getAllProject)
router.post("/upload", authMiddleware, uploadProject)
router.patch("/update/:id", authMiddleware, updateProject)
router.delete("/delete/:id", authMiddleware, deleteProject)
router.get("/getMyProject/:id", authMiddleware, getMyProject)
router.get("/getProjectById/:id", getProjectById)



export default router;