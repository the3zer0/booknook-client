"use client";
import { site } from "@/config/site";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, LogOut, UserRound, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth/client";
export function Header() {
  const { data: session, isPending } = authClient.useSession();
  const [menu, setMenu] = useState(false);
  const [dark, setDark] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setDark(document.documentElement.dataset.theme === "pataghor-dark");
  }, []);
  useEffect(() => {
    setMenu(false);
  }, [pathname]);
  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next
      ? "pataghor-dark"
      : "pataghor";
    localStorage.setItem("pataghor-theme", next ? "pataghor-dark" : "pataghor");
  }
  async function logout() {
    const { error } = await authClient.signOut();
    if (error) toast.error(error.message);
    else {
      toast.success("You have logged out.");
      window.location.replace("/");
    }
  }
  const links = [
    { href: "/", label: "Home" },
    { href: "/books", label: "All Books" },
    ...(session
      ? [
          { href: "/add-book", label: "Add Book" },
          { href: "/my-books", label: "My Books" },
          { href: "/my-borrows", label: "My Borrows" },
        ]
      : []),
  ];
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" href="/" aria-label="BookNook home">
          <span className="brand-mark">
            <img src="/booknook-logo.svg" alt="" width={36} height={36} />
          </span>
          <span className="library-wordmark">{site.name}</span>
        </Link>
        <nav
          className={`main-nav ${menu ? "is-open" : ""}`}
          aria-label="Main navigation"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href ? "active" : ""}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
          {!isPending && !session && (
            <div className="mobile-auth-links">
              <Link href="/login" onClick={() => setMenu(false)}>
                Login
              </Link>
              <Link
                className="btn btn-primary btn-sm"
                href="/register"
                onClick={() => setMenu(false)}
              >
                Register <span aria-hidden="true">↗</span>
              </Link>
            </div>
          )}
        </nav>
        <div className="header-actions">
          <button
            className="btn btn-ghost btn-circle btn-sm"
            aria-label={dark ? "Use light theme" : "Use dark theme"}
            onClick={toggleTheme}
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          {isPending ? (
            <span
              className="loading loading-spinner loading-sm"
              aria-label="Checking login"
            />
          ) : session ? (
            <details className="dropdown dropdown-end">
              <summary className="avatar-button" aria-label="Open account menu">
                {session.user.image ? (
                  <img src={session.user.image} alt={session.user.name} />
                ) : (
                  <UserRound size={20} />
                )}
              </summary>
              <ul className="menu dropdown-content account-menu">
                <li className="account-name">{session.user.name}</li>
                <li>
                  <Link href="/my-profile">My Profile</Link>
                </li>
                <li>
                  <button onClick={logout}>
                    <LogOut size={16} /> Logout
                  </button>
                </li>
              </ul>
            </details>
          ) : (
            <>
              <Link className="login-link desktop-auth-link" href="/login">
                Login
              </Link>
              <Link className="btn btn-primary btn-sm desktop-auth-link" href="/register">
                Register <span aria-hidden="true">↗</span>
              </Link>
            </>
          )}
          <button
            className="mobile-toggle btn btn-ghost btn-circle btn-sm"
            aria-label={menu ? "Close navigation" : "Open navigation"}
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}
