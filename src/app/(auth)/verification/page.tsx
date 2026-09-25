"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/providers/UserContext";
import { emailMasking } from "@/helpers/MaskEmail";
import { formatTime } from "@/helpers/formatTime";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Loader2, ShieldCheck } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldTitle,
} from "@/components/ui/field";

type EmailnTime = {
  email: string;
  expiresAt: string;
};

const VarificationPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { refreshUser } = useUser();
  const [otp, setOtp] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(0);
  const [emailnTime, setEmailnTime] = useState<EmailnTime>({
    email: "",
    expiresAt: "",
  });

  const userId = searchParams.get("userid");

  // Get Email and Expire Time ==
  useEffect(() => {
    const getInfo = async () => {
      try {
        const res = await fetch("/api/auth/getEmailnExpireTime", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        });

        const data = await res.json();

        if (!res.ok) {
          toast.error(data.message);
        }

        setEmailnTime({ email: data.email, expiresAt: data.expiresAt });
      } catch (error) {
        console.error(error);
      }
    };

    if (userId) getInfo();
  }, [userId]);

  // Date to Second Convert ==
  useEffect(() => {
    if (!emailnTime.expiresAt) return;

    const interval = setInterval(() => {
      const remaining = Math.floor(
        (new Date(emailnTime.expiresAt).getTime() - Date.now()) / 1000,
      );

      setSeconds(remaining > 0 ? remaining : 0);
    }, 1000);

    return () => clearInterval(interval);
  }, [emailnTime.expiresAt]);

  // OTP Verifi here ==
  const handleVerify = async () => {
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Something went wrong!");
        return;
      }

      toast.success(data.message, {
        duration: 1500,
        onAutoClose: () => {
          router.push("/");
        },
      });
      refreshUser();
    } catch (error) {
      console.error(error);
      toast.error("Server error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = () => {
    toast.info("This Feature comming soon.");
  };
  return (
    <FieldGroup className="flex flex-col items-center gap-5 p-6 md:p-8">
      <div className="flex flex-col items-center gap-2 text-center mb-5">
        <div className="mx-auto inline-flex items-center justify-center size-14 bg-primary/20 rounded-full mb-4">
          <ShieldCheck className="size-7 text-primary" />
        </div>
        <FieldTitle className="text-2xl font-bold">
          Verify Your Email
        </FieldTitle>
        <FieldDescription className="text-balance text-muted-foreground">
          Enter the 6 digit code sent to
          <br />
          <span className="text-sm font-medium text-foreground">
            {emailnTime.email && emailMasking(emailnTime.email)}
          </span>
        </FieldDescription>
      </div>

      <Field className="grid place-content-center">
        <InputOTP maxLength={6} value={otp} onChange={setOtp}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </Field>

      <Field>
        <Button
          onClick={handleVerify}
          disabled={otp.length !== 6 || isLoading}
          className="w-full flex items-center justify-center gap-2"
        >
          {isLoading && <Loader2 className="animate-spin size-4" />}
          {isLoading ? "Verifying..." : "Verify OTP"}
        </Button>
      </Field>

      <Field>
        <button
          onClick={handleResend}
          disabled={seconds > 0}
          className="text-sm text-muted-foreground hover:underline disabled:opacity-50"
        >
          {seconds > 0 ? `Resend OTP in ${formatTime(seconds)}s` : "Resend OTP"}
        </button>
      </Field>

      <Field>
        <span
          onClick={() => router.back()}
          className="text-sm text-center text-primary cursor-pointer hover:underline"
        >
          Change email
        </span>
      </Field>
    </FieldGroup>
  );
};

export default VarificationPage;
