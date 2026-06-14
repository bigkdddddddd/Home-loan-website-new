import type { Metadata } from "next";
import Link from "next/link";

import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { ENQUIRY_TYPES, type LeadEnquiryInput } from "@/lib/enquiry-schema";
import { journeyPages } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Enquiry",
  description:
    "Send a secure enquiry to KM Financing through one dedicated contact page.",
};

type EnquiryPageProps = {
  searchParams: Promise<{
    type?: string | string[];
    source?: string | string[];
  }>;
};

function getSingleValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function isEnquiryType(
  value: string | undefined,
): value is LeadEnquiryInput["enquiryType"] {
  return (
    typeof value === "string" &&
    ENQUIRY_TYPES.includes(value as LeadEnquiryInput["enquiryType"])
  );
}

function sanitizeSourcePage(value: string | undefined) {
  if (!value || !value.startsWith("/")) {
    return "/enquiry";
  }

  return value;
}

export default async function EnquiryPage({ searchParams }: EnquiryPageProps) {
  const params = await searchParams;
  const requestedType = getSingleValue(params.type);
  const defaultEnquiryType = isEnquiryType(requestedType)
    ? requestedType
    : undefined;
  const matchingJourney = defaultEnquiryType
    ? journeyPages.find((page) => page.enquiryType === defaultEnquiryType)
    : undefined;
  const fallbackSourcePage = matchingJourney ? `/${matchingJourney.slug}` : "/enquiry";
  const sourcePage = sanitizeSourcePage(
    getSingleValue(params.source) ?? fallbackSourcePage,
  );
  const relatedPages = journeyPages
    .filter((page) => page.slug !== matchingJourney?.slug)
    .slice(0, 3);

  return (
    <div className="page-stack">
      <section className="page-hero">
        <div className="page-hero__copy">
          <p className="eyebrow">Secure enquiry page</p>
          <h1>Send one enquiry, routed the right way.</h1>
          <p className="lead">
            This is the main contact point for KM Financing. It uses one
            validated backend route, stores the lead in Supabase, and sends the
            internal notification without exposing server secrets in the
            browser.
          </p>

          <div className="chip-row">
            <span className="chip">Single enquiry form</span>
            <span className="chip">Server-side secret handling</span>
            <span className="chip">Source-page tracking</span>
          </div>
        </div>

        <aside className="panel panel--highlight">
          <p className="eyebrow">Current context</p>
          <h2>{defaultEnquiryType ?? "General enquiry"}</h2>
          <p>
            {matchingJourney
              ? `You arrived from ${matchingJourney.label}. The enquiry type is already selected and the source page will stay attached to the submission.`
              : "Use this page for general finance questions or to start a conversation about the lending path that fits you best."}
          </p>
          <p>Recorded source page: {sourcePage}</p>
        </aside>
      </section>

      <section className="content-layout">
        <div className="content-column">
          <article className="panel">
            <p className="eyebrow">What to include</p>
            <h2>Give enough detail for a useful follow-up.</h2>
            <ul className="checklist">
              <li>Your main finance goal and timeframe.</li>
              <li>The loan type or scenario you want to discuss.</li>
              <li>Any estimated amount, deposit, equity, or budget context.</li>
            </ul>
          </article>

          <article className="panel">
            <p className="eyebrow">Need a refresher?</p>
            <h2>Browse the lending pages before you submit.</h2>
            <div className="related-links">
              {relatedPages.map((page) => (
                <Link key={page.slug} href={`/${page.slug}`}>
                  <strong>{page.label}</strong>
                  <span>{page.teaser}</span>
                </Link>
              ))}
            </div>
          </article>
        </div>

        <aside className="content-sidebar">
          <article className="panel panel--form">
            <p className="eyebrow">Enquiry form</p>
            <h2>Tell KM Financing what you need.</h2>
            <p>
              This is the only enquiry form on the site. If you arrived from a
              lending page, the enquiry type has already been preselected for
              you.
            </p>
            <EnquiryForm
              defaultEnquiryType={defaultEnquiryType}
              formName="KM Financing Enquiry Page"
              sourcePage={sourcePage}
              submitLabel="Send enquiry"
            />
          </article>
        </aside>
      </section>
    </div>
  );
}
