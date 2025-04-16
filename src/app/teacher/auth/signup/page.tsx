"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Label } from "@/src/components/ui/label";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { signupSchema } from "@/src/zod/auth";
import Link from "next/link";
import { fetchApi } from "@/src/lib/api";
import { useAuth } from "@/src/contexts/auth-context";

const fields = [
  {
    id: 1,
    label: "Secret Key",
    name: "secret_key",
    type: "text",
    placeholder: "Secret Key",
  },
  {
    id: 2,
    label: "Email",
    name: "email",
    type: "email",
    placeholder: "Email",
  },
  {
    id: 3,
    label: "Name",
    name: "name",
    type: "text",
    placeholder: "Name",
  },
  {
    id: 4,
    label: "Password",
    name: "password",
    type: "password",
    placeholder: "Password",
  },
];

const SignupPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
  });

  const [error, setError] = useState({
    email: "",
    name: "",
    password: "",
  });
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refreshAuth } = useAuth();
  
  // Get the redirect URL from the query parameters
  const redirectUrl = searchParams?.get('redirect') || '/dashboard';
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError({
      email: "",
      name: "",
      password: "",
    });
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = async(data: typeof formData) => {
    console.log(data)
    const validationResult = signupSchema.safeParse(data);

    if (!validationResult.success) {
      // Handle validation errors
      const newErrorState = {
        email: "",
        name: "",
        password: "",
      };

      validationResult.error.errors.forEach((err) => {
        newErrorState[err.path[0] as keyof typeof newErrorState] = err.message;
      });

      setError(newErrorState);
    } else {
      const response = await fetchApi("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(formData)
      })
      if (response.success) {
        // Refresh the authentication state
        await refreshAuth();
        router.push(redirectUrl);
      } else {
        console.log(response.error)
      }
    }
  };

  return (
    <div className="container bg-background flex flex-col justify-center items-center w-full">
      <Label className="text-2xl font-bold">SignUp</Label>
      <div className="flex flex-col gap-4 max-w-96 w-full">
        {fields.map((field) => (
          <div className="grid w-full max-w-sm items-center gap-1.5" key={field.id}>
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
              <p className="text-red-500">{error[field.name as keyof typeof error]}</p>
            )}
          </div>
        ))}
        <Button
          className="w-full"
          onClick={() => {
            handleSignup(formData); // Trigger login validation
          }}
        >
          Register
        </Button>
      </div>

      <div className="mt-4">
        <Link href={`/auth/login?redirect=${encodeURIComponent(redirectUrl)}`}>
          Already have an account? <span className="text-gray-300">Login</span>
        </Link>
      </div>
    </div>
  );
};

export default SignupPage;
