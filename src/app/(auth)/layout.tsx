import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { FieldDescription } from "@/components/ui/field";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-svh flex items-center justify-center bg-transparent p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl space-y-6">
        <Card className="p-0">
          <CardContent className="grid p-0 md:grid-cols-2">
            {children}
            <div className="relative hidden bg-muted md:block">
              {/* <Image
                src="/placeholder.svg"
                width={500}
                height={500}
                alt="Image"
                className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
              /> */}
            </div>
          </CardContent>
        </Card>

        <FieldDescription className="px-5 text-center">
          By clicking continue, you agree to our{" "}
          <Link href="#">Terms of Service</Link> and{" "}
          <Link href="/privacy-policy">Privacy Policy</Link>.
        </FieldDescription>
      </div>
    </div>
  );
}
