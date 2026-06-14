import { z } from "zod";

export const ENQUIRY_TYPES = [
  "Home Loan",
  "Car Loan",
  "Refinance",
  "First Home Buyer",
  "Asset Finance",
  "Business Loan",
  "Personal Loan",
  "Other",
] as const;

const optionalTrimmedString = (maxLength: number) =>
  z.preprocess((value) => {
    if (typeof value !== "string") {
      return value;
    }

    const trimmedValue = value.trim();
    return trimmedValue === "" ? undefined : trimmedValue;
  }, z.string().max(maxLength).optional());

const optionalLoanAmount = z.preprocess((value) => {
  if (value === "" || value === null || value === undefined) {
    return undefined;
  }

  if (typeof value === "string") {
    const normalized = value.replace(/[$,\s]/g, "");
    return normalized === "" ? undefined : Number(normalized);
  }

  return value;
}, z.number().positive().max(1_000_000_000).optional());

export const leadEnquirySchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required").max(120),
  email: z.string().trim().email("Enter a valid email address").max(255),
  phone: z.string().trim().min(1, "Phone number is required").max(40),
  enquiryType: z.enum(ENQUIRY_TYPES),
  estimatedLoanAmount: optionalLoanAmount,
  message: optionalTrimmedString(2000),
  consent: z.boolean().refine((value) => value, {
    message: "Consent is required",
  }),
  sourcePage: z.string().trim().min(1, "Source page is required").max(255),
  formName: z.string().trim().min(1, "Form name is required").max(120),
  utmSource: optionalTrimmedString(120),
  utmMedium: optionalTrimmedString(120),
  utmCampaign: optionalTrimmedString(160),
  website: z.string().optional().default("").transform((value) => value.trim()),
});

export type LeadEnquiryInput = z.infer<typeof leadEnquirySchema>;
