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

  return (
    <div className="page-stack">
      <section className="page-hero">
        <div className="page-hero__copy">
          <p className="eyebrow">KM Financing enquiry</p>
          <h1>Start the conversation with the right details.</h1>
          <p className="lead">
            Use this page to ask about home loans, car loans, refinance,
            first-home buyer options, asset finance or business lending. Share
            your plans and KM Financing can follow up with the most relevant
            next step.
          </p>

          <div className="chip-row">
            <span className="chip">Home and property loans</span>
            <span className="chip">Vehicle and asset finance</span>
            <span className="chip">Business lending</span>
          </div>
        </div>

        <aside className="panel panel--highlight">
          <p className="eyebrow">Enquiry focus</p>
          <h2>{defaultEnquiryType ?? "General enquiry"}</h2>
          <p>
            {matchingJourney
              ? `You arrived from ${matchingJourney.label}. The enquiry type is already selected so you can focus on the details that matter most.`
              : "Use this page for general finance questions or to start a conversation about the lending path that fits your plans best."}
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
        </div>

        <aside className="content-sidebar">
          <article className="panel panel--form">
            <p className="eyebrow">Enquiry form</p>
            <h2>Tell us about your plans.</h2>
            <p>
              This is the main enquiry form for KM Financing. If you arrived
              from one of the lending pages, the enquiry type has already been
              preselected for you.
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
