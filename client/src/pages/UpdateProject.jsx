import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import toast from "react-hot-toast";
import { getProjectById, updateProject } from "@/api/project.api";
import {
  uploadToCloudinary,
  uploadZipToCloudinary,
} from "@/utils/uploadToCloudinary";

export default function UpdateProject() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["project", id],
    queryFn: () => getProjectById(id),
  });

  //    console.log(data)

  const [form, setForm] = useState(data?.data?.project || null);

  useEffect(() => {
    if (data?.data?.project) {
      const p = data.data.project;
      setForm({
        title: p.title,
        description: p.description,
        price: p.price,
        techStack: p.techStack.join(", "),
        category: p.category || "",
        thumbnail: p.thumbnail,
        images: p.images || [],
        fileUrl: p.fileUrl || "",
      });
    }
  }, [data]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleThumbnailUpload = async (e) => {
    const file = e.target.files[0];
    const url = await uploadToCloudinary(file);
    setForm({ ...form, thumbnail: url });
    toast.success("Thumbnail updated!");
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
    toast.success("Updated project file!");
  };

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      updateProject(id, {
        ...form,
        techStack: form.techStack.split(",").map((t) => t.trim()),
      }),

    onSuccess: () => {
      toast.success("Project updated successfully!");
      navigate("/my-projects");
    },

    onError: () => toast.error("Failed to update project."),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate();
  };

  if (isLoading || !form) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-lg animate-pulse opacity-70">Loading project...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white p-6">
      <Card className="w-full max-w-2xl bg-gray-950 border border-gray-800 shadow-2xl animate-in fade-in duration-300 rounded-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-semibold text-center text-blue-400">
            Update Project
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-1">
              <Label>Project Title</Label>
              <Input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="bg-gray-900 border-gray-700 text-white"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-1">
              <Label>Description</Label>
              <Textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="bg-gray-900 border-gray-700 text-white"
                required
              />
            </div>

            {/* Price */}
            <div className="space-y-1">
              <Label>Price (₹)</Label>
              <Input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="bg-gray-900 border-gray-700 text-white"
                required
              />
            </div>

            {/* Tech Stack */}
            <div className="space-y-1">
              <Label>Tech Stack</Label>
              <Input
                name="techStack"
                value={form.techStack}
                onChange={handleChange}
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>

            {/* Category */}
            <div className="space-y-1">
              <Label>Category</Label>
              <Input
                name="category"
                value={form.category}
                onChange={handleChange}
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>

            {/* Thumbnail */}
            <div className="space-y-1">
              <Label>Thumbnail</Label>
              <Input
                type="file"
                onChange={handleThumbnailUpload}
                className="bg-gray-900 border-gray-700 text-white"
              />

              {form.thumbnail && (
                <img
                  src={form.thumbnail}
                  className="h-20 mt-2 rounded border border-gray-700 object-cover"
                />
              )}
            </div>

            {/* Additional Images */}
            <div className="space-y-1">
              <Label>Additional Images</Label>
              <Input
                type="file"
                onChange={handleImagesUpload}
                className="bg-gray-900 border-gray-700 text-white"
              />

              <div className="flex flex-wrap gap-2 mt-2">
                {form.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    className="h-16 w-24 rounded border border-gray-700 object-cover"
                  />
                ))}
              </div>
            </div>

            {/* File URL */}
            <div className="space-y-1">
              <Label>Project ZIP / File</Label>
              <Input
                type="file"
                onChange={handleFileUpload}
                className="bg-gray-900 border-gray-700 text-white"
              />

              {form.fileUrl && (
                <p className="text-blue-400 text-sm mt-1">
                  Existing project file found ✔
                </p>
              )}
            </div>

            {/* Submit */}
            <Button className="w-full py-5 text-lg" disabled={isPending}>
              {isPending ? "Updating..." : "Update Project"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
