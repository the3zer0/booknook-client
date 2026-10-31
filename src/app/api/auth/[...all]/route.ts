import { getAuth } from "@/lib/auth";
export const runtime = "nodejs";
async function handler(request: Request) {
  if (!process.env.MONGODB_URI || !process.env.BETTER_AUTH_SECRET) {
    if (new URL(request.url).pathname.endsWith("/get-session"))
      return Response.json(null);
    return Response.json(
      {
        message: "Sign-in is temporarily unavailable. Please try again later.",
      },
      { status: 503 },
    );
  }
  return getAuth().handler(request);
}
export { handler as GET, handler as POST };
