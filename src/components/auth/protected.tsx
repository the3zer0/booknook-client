"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Loading, ErrorState } from "@/components/ui/status";
export function Protected({ children }: { children: React.ReactNode }) {
  const { data, isPending, error, refetch } = authClient.useSession();
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (!isPending && !data && !error)
      router.replace(
        `/login?returnTo=${encodeURIComponent(pathname + window.location.search)}`,
      );
  }, [isPending, data, error, pathname, router]);
  if (error)
    return (
      <ErrorState
        message="We could not check your session."
        retry={() => void refetch()}
      />
    );
  if (isPending || !data) return <Loading label="Checking your session…" />;
  return children;
}
