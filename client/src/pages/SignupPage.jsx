import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { signup } from "../api/auth.api.js";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";

function Signup() {
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => signup(data),
    onSuccess: () => {
      toast.success("Signup successful");
      navigate("/home");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Signup failed");
    },
  });

  // EMAIL + TEMP TOKEN coming from VerificationPage
  const verifiedEmail = location.state?.email;
  const tempToken = location.state?.tempToken;

  // If user visits signup without verification → redirect
  if (!verifiedEmail || !tempToken) {
    return (
      <div className="flex min-h-screen items-center justify-center text-white">
        Invalid Session. Please verify your email again.
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    mutate({
      name: formData.name,
      password: formData.password,
      email: verifiedEmail,  // auto-filled
      tempToken,             // required for backend
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <Card className="w-full max-w-md bg-gray-950 border-gray-800">
        <CardHeader>
          <CardTitle className="text-xl text-center">Create Account</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Auto-filled Email */}
            <div>
              <Label>Email</Label>
              <Input
                value={verifiedEmail}
                disabled
                className="bg-gray-800 border-gray-700 text-gray-400 cursor-not-allowed"
              />
            </div>

            {/* Name */}
            <div>
              <Label>Name</Label>
              <Input
                name="name"
                placeholder="Your Name"
                onChange={handleChange}
                required
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>

            {/* Password */}
            <div>
              <Label>Password</Label>
              <Input
                name="password"
                type="password"
                placeholder="••••••••"
                onChange={handleChange}
                required
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>

            <Button className="w-full" disabled={isPending}>
              {isPending ? "Creating account..." : "Sign Up"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Signup;
