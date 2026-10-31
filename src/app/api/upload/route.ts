import { getAuth } from "@/lib/auth";
export const runtime = "nodejs";
export async function POST(request: Request) {
  if (
    !process.env.MONGODB_URI ||
    !process.env.BETTER_AUTH_SECRET ||
    !process.env.IMGBB_API_KEY
  )
    return Response.json(
      { message: "Image uploads are temporarily unavailable." },
      { status: 503 },
    );
  const session = await getAuth().api.getSession({ headers: request.headers });
  if (!session)
    return Response.json({ message: "Please log in first." }, { status: 401 });
  const length = Number(request.headers.get("content-length") || 0);
  if (length > 6 * 1024 * 1024)
    return Response.json(
      { message: "Choose an image smaller than 5 MB." },
      { status: 413 },
    );
  try {
    const form = await request.formData();
    const file = form.get("image");
    if (
      !(file instanceof File) ||
      !["image/jpeg", "image/png", "image/webp"].includes(file.type) ||
      file.size > 5 * 1024 * 1024 ||
      file.size === 0
    )
      return Response.json(
        { message: "Choose a JPG, PNG or WebP image under 5 MB." },
        { status: 400 },
      );
    const upload = new FormData();
    upload.set("image", file);
    upload.set("key", process.env.IMGBB_API_KEY);
    const response = await fetch("https://api.imgbb.com/1/upload", {
      method: "POST",
      body: upload,
      signal: AbortSignal.timeout(30000),
    });
    const data = await response.json();
    if (!response.ok || !data.success) throw new Error("Upload failed");
    return Response.json({ url: data.data.url });
  } catch {
    return Response.json(
      { message: "The image could not be uploaded. Please try again." },
      { status: 502 },
    );
  }
}
