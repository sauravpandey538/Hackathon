"use client";

import { Icons } from "@/src/components/icons";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { useAuth } from "@/src/contexts/auth-context";
import { useToast } from "@/src/hooks/use-toast";
import { fetchApi } from "@/src/lib/api";
import checkExistence from "@/src/lib/checkExistence";
import { signupSchema } from "@/src/zod/auth";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const fields = [
  {
    id: 1,
    label: "Secret Key",
    name: "secret_key",
    type: "password",
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
    secret_key: "",
    email: "",
    name: "",
    password: "",
    role: "admin",
  });

  const [error, setError] = useState({
    secret_key: "",
    email: "",
    name: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState({
    secret_key: false,
    password: false,
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const { refreshAuth } = useAuth();

  const redirectUrl = "/dashboard";
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError({
      secret_key: "",
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

  const handleSignup = async (data: typeof formData) => {
    const validationResult = signupSchema.safeParse(data);

    if (!validationResult.success) {
      const newErrorState = {
        secret_key: "",
        email: "",
        name: "",
        password: "",
      };

      validationResult.error.errors.forEach((err) => {
        newErrorState[err.path[0] as keyof typeof newErrorState] = err.message;
      });

      setError(newErrorState);
    } else {
      const res = await checkExistence(formData.email);
      if (res.success) {
        toast({
          variant: "destructive",
          title: "User already exists ❌",
          description: "Please login.",
        });
        return;
      }

      const response = await fetchApi("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (response.success) {
        toast({
          title: "Registeration Successful 🎉",
          description: "Redirecting to your dashboard...",
        });
        await refreshAuth();
        router.push(redirectUrl);
      } else {
        toast({
          variant: "destructive",
          title: "Login Failed ❌",
          description:
            response.error || "Invalid credentials. Please try again.",
        });
        console.log(response.error);
      }
    }
  };

  return (
    <div className="container bg-background flex flex-col justify-center items-center w-full">
      <Label className="text-2xl font-bold">Admin SignUp</Label>
      <div className="flex flex-col gap-4 max-w-96 w-full">
        {fields.map((field) => (
          <div
            className="grid w-full max-w-sm items-center gap-1.5"
            key={field.id}
          >
            <Label htmlFor={field.name}>{field.label}</Label>
            <div className="relative">
              <Input
                id={field.name}
                name={field.name}
                type={
                  field.type === "password" &&
                  showPassword[field.name as keyof typeof showPassword]
                    ? "text"
                    : field.type
                }
                placeholder={field.placeholder}
                value={formData[field.name as keyof typeof formData]}
                onChange={handleChange}
                className="pr-10"
              />
              {field.type === "password" && (
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
                  onClick={() =>
                    setShowPassword((prev) => ({
                      ...prev,
                      [field.name]: !prev[field.name as keyof typeof prev],
                    }))
                  }
                >
                  {showPassword[field.name as keyof typeof showPassword] ? (
                    <Icons.eyeOff size={18} />
                  ) : (
                    <Icons.eye size={18} />
                  )}
                </button>
              )}
            </div>
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
            handleSignup(formData);
          }}
        >
          Register
        </Button>

        <div className="mt-4 text-center">
          <Link href={`/admin/auth/login`}>
            Already have an account?{" "}
            <span className="text-gray-300">Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
