import Link from "next/link";

import { journeyPages } from "@/lib/site-content";

const homeHighlights = [
  "Dedicated loan pages",
  "One enquiry page",
  "Server-only secret handling",
  "Lead tracking in Supabase",
] as const;

const homeProcess = [
  {
    title: "Explore the right lending path",
    body: "Visitors can read the dedicated lending pages, then move into one shared enquiry page when they are ready to talk.",
  },
  {
    title: "Submit through one secure form",
    body: "Every enquiry passes through the same validated API route, with honeypot spam protection and no browser access to Supabase or Resend secrets.",
  },
  {
    title: "Store and notify",
    body: "The lead is written to Supabase and notification emails are sent from info@kmfinancing.com so the team can follow up quickly.",
  },
] as const;

const homeEnquiryHref = "/enquiry?source=%2F";

export default function HomePage() {
  return (
    <div className="page-stack">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">KM Financing website build</p>
          <h1>One secure enquiry page, with clearer finance pathways.</h1>
          <p className="lead">
            This build gives KM Financing dedicated lending pages and a single
            enquiry page that captures every lead without exposing backend
            secrets to the browser.
          </p>

          <div className="hero-actions">
            <Link className="button" href={homeEnquiryHref}>
              Send an enquiry
            </Link>
            <Link className="button button--ghost" href="/home-loans">
              Explore loan pages
            </Link>
          </div>

          <div className="chip-row">
            {homeHighlights.map((highlight) => (
              <span className="chip" key={highlight}>
                {highlight}
              </span>
            ))}
          </div>
        </div>

        <aside className="panel panel--highlight">
          <p className="eyebrow">What is included</p>
          <h2>A simpler path from browsing to enquiry.</h2>
          <ul className="checklist">
            <li>Dedicated pages for the major lending paths.</li>
            <li>One separate enquiry page for every submission.</li>
            <li>Server-side lead capture with Supabase and Resend.</li>
            <li>No Supabase service role key in any client component.</li>
          </ul>
        </aside>
      </section>

      <section className="section" id="solutions">
        <div className="section-heading">
          <p className="eyebrow">Lending pathways</p>
          <h2>Dedicated pages for the journeys people search for most.</h2>
          <p>
            Each page explains the lending path clearly, then sends visitors to
            the main enquiry page when they are ready to submit.
          </p>
        </div>

        <div className="service-grid">
          {journeyPages.map((page) => (
            <article className="service-card" key={page.slug}>
              <p className="eyebrow">{page.navLabel}</p>
              <h3>{page.label}</h3>
              <p>{page.teaser}</p>
              <Link className="text-link" href={`/${page.slug}`}>
                Open {page.label}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--contrast">
        <div className="section-heading">
          <p className="eyebrow">Shared submission flow</p>
          <h2>One secure route, reused by the enquiry page.</h2>
          <p>
            Visitors can start from different pages, but every submission lands
            in the same validated API workflow before it is inserted into
            Supabase and emailed through Resend.
          </p>
        </div>

        <div className="process-grid">
          {homeProcess.map((step) => (
            <article className="process-card" key={step.title}>
              <p className="eyebrow">Step</p>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Enquiry page</p>
          <h2>When visitors are ready, send them to one focused form.</h2>
          <p>
            The enquiry page works for general contact and loan-specific
            conversations, while still recording the originating page for
            cleaner tracking.
          </p>
        </div>

        <div className="form-card-grid">
          <article className="panel panel--form">
            <p className="eyebrow">Single form experience</p>
            <h3>General questions and loan-specific enquiries now use the same page.</h3>
            <p>
              That keeps the homepage lighter, removes duplicate form blocks,
              and makes the main conversion path much clearer.
            </p>
            <div className="hero-actions">
              <Link className="button" href={homeEnquiryHref}>
                Open the enquiry page
              </Link>
              <Link
                className="button button--ghost"
                href="/enquiry?type=Home%20Loan&source=%2Fhome-loans"
              >
                Preview a home loan enquiry
              </Link>
            </div>
          </article>

          <article className="panel">
            <p className="eyebrow">Tracking stays intact</p>
            <h3>Source page and enquiry type are still captured cleanly.</h3>
            <ul className="checklist">
              <li>Use `/enquiry` for general contact.</li>
              <li>Use a prefilled enquiry link from each lending page.</li>
              <li>All submissions still land in the same secure API route.</li>
            </ul>
          </article>
        </div>
      </section>
    </div>
  );
}
