import type { Metadata } from "next";

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
            <h2>Contact form.</h2>
            <p>Fill in your details below to be contacted by KM Financing.</p>
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
    </div>
  );
}
