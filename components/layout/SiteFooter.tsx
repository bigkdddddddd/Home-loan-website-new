"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { journeyPages } from "@/lib/site-content";

export function SiteFooter() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();
  const isEnquiryPage = pathname === "/enquiry";

  if (isEnquiryPage) {
    return (
      <footer className="site-footer site-footer--minimal">
        <p className="footer-meta">
          Copyright {currentYear} KM Financing. General information only.
        </p>
      </footer>
    );
  }

  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="panel">
          <p className="eyebrow">KM Financing</p>
          <h2>Finance support across key lending needs.</h2>
          <p>
            Explore home loans, car loans, refinance, first-home buyer
            guidance, asset finance and business lending through one clear
            enquiry path.
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
            Submitting any form on this site does not guarantee approval. Loan
            outcomes remain subject to lender criteria, assessment, terms and
            conditions.
          </p>
          <Link className="text-link" href="/enquiry">
            Open the enquiry page
          </Link>
        </div>
      </div>

      <p className="footer-meta">
        Copyright {currentYear} KM Financing. General information only.
      </p>
    </footer>
  );
}
