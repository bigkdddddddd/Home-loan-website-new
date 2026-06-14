"use client";

import { useState, type FormEvent } from "react";

import { ENQUIRY_TYPES, type LeadEnquiryInput } from "../../lib/enquiry-schema";

type EnquiryFormProps = {
  formName: string;
  sourcePage: string;
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
      // The browser only talks to the internal API route.
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
          sourcePage,
          utmSource,
          utmMedium,
          utmCampaign,
          website: formState.website,
        }),
      });

      const responseBody = (await response.json()) as {
        success?: boolean;
        message?: string;
      };

      if (!response.ok || !responseBody.success) {
        setErrorMessage(
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
    <form onSubmit={handleSubmit}>
      <label>
        Full name
        <input
          required
          type="text"
          value={formState.fullName}
          onChange={(event) => updateField("fullName", event.target.value)}
        />
      </label>

      <label>
        Email
        <input
          required
          type="email"
          value={formState.email}
          onChange={(event) => updateField("email", event.target.value)}
        />
      </label>

      <label>
        Phone
        <input
          required
          type="tel"
          value={formState.phone}
          onChange={(event) => updateField("phone", event.target.value)}
        />
      </label>

      <label>
        Enquiry type
        <select
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

      <label>
        Estimated loan amount
        <input
          type="text"
          inputMode="decimal"
          value={formState.estimatedLoanAmount}
          onChange={(event) =>
            updateField("estimatedLoanAmount", event.target.value)
          }
        />
      </label>

      <label>
        Message
        <textarea
          maxLength={2000}
          value={formState.message}
          onChange={(event) => updateField("message", event.target.value)}
        />
      </label>

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-9999px",
          width: "1px",
          height: "1px",
          overflow: "hidden",
        }}
      >
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={formState.website}
          onChange={(event) => updateField("website", event.target.value)}
        />
      </div>

      <label>
        <input
          required
          type="checkbox"
          checked={formState.consent}
          onChange={(event) => updateField("consent", event.target.checked)}
        />
        I agree to be contacted by KM Financing about my enquiry and understand
        that the information provided is general in nature.
      </label>

      <p>
        Submitting this form does not guarantee approval. Loan approval is
        subject to lender criteria, assessment, terms and conditions.
      </p>

      <button disabled={isSubmitting} type="submit">
        {isSubmitting ? "Submitting..." : submitLabel}
      </button>

      {errorMessage ? (
        <p aria-live="polite" role="status">
          {errorMessage}
        </p>
      ) : null}

      {successMessage ? (
        <p aria-live="polite" role="status">
          {successMessage}
        </p>
      ) : null}
    </form>
  );
}
