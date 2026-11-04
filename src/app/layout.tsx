import type { Metadata } from "next";
import { Toaster } from "sonner";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "./globals.css";
export const metadata: Metadata = {
  title: { default: "BookNook | Your next chapter", template: "BookNook | %s" },
  description:
    "Discover, borrow and share books in your community. A little space for your next chapter.",
};
const themeScript = `(function(){try{var t=localStorage.getItem('pataghor-theme');if(t==='pataghor-dark'||t==='pataghor')document.documentElement.dataset.theme=t}catch(e){}})()`;
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      data-theme="pataghor"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Toaster richColors position="top-right" closeButton />
      </body>
    </html>
  );
}
