import type { Metadata } from "next";
import Link from "next/link";

import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { ENQUIRY_TYPES, type LeadEnquiryInput } from "@/lib/enquiry-schema";
import { journeyPages } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Enquiry",
  description:
    "Contact KM Financing about home loans, car loans, refinance, asset finance and business lending.",
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
  const activeEnquiryLabel = defaultEnquiryType ?? "General enquiry";

  return (
    <div className="enquiry-page">
      <section className="enquiry-page__hero">
        <div className="enquiry-page__intro">
          <p className="eyebrow">KM Financing enquiry</p>
          <h1>Tell us what you need.</h1>
          <p className="lead">
            Use this page to ask about home loans, car loans, refinance,
            first-home buyer options, asset finance or business lending. Share
            your plans and KM Financing can follow up with the most relevant
            next step.
          </p>
        </div>

        <div className="enquiry-page__guide">
          <article className="enquiry-page__guide-card">
            <span className="enquiry-page__guide-step">1</span>
            <div>
              <h2>Choose the right enquiry type.</h2>
              <p>
                {matchingJourney
                  ? `You arrived from ${matchingJourney.label}, so the enquiry type is already selected for you.`
                  : "Pick the finance category that best matches your plans so the follow-up starts in the right place."}
              </p>
            </div>
          </article>

          <article className="enquiry-page__guide-card">
            <span className="enquiry-page__guide-step">2</span>
            <div>
              <h2>Share only the essentials.</h2>
              <p>
                Your goal, timing, estimated amount and a short message are
                enough to give KM Financing a useful starting point.
              </p>
            </div>
          </article>

          <article className="enquiry-page__guide-card enquiry-page__guide-card--focus">
            <p className="eyebrow">Current focus</p>
            <h2>{activeEnquiryLabel}</h2>
            <p>
              {matchingJourney
                ? "Your form is already aligned to the page you came from."
                : "Use this page for general finance questions or to start a conversation about the lending path that fits your plans best."}
            </p>
          </article>
        </div>
      </section>

      <section className="panel panel--form enquiry-page__form-section">
        <div className="enquiry-page__form-header">
          <div>
            <p className="eyebrow">Enquiry form</p>
            <h2>Keep it simple.</h2>
            <p>
              Fill in the form below and KM Financing will use it as the
              starting point for follow-up.
            </p>
          </div>
          <div className="enquiry-page__focus-badge">{activeEnquiryLabel}</div>
        </div>

        <EnquiryForm
          defaultEnquiryType={defaultEnquiryType}
          formName="KM Financing Enquiry Page"
          sourcePage={sourcePage}
          submitLabel="Send enquiry"
        />
      </section>

      <section className="enquiry-page__support">
        <article className="panel">
          <p className="eyebrow">What helps most</p>
          <h2>Three details that make the follow-up easier.</h2>
          <ul className="checklist">
            <li>Your main finance goal and preferred timing.</li>
            <li>The loan type, purchase, or funding scenario you want to discuss.</li>
            <li>Any budget, deposit, equity, repayment or borrowing context that may help.</li>
          </ul>
        </article>

        <article className="panel">
          <p className="eyebrow">Need a refresher?</p>
          <h2>Explore the service pages before you submit.</h2>
          <div className="related-links">
            {relatedPages.map((page) => (
              <Link key={page.slug} href={`/${page.slug}`}>
                <strong>{page.label}</strong>
                <span>{page.teaser}</span>
              </Link>
            ))}
          </div>
        </article>

        <article className="panel">
          <p className="eyebrow">Good to know</p>
          <h2>One enquiry page for every service.</h2>
          <p>
            Whether your question is about property, vehicles, refinance or
            business funding, this page keeps the enquiry process clear and
            consistent.
          </p>
        </article>
      </section>
    </div>
  );
}
