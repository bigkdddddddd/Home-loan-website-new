import Link from "next/link";

import { EnquiryForm } from "@/components/forms/EnquiryForm";
import {
  homeHighlights,
  homePageForms,
  homeProcess,
  journeyPages,
} from "@/lib/site-content";

const includedForms = [
  "Main contact form",
  "Home loan enquiry form",
  "Car loan enquiry form",
  "Refinance form",
  "First home buyer form",
  "Asset finance form",
  "Business loan form",
  "Calculator result enquiry form",
  "Book a Free Consultation form",
  "Check Your Options form",
] as const;

export default function HomePage() {
  return (
    <div className="page-stack">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">KM Financing website build</p>
          <h1>Clear enquiry paths for every lending conversation.</h1>
          <p className="lead">
            This build gives KM Financing a polished, multi-page frontend backed
            by one secure enquiry route that validates, stores, and emails every
            lead without exposing backend secrets to the browser.
          </p>

          <div className="hero-actions">
            <Link className="button" href="#forms">
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
          <p className="eyebrow">Required forms now included</p>
          <h2>Every key enquiry entry point is covered.</h2>
          <ul className="checklist">
            {includedForms.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="section" id="solutions">
        <div className="section-heading">
          <p className="eyebrow">Lending pathways</p>
          <h2>Dedicated pages for the journeys people search for most.</h2>
          <p>
            Each page uses the same backend workflow while presenting a tailored
            enquiry form, page-specific copy, and cleaner attribution through
            `form_name` and `source_page`.
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
          <h2>One secure route, reused across every form.</h2>
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

      <section className="section" id="forms">
        <div className="section-heading">
          <p className="eyebrow">Homepage forms</p>
          <h2>General contact, consultation, and options all flow through the same backend.</h2>
          <p>
            These are the main multi-purpose forms required by the brief. The
            more specific lending pages each include their own dedicated enquiry
            form as well.
          </p>
        </div>

        <div className="form-card-grid">
          {homePageForms.map((form) => (
            <article className="panel panel--form" key={form.formName}>
              <p className="eyebrow">Shared route</p>
              <h3>{form.title}</h3>
              <p>{form.copy}</p>
              <EnquiryForm
                defaultEnquiryType={form.defaultEnquiryType}
                formName={form.formName}
                submitLabel={form.submitLabel}
              />
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
