import { Suspense } from "react";
import { AuthForm } from "@/components/auth/auth-form";
import { Loading } from "@/components/ui/status";
export const metadata = { title: "Register" };
export default function RegisterPage() {
  return (
    <Suspense fallback={<Loading />}>
      <AuthForm mode="register" />
    </Suspense>
  );
}
