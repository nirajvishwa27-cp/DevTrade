import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api/auth.api.js";
import { useAuth } from "../context/AuthContext";

import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

import {
  Card,
  CardAction,
  CardContent,

  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { login } = useAuth();

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => loginUser(data),
    onSuccess: (res) => {
      login(res);
      toast.success("Logged in successfully");
      navigate("/");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Invalid credentials");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(form);
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950 text-white p-4">
      <Card className="w-full max-w-sm bg-gray-800 text-white border-gray-800">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardAction>
            <Button variant="link" className="text-white" onClick={() => navigate("/verification")}>Sign Up</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  required
                />
              </div>
              <div className="grid gap-2">
                {/* <CardFooter className="flex-col gap-2"> */}
                <Button className="w-full" disabled={isPending}>
                  {isPending ? "Logging in..." : "Login"}
                </Button>
                {/* </CardFooter> */}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
