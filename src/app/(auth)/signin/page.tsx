"use client";

import { ChangeEvent, SubmitEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/providers/UserContext";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AppleIcon, FacebookIcon, GoogleIcon } from "@/icons";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";

type SignInFormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const { refreshUser } = useUser();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [signinData, setSigninData] = useState<SignInFormData>({
    email: "",
    password: "",
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const error = params.get("error");

    if (!error) return;

    const errorMessages: Record<string, string> = {
      google_cancelled: "Google login was cancelled.",
      invalid_google_response: "Invalid response received from Google.",
      invalid_google_state: "Google login session expired. Please try again.",
      google_email_not_verified: "Your Google email is not verified.",
      google_account_mismatch:
        "This email is already linked to another Google account.",
      google_auth_failed: "Google login failed. Please try again.",
    };

    const message =
      errorMessages[error] || "Something went wrong during Google login.";

    toast.error(message);

    // Remove? error =... from URL ==
    window.history.replaceState({}, "", window.location.pathname);
  }, []);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSigninData({ ...signinData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signinData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.info(data.message || "Something wrong!");
      }

      toast.success(data.message);
      router.push("/");
      refreshUser();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="p-6 md:p-8">
      <FieldGroup>
        <div className="flex flex-col items-center gap-2 text-center mb-5">
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-balance text-muted-foreground">
            Sign in to your Sayra. account
          </p>
        </div>

        {/* ========== Credincisl Input Fields start ========== */}
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="yourname@example.com"
            value={signinData.email}
            onChange={onInputChange}
            required
          />
        </Field>

        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-2 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Inter your password"
            value={signinData.password}
            onChange={onInputChange}
            required
          />
        </Field>
        <Field>
          <Button disabled={isLoading} type="submit" className="cursor-pointer">
            {isLoading ? "Checking..." : "Sign in"}
          </Button>
        </Field>
        {/* ========== Credincisl Input Fields end ========== */}

        <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
          Or continue with
        </FieldSeparator>

        {/* ========== Social login buttons Field ========== */}
        <Field className="grid grid-cols-3 gap-4">
          <Button
            variant="outline"
            type="button"
            disabled
            className="cursor-pointer"
          >
            <FacebookIcon />
            <span className="sr-only">Login with Meta</span>
          </Button>
          <Button
            type="button"
            variant="outline"
            className="cursor-pointer"
            onClick={() => (window.location.href = "/api/auth/google")}
          >
            <GoogleIcon />
            <span className="sr-only">Login with Google</span>
          </Button>
          <Button
            variant="outline"
            type="button"
            disabled
            className="cursor-pointer"
          >
            <AppleIcon />
            <span className="sr-only">Login with Apple</span>
          </Button>
        </Field>

        <FieldDescription className="text-center">
          Don&apos;t have an account? <Link href="/signup">Sign up</Link>
        </FieldDescription>
      </FieldGroup>
    </form>
  );
}
