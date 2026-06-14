import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getJourneyPage, journeyPages } from "@/lib/site-content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return journeyPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getJourneyPage(slug);

  if (!page) {
    return {
      title: "Page not found",
    };
  }

  return {
    title: page.label,
    description: page.description,
  };
}

export default async function JourneyPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getJourneyPage(slug);

  if (!page) {
    notFound();
  }

  const relatedPages = journeyPages
    .filter((entry) => entry.slug !== slug)
    .slice(0, 3);
  const enquiryHref = `/enquiry?type=${encodeURIComponent(page.enquiryType)}&source=${encodeURIComponent(`/${page.slug}`)}`;

  return (
    <div className="page-stack">
      <section className="page-hero">
        <div className="page-hero__copy">
          <p className="eyebrow">{page.eyebrow}</p>
          <h1>{page.heading}</h1>
          <p className="lead">{page.description}</p>

          <div className="chip-row">
            {page.highlights.map((highlight) => (
              <span className="chip" key={highlight}>
                {highlight}
              </span>
            ))}
          </div>
        </div>

        <aside className="panel panel--highlight">
          <p className="eyebrow">Secure submission path</p>
          <h2>{page.label} enquiries land in one reliable workflow.</h2>
          <p>
            Each submission is validated with Zod, stored in Supabase, and sent
            out through Resend from info@kmfinancing.com. No service role key is
            exposed to the frontend.
          </p>
          <Link className="text-link" href={enquiryHref}>
            Open the main enquiry page
          </Link>
        </aside>
      </section>

      <section className="content-layout">
        <div className="content-column">
          <article className="panel">
            <p className="eyebrow">What to include</p>
            <h2>Useful context for this enquiry type</h2>
            <ul className="checklist">
              {page.checkpoints.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="panel">
            <p className="eyebrow">How it works</p>
            <h2>From page visit to stored lead record</h2>
            <div className="process-grid process-grid--compact">
              {page.process.map((step) => (
                <article className="process-card" key={step.title}>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </article>
              ))}
            </div>
          </article>

          <article className="panel">
            <p className="eyebrow">Related pathways</p>
            <h2>Need a different starting point?</h2>
            <div className="related-links">
              {relatedPages.map((entry) => (
                <Link key={entry.slug} href={`/${entry.slug}`}>
                  <strong>{entry.label}</strong>
                  <span>{entry.teaser}</span>
                </Link>
              ))}
            </div>
          </article>
        </div>

        <aside className="content-sidebar">
          <article className="panel panel--form">
            <p className="eyebrow">Ready to enquire?</p>
            <h2>Send this through the main enquiry page.</h2>
            <p>
              We&apos;ll preselect the enquiry type and keep this page recorded as
              the source so KM Financing receives the right context.
            </p>
            <ul className="checklist">
              <li>Your enquiry type will already be selected.</li>
              <li>This page will be attached as the submission source.</li>
              <li>The secure backend and email workflow stay exactly the same.</li>
            </ul>
            <Link className="button" href={enquiryHref}>
              Send an enquiry
            </Link>
          </article>
        </aside>
      </section>
    </div>
  );
}
