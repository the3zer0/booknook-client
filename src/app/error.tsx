"use client";
import { ErrorState } from "@/components/ui/status";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <ErrorState
      message="This page could not load. Please try again."
      retry={reset}
    />
  );
}
