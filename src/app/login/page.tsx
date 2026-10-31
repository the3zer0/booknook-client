import { Suspense } from "react";
import { AuthForm } from "@/components/auth/auth-form";
import { Loading } from "@/components/ui/status";
export const metadata = { title: "Login" };
export default function LoginPage() {
  return (
    <Suspense fallback={<Loading />}>
      <AuthForm mode="login" />
    </Suspense>
  );
}
