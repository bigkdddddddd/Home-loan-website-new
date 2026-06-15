import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import Link from "next/link";
import type { ReactNode } from "react";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { primaryNav } from "@/lib/site-content";

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
    "KM Financing helps with home loans, car loans, refinance, first-home buyer support, asset finance and business lending.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
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
                <small>Loan and finance solutions</small>
              </span>
            </Link>

            <nav aria-label="Primary" className="site-nav">
              {primaryNav.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
              <Link href="/enquiry">Enquiry</Link>
            </nav>

            <Link className="button button--ghost button--small" href="/enquiry">
              Start an enquiry
            </Link>
          </header>

          <main className="site-main">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
