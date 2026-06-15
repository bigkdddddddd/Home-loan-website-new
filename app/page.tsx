import Link from "next/link";

import { journeyPages } from "@/lib/site-content";

const homeHighlights = [
  "Home loans",
  "Car loans",
  "Refinance",
  "Business lending",
] as const;

const homeProcess = [
  {
    title: "Choose the finance category that fits",
    body: "Browse the lending page that matches your plans, whether you are buying a home, upgrading a vehicle, refinancing, or funding business growth.",
  },
  {
    title: "Share the details that matter",
    body: "Use one enquiry page to explain your goals, timeframe, estimated amount, and any questions you want to discuss with KM Financing.",
  },
  {
    title: "Receive a relevant follow-up",
    body: "Your enquiry is recorded with the right service context so KM Financing can respond with a more useful next step.",
  },
] as const;

const homeEnquiryHref = "/enquiry?source=%2F";

export default function HomePage() {
  return (
    <div className="page-stack">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">KM Financing</p>
          <h1>Finance solutions for property, vehicles and business goals.</h1>
          <p className="lead">
            KM Financing helps clients explore home loans, car loans,
            refinance, first-home buyer options, asset finance and business
            lending through one straightforward enquiry experience.
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
          <p className="eyebrow">How KM Financing can help</p>
          <h2>Clear pathways for the finance conversations people actually need.</h2>
          <ul className="checklist">
            <li>Home loans for owner-occupiers and investors.</li>
            <li>Vehicle and asset finance for personal or business needs.</li>
            <li>Refinance guidance for clients reviewing current repayments.</li>
            <li>Business lending conversations with one clear enquiry path.</li>
          </ul>
        </aside>
      </section>

      <section className="section" id="solutions">
        <div className="section-heading">
          <p className="eyebrow">Finance solutions</p>
          <h2>Dedicated pages for the lending paths clients ask about most.</h2>
          <p>
            Each page focuses on a specific finance need, then guides visitors
            into the main enquiry page when they are ready to talk.
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
          <p className="eyebrow">How it works</p>
          <h2>A simple path from browsing to enquiry.</h2>
          <p>
            Clients can explore different loan categories, then send one enquiry
            that captures the context KM Financing needs for a more useful
            follow-up.
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
          <h2>One enquiry page for every finance conversation.</h2>
          <p>
            Whether the question is about a home loan, car loan, refinance,
            first-home buyer planning or business funding, the same enquiry
            page keeps the next step clear and consistent.
          </p>
        </div>

        <div className="form-card-grid">
          <article className="panel panel--form">
            <p className="eyebrow">Single enquiry experience</p>
            <h3>General questions and service-specific enquiries now start in one place.</h3>
            <p>
              That makes it easier for visitors to choose a lending category,
              share their goals, and move into a real conversation with KM
              Financing.
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
            <p className="eyebrow">What gets captured</p>
            <h3>Each enquiry keeps the context needed for a better response.</h3>
            <ul className="checklist">
              <li>General questions can start from the main enquiry page.</li>
              <li>Service pages can preselect the right enquiry type.</li>
              <li>KM Financing receives the enquiry with the relevant page context.</li>
            </ul>
          </article>
        </div>
      </section>
    </div>
  );
}
