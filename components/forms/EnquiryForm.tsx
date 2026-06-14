"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";

import { ENQUIRY_TYPES, type LeadEnquiryInput } from "../../lib/enquiry-schema";

type EnquiryFormProps = {
  formName: string;
  sourcePage?: string;
  defaultEnquiryType?: LeadEnquiryInput["enquiryType"];
  submitLabel?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
};

type EnquiryFormState = {
  fullName: string;
  email: string;
  phone: string;
  enquiryType: string;
  estimatedLoanAmount: string;
  message: string;
  consent: boolean;
  website: string;
};

type SubmissionResponse = {
  success?: boolean;
  message?: string;
  errors?: Record<string, string[] | undefined>;
};

const initialState: EnquiryFormState = {
  fullName: "",
  email: "",
  phone: "",
  enquiryType: "",
  estimatedLoanAmount: "",
  message: "",
  consent: false,
  website: "",
};

export function EnquiryForm({
  formName,
  sourcePage,
  defaultEnquiryType,
  submitLabel = "Submit enquiry",
  utmSource,
  utmMedium,
  utmCampaign,
}: EnquiryFormProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [formState, setFormState] = useState<EnquiryFormState>({
    ...initialState,
    enquiryType: defaultEnquiryType ?? "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  function updateField<K extends keyof EnquiryFormState>(
    field: K,
    value: EnquiryFormState[K],
  ) {
    setFormState((currentState) => ({
      ...currentState,
      [field]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formState.fullName,
          email: formState.email,
          phone: formState.phone,
          enquiryType: formState.enquiryType,
          estimatedLoanAmount: formState.estimatedLoanAmount,
          message: formState.message,
          consent: formState.consent,
          formName,
          sourcePage: sourcePage ?? pathname ?? "/",
          utmSource: utmSource ?? searchParams.get("utm_source") ?? undefined,
          utmMedium: utmMedium ?? searchParams.get("utm_medium") ?? undefined,
          utmCampaign:
            utmCampaign ?? searchParams.get("utm_campaign") ?? undefined,
          website: formState.website,
        }),
      });

      const responseBody = (await response.json()) as SubmissionResponse;
      const firstFieldError = responseBody.errors
        ? Object.values(responseBody.errors).flat().find(Boolean)
        : undefined;

      if (!response.ok || !responseBody.success) {
        setErrorMessage(
          firstFieldError ??
            responseBody.message ??
            "We couldn't submit your enquiry right now. Please try again shortly.",
        );
        return;
      }

      setSuccessMessage(
        responseBody.message ??
          "Thanks for contacting KM Financing. We've received your enquiry and will be in touch shortly.",
      );
      setFormState({
        ...initialState,
        enquiryType: defaultEnquiryType ?? "",
      });
    } catch {
      setErrorMessage(
        "We couldn't submit your enquiry right now. Please try again shortly.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="enquiry-form" onSubmit={handleSubmit}>
      <div className="enquiry-form__grid">
        <label className="enquiry-form__field">
          <span>Full name</span>
          <input
            autoComplete="name"
            name="fullName"
            placeholder="Jane Citizen"
            required
            type="text"
            value={formState.fullName}
            onChange={(event) => updateField("fullName", event.target.value)}
          />
        </label>

        <label className="enquiry-form__field">
          <span>Email</span>
          <input
            autoComplete="email"
            name="email"
            placeholder="name@example.com"
            required
            type="email"
            value={formState.email}
            onChange={(event) => updateField("email", event.target.value)}
          />
        </label>

        <label className="enquiry-form__field">
          <span>Phone</span>
          <input
            autoComplete="tel"
            name="phone"
            placeholder="0400 000 000"
            required
            type="tel"
            value={formState.phone}
            onChange={(event) => updateField("phone", event.target.value)}
          />
        </label>

        <label className="enquiry-form__field">
          <span>Enquiry type</span>
          <select
            name="enquiryType"
            required
            value={formState.enquiryType}
            onChange={(event) => updateField("enquiryType", event.target.value)}
          >
            <option value="">Select an option</option>
            {ENQUIRY_TYPES.map((enquiryType) => (
              <option key={enquiryType} value={enquiryType}>
                {enquiryType}
              </option>
            ))}
          </select>
        </label>

        <label className="enquiry-form__field">
          <span>Estimated loan amount</span>
          <input
            inputMode="decimal"
            name="estimatedLoanAmount"
            placeholder="$650,000"
            type="text"
            value={formState.estimatedLoanAmount}
            onChange={(event) =>
              updateField("estimatedLoanAmount", event.target.value)
            }
          />
        </label>

        <label className="enquiry-form__field enquiry-form__full">
          <span>Message</span>
          <textarea
            maxLength={2000}
            name="message"
            placeholder="Tell KM Financing a little more about your goals, timing, or questions."
            value={formState.message}
            onChange={(event) => updateField("message", event.target.value)}
          />
        </label>
      </div>

      <div aria-hidden="true" className="enquiry-form__honeypot">
        <label htmlFor={`${formName}-website`}>Website</label>
        <input
          id={`${formName}-website`}
          autoComplete="off"
          tabIndex={-1}
          type="text"
          value={formState.website}
          onChange={(event) => updateField("website", event.target.value)}
        />
      </div>

      <label className="enquiry-form__checkbox">
        <input
          checked={formState.consent}
          required
          type="checkbox"
          onChange={(event) => updateField("consent", event.target.checked)}
        />
        <span>
          I agree to be contacted by KM Financing about my enquiry and
          understand that the information provided is general in nature.
        </span>
      </label>

      <p className="enquiry-form__disclaimer">
        Submitting this form does not guarantee approval. Loan approval is
        subject to lender criteria, assessment, terms and conditions.
      </p>

      <button className="button" disabled={isSubmitting} type="submit">
        {isSubmitting ? "Submitting..." : submitLabel}
      </button>

      {errorMessage ? (
        <p
          aria-live="polite"
          className="enquiry-form__message enquiry-form__message--error"
          role="status"
        >
          {errorMessage}
        </p>
      ) : null}

      {successMessage ? (
        <p
          aria-live="polite"
          className="enquiry-form__message enquiry-form__message--success"
          role="status"
        >
          {successMessage}
        </p>
      ) : null}
    </form>
  );
}
