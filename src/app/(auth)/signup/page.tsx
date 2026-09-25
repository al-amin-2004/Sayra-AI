"use client";

import { ChangeEvent, SubmitEvent, useState } from "react";
import { useRouter } from "next/navigation";
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

type SignUpFormData = {
  email: string;
  password: string;
};

export default function SignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [signupData, setSignupData] = useState<SignUpFormData>({
    email: "",
    password: "",
  });

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.info(data.message || "Something wrong!");
      } else {
        toast.success(data.message);
        router.push(`/verification?userid=${data.userId}`);
      }
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
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Enter your email below to create your account
          </p>
        </div>

        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="yourname@example.com"
            value={signupData.email}
            onChange={onInputChange}
            required
          />
          <FieldDescription className="text-xs">
            We&apos;ll use this to contact you. We will not share your email
            with anyone else.
          </FieldDescription>
        </Field>

        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            name="password"
            type="password"
            value={signupData.password}
            onChange={onInputChange}
            required
          />
          <FieldDescription className="text-xs">
            Must be at least 8 characters long.
          </FieldDescription>
        </Field>

        <Field>
          <Button disabled={isLoading} type="submit" className="cursor-pointer">
            {isLoading ? "Sending OTP..." : "Get OTP"}
          </Button>
        </Field>

        <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
          Or continue with
        </FieldSeparator>

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
            type="button"
            variant="outline"
            disabled
            className="cursor-pointer"
          >
            <AppleIcon />
            <span className="sr-only">Login with Apple</span>
          </Button>
        </Field>

        <FieldDescription className="text-center">
          Already have an account? <Link href="/signin">Sign in</Link>
        </FieldDescription>
      </FieldGroup>
    </form>
  );
}
