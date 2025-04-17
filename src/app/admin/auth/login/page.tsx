"use client";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { useAuth } from "@/src/contexts/auth-context";
import { fetchApi } from "@/src/lib/api";
import { loginSchema } from "@/src/zod/auth";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { z } from "zod";

const fields = [
  {
    id: 1,
    label: "Email",
    name: "email",
    type: "email",
    placeholder: "Email",
  },
  {
    id: 2,
    label: "Password",
    name: "password",
    type: "password",
    placeholder: "Password",
  },
];

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const { refreshAuth } = useAuth();

  // Get the redirect URL from the query parameters
  const redirectUrl = "/admin/dashboard";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError({
      email: "",
      password: "",
    });
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (data: typeof formData) => {
    const validationResult = loginSchema.safeParse(data);

    if (!validationResult.success) {
      // Handle validation errors
      const newErrorState = {
        email: "",
        password: "",
      };

      validationResult.error.errors.forEach((err) => {
        newErrorState[err.path[0] as keyof typeof newErrorState] = err.message;
      });

      setError(newErrorState);
    } else {
      const response = await fetchApi("/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.success) {
        // Refresh the authentication state
        await refreshAuth();
        router.push(redirectUrl);
      } else {
        console.log(response.error);
      }
    }
  };

  return (
    <div className="container bg-background flex flex-col justify-center items-center w-full">
      <Label className="text-2xl font-bold">Admin Login</Label>
      <div className="flex flex-col gap-4 max-w-96 w-full">
        {fields.map((field) => (
          <div
            className="grid w-full max-w-sm items-center gap-1.5"
            key={field.id}
          >
            <Label htmlFor={field.name}>{field.label}</Label>
            <Input
              id={field.name}
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              value={formData[field.name as keyof typeof formData]}
              onChange={handleChange}
            />
            {error[field.name as keyof typeof error] && (
              <p className="text-red-500">
                {error[field.name as keyof typeof error]}
              </p>
            )}
          </div>
        ))}
        <Button
          className="w-full"
          onClick={() => {
            handleLogin(formData); // Trigger login validation
          }}
        >
          Login
        </Button>
      </div>
      <div className="mt-4">
        <Link href={`/admin/auth/signup`}>
          Don't have an account? <span className="text-gray-300">Signup</span>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
