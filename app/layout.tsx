import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import Link from "next/link";
import type { ReactNode } from "react";

import { journeyPages, primaryNav } from "@/lib/site-content";

import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700"],
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "KM Financing",
    template: "%s | KM Financing",
  },
  description:
    "KM Financing website with secure enquiry capture, Supabase lead storage, and Resend notification emails.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const currentYear = new Date().getFullYear();

  return (
    <html lang="en">
      <body className={`${body.variable} ${display.variable}`}>
        <div className="site-shell">
          <div className="background-orb background-orb--one" />
          <div className="background-orb background-orb--two" />

          <header className="site-header">
            <Link className="brand" href="/">
              <span className="brand-mark">KM</span>
              <span className="brand-copy">
                <strong>KM Financing</strong>
                <small>Secure lending enquiries</small>
              </span>
            </Link>

            <nav aria-label="Primary" className="site-nav">
              {primaryNav.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </nav>

            <Link className="button button--ghost button--small" href="/#forms">
              Start an enquiry
            </Link>
          </header>

          <main className="site-main">{children}</main>

          <footer className="site-footer">
            <div className="footer-grid">
              <div className="panel">
                <p className="eyebrow">KM Financing</p>
                <h2>Built for clear enquiry pathways.</h2>
                <p>
                  Every form on this site routes through one validated backend
                  flow so leads can be stored securely and followed up quickly.
                </p>
              </div>

              <div className="panel">
                <p className="eyebrow">Explore</p>
                <div className="footer-links">
                  {journeyPages.map((page) => (
                    <Link key={page.slug} href={`/${page.slug}`}>
                      {page.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="panel">
                <p className="eyebrow">Important note</p>
                <p>
                  Submitting any form on this site does not guarantee approval.
                  Loan outcomes remain subject to lender criteria, assessment,
                  terms and conditions.
                </p>
                <Link className="text-link" href="/#forms">
                  Go to the main enquiry forms
                </Link>
              </div>
            </div>

            <p className="footer-meta">
              © {currentYear} KM Financing. General information only.
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
