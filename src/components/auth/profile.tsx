"use client";
import Link from "next/link";
import { UserRound } from "lucide-react";
import { authClient } from "@/lib/auth/client";
export function Profile() {
  const { data } = authClient.useSession();
  if (!data) return null;
  return (
    <section className="container page-section">
      <div className="page-heading">
        <p className="eyebrow">YOUR CORNER OF THE LIBRARY</p>
        <h1>My Profile</h1>
      </div>
      <div className="profile-panel">
        {data.user.image ? (
          <img src={data.user.image} alt={data.user.name} />
        ) : (
          <UserRound size={64} />
        )}
        <h2>{data.user.name}</h2>
        <p>{data.user.email}</p>
        <div className="modal-actions">
          <Link href="/my-books" className="btn btn-outline">
            My Books
          </Link>
          <Link href="/my-borrows" className="btn btn-primary">
            My Borrows
          </Link>
        </div>
      </div>
    </section>
  );
}
