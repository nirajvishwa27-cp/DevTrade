import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

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

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { CATEGORIES } from "@/config/categories";
import { TECH_STACK } from "@/config/techstack";

export default function UploadProject() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    techStack: [],
    techSearch: "",
    category: "",
    subcategory: "",
    thumbnail: "",
    images: [],
    fileUrl: "",
  });

  // ⭐ Prevent race condition by using prev state
  const handleThumbnailUpload = async (e) => {
    const file = e.target.files[0];
    const url = await uploadToCloudinary(file);

    if (!url) {
      toast.error("Thumbnail upload failed");
      return;
    }

    setForm((prev) => ({ ...prev, thumbnail: url }));
    toast.success("Thumbnail uploaded!");
  };

  const handleImagesUpload = async (e) => {
    const file = e.target.files[0];
    const url = await uploadToCloudinary(file);

    if (!url) {
      toast.error("Image upload failed");
      return;
    }

    setForm((prev) => ({
      ...prev,
      images: [...prev.images, url],
    }));

    toast.success("Image added!");
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const url = await uploadZipToCloudinary(file);

    if (!url) {
      toast.error("Project file upload failed");
      return;
    }

    setForm((prev) => ({ ...prev, fileUrl: url }));
    toast.success("Project file uploaded!");
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const payload = {
        ...form,
        techStack: form.techStack,
        category: form.category,
        subcategory: form.subcategory,
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

    if (!form.title.trim()) {
      toast.error("Please enter project title");
      return;
    }

    if (!form.description.trim()) {
      toast.error("Please enter project description");
      return;
    }

    if (!form.price) {
      toast.error("Please enter price");
      return;
    }

    if (!form.techStack.length) {
      toast.error("Please select at least one tech stack");
      return;
    }

    if (!form.category) {
      toast.error("Please select a category");
      return;
    }

    if (!form.subcategory) {
      toast.error("Please select a subcategory");
      return;
    }

    if (!form.fileUrl) {
      toast.error("Please upload project file");
      return;
    }

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

            {/* TITLE */}
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

            {/* DESCRIPTION */}
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

            {/* PRICE */}
            <div>
              <Label>Price (₹)</Label>
              <Input
                type="number"
                name="price"
                placeholder="₹100"
                className="bg-gray-900 border-gray-700 text-white"
                onChange={handleChange}
                required
              />
            </div>

            {/* TECH STACK MULTI SELECT */}
            <div>
              <Label>Tech Stack</Label>

              {/* SELECTED TAGS */}
              <div className="flex flex-wrap gap-2 mb-2 mt-2">
                {form.techStack.map((item, index) => (
                  <span
                    key={index}
                    onClick={() =>
                      setForm((prev) => ({
                        ...prev,
                        techStack: prev.techStack.filter((t) => t !== item),
                      }))
                    }
                    className="
                      px-2 py-1 rounded bg-gray-800 border border-gray-700 
                      text-xs cursor-pointer hover:bg-red-600 hover:border-red-500 
                      transition
                    "
                  >
                    {item} ✕
                  </span>
                ))}
              </div>

              {/* SEARCH INPUT */}
              <Input
                placeholder="Search Tech (React, Node, ML...)"
                className="bg-gray-900 border-gray-700 text-white"
                value={form.techSearch}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, techSearch: e.target.value }))
                }
              />

              {/* DROPDOWN */}
              {form.techSearch && (
                <div className="mt-2 bg-gray-900 border border-gray-800 rounded-lg max-h-36 overflow-y-auto">
                  {TECH_STACK.filter((item) =>
                    item.toLowerCase().includes(form.techSearch.toLowerCase())
                  )
                    .slice(0, 8)
                    .map((item) => (
                      <div
                        key={item}
                        onClick={() => {
                          setForm((prev) => ({
                            ...prev,
                            techStack: prev.techStack.includes(item)
                              ? prev.techStack
                              : [...prev.techStack, item],
                            techSearch: "",
                          }));
                        }}
                        className="
                          px-3 py-2 cursor-pointer text-sm text-gray-300 
                          hover:bg-gray-800 transition
                        "
                      >
                        {item}
                      </div>
                    ))}

                  {!TECH_STACK.some((item) =>
                    item.toLowerCase().includes(form.techSearch.toLowerCase())
                  ) && (
                    <div className="px-3 py-2 text-gray-500 text-sm">
                      No match found
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* CATEGORY */}
            <div>
              <Label>Category</Label>
              <Select
                onValueChange={(value) =>
                  setForm((prev) => ({
                    ...prev,
                    category: value,
                    subcategory: "",
                  }))
                }
              >
                <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>

                <SelectContent className="bg-gray-900 text-white border-gray-700">
                  {CATEGORIES.map((c, i) => (
                    <SelectItem key={i} value={c.category}>
                      {c.category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* SUBCATEGORY */}
            {form.category && (
              <div>
                <Label>Subcategory</Label>
                <Select
                  onValueChange={(value) =>
                    setForm((prev) => ({
                      ...prev,
                      subcategory: value,
                    }))
                  }
                >
                  <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                    <SelectValue placeholder="Select Subcategory" />
                  </SelectTrigger>

                  <SelectContent className="bg-gray-900 text-white border-gray-700">
                    {CATEGORIES.find(
                      (c) => c.category === form.category
                    )?.subcategories.map((s, i) => (
                      <SelectItem key={i} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* THUMBNAIL */}
            <div>
              <Label>Thumbnail Image</Label>
              <Input
                type="file"
                onChange={handleThumbnailUpload}
                className="bg-gray-900 border-gray-700 text-white"
              />
              {form.thumbnail && (
                <p className="text-xs text-green-400 mt-1">
                  Thumbnail uploaded ✔️
                </p>
              )}
            </div>

            {/* ADDITIONAL IMAGES */}
            <div>
              <Label>Additional Images</Label>
              <Input
                type="file"
                onChange={handleImagesUpload}
                className="bg-gray-900 border-gray-700 text-white"
              />
              {!!form.images.length && (
                <p className="text-xs text-green-400 mt-1">
                  {form.images.length} image(s) added ✔️
                </p>
              )}
            </div>

            {/* PROJECT FILE */}
            <div>
              <Label>Project File (ZIP / PDF etc.)</Label>
              <Input
                type="file"
                onChange={handleFileUpload}
                required
                className="bg-gray-900 border-gray-700 text-white"
              />
              {form.fileUrl && (
                <p className="text-xs text-green-400 mt-1">
                  Project file uploaded ✔️
                </p>
              )}
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
