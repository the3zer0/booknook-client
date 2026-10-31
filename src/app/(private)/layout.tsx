import { Protected } from "@/components/auth/protected";
export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Protected>{children}</Protected>;
}
