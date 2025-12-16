import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";

import { uploadProject } from "@/api/project.api";
import {
  uploadToCloudinary,
  uploadZipToCloudinary,
} from "@/utils/uploadToCloudinary";

export default function UploadProject() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    techStack: "",
    category: "",
    thumbnail: "",
    images: [],
    fileUrl: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ⬆️ FIX 1 — Separate file upload handlers:

  const handleThumbnailUpload = async (e) => {
    const file = e.target.files[0];
    const url = await uploadToCloudinary(file);
    setForm({ ...form, thumbnail: url });
    toast.success("Thumbnail uploaded!");
  };

  const handleImagesUpload = async (e) => {
    const file = e.target.files[0];
    const url = await uploadToCloudinary(file);
    setForm({ ...form, images: [...form.images, url] });
    toast.success("Image added!");
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const url = await uploadZipToCloudinary(file);
    setForm({ ...form, fileUrl: url });
    toast.success("Project file uploaded!");
  };

  // BACKEND CALL
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const payload = {
        ...form,
        techStack: form.techStack.split(",").map((t) => t.trim()),
      };
      return await uploadProject(payload);
    },
    onSuccess: () => {
      toast.success("Project uploaded successfully!");
      navigate("/");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Upload failed");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white p-4">
      <Card className="w-full max-w-2xl bg-gray-950 border-gray-800 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center font-semibold text-blue-400">
            Upload New Project
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <div>
              <Label>Project Title</Label>
              <Input
                name="title"
                placeholder="Enter project title"
                className="bg-gray-900 border-gray-700 text-white"
                onChange={handleChange}
                required
              />
            </div>

            {/* Description */}
            <div>
              <Label>Description</Label>
              <Textarea
                name="description"
                placeholder="Explain the project"
                className="bg-gray-900 border-gray-700 text-white"
                onChange={handleChange}
                required
              />
            </div>

            {/* Price */}
            <div>
              <Label>Price (₹)</Label>
              <Input
                type="number"
                name="price"
                placeholder="$100"
                className="bg-gray-900 border-gray-700 text-white"
                onChange={handleChange}
                required
              />
            </div>

            {/* TechStack */}
            <div>
              <Label>Tech Stack</Label>
              <Input
                name="techStack"
                placeholder="React, Node, MongoDB"
                className="bg-gray-900 border-gray-700 text-white"
                onChange={handleChange}
              />
            </div>

            {/* Category */}
            <div>
              <Label>Category</Label>
              <Input
                name="category"
                placeholder="Web, ML, Android..."
                className="bg-gray-900 border-gray-700 text-white"
                onChange={handleChange}
              />
            </div>

            {/* Thumbnail */}
            <div>
              <Label>Thumbnail Image</Label>
              <Input
                type="file"
                onChange={handleThumbnailUpload}
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>

            {/* Images */}
            <div>
              <Label>Additional Images</Label>
              <Input
                type="file"
                onChange={handleImagesUpload}
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>

            {/* File URL */}
            <div>
              <Label>Project File (ZIP / PDF etc.)</Label>
              <Input
                type="file"
                onChange={handleFileUpload}
                required
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>

            <Button className="w-full" disabled={isPending}>
              {isPending ? "Uploading..." : "Upload Project"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
