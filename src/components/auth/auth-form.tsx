"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { BookOpen, ArrowUpRight, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth/client";
import { passwordError } from "@/lib/validations/password";
import { errorMessage, safeReturnPath } from "@/lib/utils";

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const register = mode === "register";
  const router = useRouter();
  const params = useSearchParams();
  const returnTo = safeReturnPath(params.get("returnTo"));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email")).trim();
    const password = String(data.get("password"));
    if (register) {
      const invalid = passwordError(password);
      if (invalid) {
        setError(invalid);
        return;
      }
    }
    setBusy(true);
    try {
      const result = register
        ? await authClient.signUp.email({
            name: String(data.get("name")).trim(),
            email,
            password,
            image: String(data.get("image")).trim(),
          })
        : await authClient.signIn.email({ email, password, rememberMe: true });
      if (result.error)
        throw new Error(result.error.message || "Please check your details.");
      toast.success(
        register
          ? "Account created. Log in to start reading."
          : "Welcome back to BookNook.",
      );
      router.push(
        register ? `/login?returnTo=${encodeURIComponent(returnTo)}` : returnTo,
      );
      router.refresh();
    } catch (err) {
      const message = errorMessage(err);
      setError(message);
      toast.error(message);
    } finally {
      setBusy(false);
    }
  }
  async function google() {
    setBusy(true);
    setError("");
    try {
      const result = await authClient.signIn.social({
        provider: "google",
        callbackURL: register ? "/" : returnTo,
      });
      if (result.error)
        throw new Error(
          result.error.message || "Google sign-in is unavailable.",
        );
    } catch (err) {
      const message = errorMessage(err);
      setError(message);
      toast.error(message);
      setBusy(false);
    }
  }
  return (
    <section className="auth-shell container">
      <aside className="auth-story">
        <BookOpen size={36} strokeWidth={1.2} />
        <p className="eyebrow">YOUR COMMUNITY BOOKSHELF</p>
        <h1>
          {register ? (
            <>
              Every reader
              <br />
              belongs here.
            </>
          ) : (
            <>
              A familiar place.
              <br />A fresh chapter.
            </>
          )}
        </h1>
        <p>
          Find the stories you’ll stay up for. Share the books you can’t stop
          talking about.
        </p>
        <img
          src="/covers/pride.svg"
          alt="Illustrated Pride and Prejudice cover"
          width={155}
          height={220}
        />
      </aside>
      <div className="auth-form-wrap">
        <p className="eyebrow">
          {register ? "JOIN THE LIBRARY" : "GOOD TO SEE YOU AGAIN"}
        </p>
        <h2>{register ? "Create your account" : "Welcome back."}</h2>
        <p>
          {register
            ? "Your next favourite book is waiting."
            : "Log in and pick up where you left off."}
        </p>
        <button
          disabled={busy}
          className="btn btn-outline google-button"
          onClick={google}
        >
          <span className="google-mark">G</span> Continue with Google
        </button>
        <div className="form-divider">or with your email</div>
        <form onSubmit={submit} className="form-stack">
          {register && (
            <>
              <label className="field">
                Your name
                <input
                  className="input"
                  name="name"
                  required
                  maxLength={100}
                  autoComplete="name"
                  placeholder="How should we call you?"
                />
              </label>
              <label className="field">
                Photo URL
                <input
                  className="input"
                  type="url"
                  name="image"
                  required
                  placeholder="https://…"
                />
              </label>
            </>
          )}
          <label className="field">
            Email address
            <input
              className="input"
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
            />
          </label>
          <label className="field">
            Password
            <span className="password-input">
              <input
                className="input"
                type={showPassword ? "text" : "password"}
                name="password"
                required
                maxLength={128}
                autoComplete={register ? "new-password" : "current-password"}
                placeholder={register ? "Create a password" : "Your password"}
              />
              <button
                type="button"
                className="btn btn-ghost btn-circle btn-sm"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </span>
          </label>
          {register ? (
            <p className="field-hint">
              At least 6 characters, including uppercase and lowercase letters.
            </p>
          ) : (
            <button
              type="button"
              className="text-button forgot-link"
              onClick={() => toast.info("Password reset is not available yet.")}
            >
              Forgot password?
            </button>
          )}
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          <button
            disabled={busy}
            className="btn btn-primary form-submit"
            type="submit"
          >
            {busy ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              <>
                {register ? "Create account" : "Login"}
                <ArrowUpRight size={17} />
              </>
            )}
          </button>
        </form>
        <p className="auth-switch">
          {register ? "Already a reader?" : "New to the library?"}{" "}
          <Link
            href={`/${register ? "login" : "register"}?returnTo=${encodeURIComponent(returnTo)}`}
          >
            {register ? "Login" : "Create an account"}
          </Link>
        </p>
      </div>
    </section>
  );
}
