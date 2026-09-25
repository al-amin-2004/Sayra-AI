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
            <div className="relative hidden overflow-hidden bg-zinc-950 md:block">
              <div className="absolute -right-20 -top-20 size-80 rounded-full bg-primary/30 blur-3xl" />

              <div className="absolute -bottom-20 -left-20 size-80 rounded-full bg-blue-500/20 blur-3xl" />

              <div className="relative flex h-full min-h-125 flex-col justify-between p-10">
                <div>
                  <div className="mb-6 flex size-12 items-center justify-center rounded-xl bg-white/10 backdrop-blur">
                    <span className="text-xl font-bold text-white">S</span>
                  </div>

                  <h2 className="text-3xl font-semibold tracking-tight text-white">
                    Meet Sayra.
                  </h2>

                  <p className="mt-4 max-w-sm text-sm leading-6 text-white/60">
                    A modern AI assistant designed to help you think, create,
                    learn, and get things done.
                  </p>
                </div>

                <p className="text-xs text-white/40">
                  Intelligent conversations. One simple place.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <FieldDescription className="px-5 text-center">
          By clicking continue, you agree to our{" "}
          <Link href="/terms-service">Terms of Service</Link> and{" "}
          <Link href="/privacy-policy">Privacy Policy</Link>.
        </FieldDescription>
      </div>
    </div>
  );
}
