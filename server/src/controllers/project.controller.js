import express from "express";
import Project from "../models/project.model.js";
import User from "../models/user.model.js";

export const getAllProject = async (req, res) => {
  try {
    const projects = await Project.find({ status: "active" });

    return res.status(200).json({
      success: true,
      message: "Project fetched successfully",
      projects,
    });
  } catch (error) {
    console.error("Error during fetching project", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getMyProject = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({ _id: id });
    const projects = await Project.find({ seller: id });

    if (!projects || projects.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No projects found for this user",
      });
    }
    return res.status(200).json({
      success: true,
      message: `Project fetched successfully by ${user.name}`,
      projects,
    });
  } catch (error) {
    console.error("Error during fetching project", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const downloadProjectById = async (req, res) => {

  try {

  } catch (error) {

  }
};

export const getProjectById = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findOne({ _id: id });
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "No projects found by this id",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Project fetched successfully by id",
      project
    })
  } catch (error) {
    console.error("Error during project fetching by id:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const uploadProject = async (req, res) => {
  const {
    title,
    description,
    price,
    techStack,
    category,
    thumbnail, // Frontend sent this as a URL string
    images,    // Frontend sent this as an array of URL strings
    fileUrl    // Frontend sent this as a URL string
  } = req.body;


  try {
    if (!title || !description || !price || !fileUrl)
      return res.status(400).json({
        success: false,
        message: "Missing required fields: title, description, price, fileUrl",
      });

    const project = new Project({
      title,
      description,
      seller: req.user.id,
      price,
      techStack,
      category,
      thumbnail,
      images,
      fileUrl,
    });

    await project.save();

    console.log("Project created successfully", project.title);

    return res.status(201).json({
      success: true,
      message: "Project uploaded successfully",
      project,
    });
  } catch (error) {
    console.error("Error during project upload:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProject = async (req, res) => {
  const { id } = req.params;
  const updates = req.body; //title = ai maker, price = 45
  
  try {
    const project = await Project.findOne({ _id: id });
    if (!project) {
      return res.status(404).json({ message: "Project does not exist" });
    }

    // Verify ownership
    if (project.seller.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized: You don't own this project" });
    }

    Object.keys(updates).forEach((key) => {
      project[key] = updates[key];
    });

    const updatedProject = await project.save();

    return res.status(200).json({
      success: true,
      message: "Project updated successfully",
      updatedProject,
    });
  } catch (error) {
    console.error("Error during project updatation:", error);
    return res
      .status(500)
      .json({
        message: "Internal server error,(error in editProject controller)",
      });
  }
};

export const deleteProject = async (req, res) => {
  const { id } = req.params; // ONLY id exists

  try {
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        message: "Project does not exist",
      });
    }

    // Check if logged‑in user is owner
    if (project.seller.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await Project.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("Error during project deletion:", error);
    return res.status(500).json({
      message: "Internal server error (error in deleteProject controller)",
      error,
    });
  }
};
