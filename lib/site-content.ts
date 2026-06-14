import type { LeadEnquiryInput } from "./enquiry-schema";

type EnquiryType = LeadEnquiryInput["enquiryType"];

type JourneyStep = {
  title: string;
  body: string;
};

export type JourneyPage = {
  slug: string;
  label: string;
  navLabel: string;
  teaser: string;
  eyebrow: string;
  heading: string;
  description: string;
  highlights: string[];
  checkpoints: string[];
  process: JourneyStep[];
  formName: string;
  enquiryType: EnquiryType;
  submitLabel: string;
};

export type HomePageForm = {
  title: string;
  copy: string;
  formName: string;
  defaultEnquiryType?: EnquiryType;
  submitLabel: string;
};

export const primaryNav = [
  { href: "/", label: "Home" },
  { href: "/home-loans", label: "Home Loans" },
  { href: "/car-loans", label: "Car Loans" },
  { href: "/refinance", label: "Refinance" },
  { href: "/business-loans", label: "Business Loans" },
  { href: "/calculators", label: "Calculators" },
] as const;

export const homeHighlights = [
  "Multiple enquiry pages",
  "One secure backend route",
  "Server-only secret handling",
  "Lead tracking in Supabase",
] as const;

export const homeProcess: JourneyStep[] = [
  {
    title: "Choose the right form",
    body: "Visitors can start from a dedicated lending page or from the general contact, consultation, and options forms on the homepage.",
  },
  {
    title: "Submit through one secure route",
    body: "Every enquiry passes through the same validated API route, with honeypot spam protection and no direct browser access to Supabase or Resend secrets.",
  },
  {
    title: "Store and notify",
    body: "The lead is written to Supabase and notification emails are sent from info@kmfinancing.com so the team can follow up quickly.",
  },
];

export const homePageForms: HomePageForm[] = [
  {
    title: "Main contact form",
    copy: "Use this for general finance questions, broad scenarios, or when you want KM Financing to point you toward the right next step.",
    formName: "Home Page Contact Form",
    defaultEnquiryType: "Other",
    submitLabel: "Send message",
  },
  {
    title: "Book a Free Consultation",
    copy: "Start a conversation about timing, borrowing plans, and the best way to prepare before speaking with a lender.",
    formName: "Book a Free Consultation Form",
    defaultEnquiryType: "Home Loan",
    submitLabel: "Book consultation",
  },
  {
    title: "Check Your Options",
    copy: "Share your current position and goals if you want help narrowing down which lending path is most relevant to discuss.",
    formName: "Check Your Options Form",
    defaultEnquiryType: "Other",
    submitLabel: "Check options",
  },
];

export const journeyPages: JourneyPage[] = [
  {
    slug: "home-loans",
    label: "Home Loans",
    navLabel: "Home Loans",
    teaser: "A dedicated starting point for owner-occupier and investment purchase conversations.",
    eyebrow: "Property lending conversations",
    heading: "Start your home loan enquiry with a clearer brief.",
    description:
      "Use this page when you want to outline your budget, property plans, deposit position, and timing in one secure enquiry before the next lending conversation.",
    highlights: [
      "Purchase and investment scenarios",
      "Budget and timing context",
      "Structured next-step planning",
    ],
    checkpoints: [
      "Your property goal, price range, or repayment comfort zone.",
      "Any deposit, equity, or sale timing context you want reviewed.",
      "Questions around fixed, variable, or split loan directions to discuss next.",
    ],
    process: [
      {
        title: "Tell us the scenario",
        body: "Share where you are in the buying process and what you want the enquiry to help you clarify.",
      },
      {
        title: "Capture the essentials",
        body: "The form records your core contact details, lending category, estimated amount, and page source.",
      },
      {
        title: "Move to the next conversation",
        body: "KM Financing receives the enquiry details and can continue the discussion with the right context already in place.",
      },
    ],
    formName: "Home Loan Enquiry Form",
    enquiryType: "Home Loan",
    submitLabel: "Submit home loan enquiry",
  },
  {
    slug: "car-loans",
    label: "Car Loans",
    navLabel: "Car Loans",
    teaser: "A streamlined path for vehicle finance questions and application preparation.",
    eyebrow: "Vehicle finance enquiries",
    heading: "Make your car loan enquiry easy to review.",
    description:
      "Use this page to share your vehicle plans, preferred budget, and timing so the next conversation starts with the details already organised.",
    highlights: [
      "Vehicle purchase planning",
      "Budget-led enquiry capture",
      "Fast follow-up context",
    ],
    checkpoints: [
      "Whether you are buying soon or comparing finance options first.",
      "Any target purchase price, deposit, or repayment preference worth noting.",
      "Questions about how the application process may work for your scenario.",
    ],
    process: [
      {
        title: "Share your vehicle plans",
        body: "Start with the type of purchase you are planning and any repayment or timing considerations you have in mind.",
      },
      {
        title: "Store the lead securely",
        body: "The secure route records the enquiry in Supabase without exposing backend credentials in the browser.",
      },
      {
        title: "Receive a guided response",
        body: "KM Financing can pick up the conversation with the vehicle finance details already linked to the enquiry.",
      },
    ],
    formName: "Car Loan Enquiry Form",
    enquiryType: "Car Loan",
    submitLabel: "Submit car loan enquiry",
  },
  {
    slug: "refinance",
    label: "Refinance",
    navLabel: "Refinance",
    teaser: "Capture the current loan picture before discussing restructure or comparison options.",
    eyebrow: "Restructure and review",
    heading: "Start a refinance conversation with the key details in place.",
    description:
      "This page is built for people reviewing an existing loan and wanting a secure place to explain goals, current arrangements, and the kind of change they are exploring.",
    highlights: [
      "Existing loan review",
      "Rate and structure goals",
      "Clearer comparison brief",
    ],
    checkpoints: [
      "Why you are considering a refinance and what you want to improve.",
      "Any current repayment, fixed-term, or consolidation context to mention.",
      "Questions you want answered before moving deeper into the process.",
    ],
    process: [
      {
        title: "Outline the current position",
        body: "Use the message field to explain what you have now and what you would like the next discussion to focus on.",
      },
      {
        title: "Track the source page",
        body: "The backend stores where the enquiry started so refinance demand can be measured separately from other journeys.",
      },
      {
        title: "Continue with context",
        body: "Notification emails include the enquiry type, message, and source page so the follow-up starts from the right frame.",
      },
    ],
    formName: "Refinance Form",
    enquiryType: "Refinance",
    submitLabel: "Submit refinance enquiry",
  },
  {
    slug: "first-home-buyer",
    label: "First Home Buyer",
    navLabel: "First Home Buyer",
    teaser: "Give first-home enquiries a focused path with room for timing, deposit, and confidence questions.",
    eyebrow: "First step into property",
    heading: "Help first-home buyers ask better questions from day one.",
    description:
      "This page gives new buyers a comfortable way to share goals, deposit progress, and early-stage questions without needing to know every answer upfront.",
    highlights: [
      "Early-stage buyer guidance",
      "Deposit and timing context",
      "General information framing",
    ],
    checkpoints: [
      "How far along you are with saving, searching, or planning.",
      "Any questions about what to prepare before speaking with a lender.",
      "The purchase timeline or price range you are hoping to work toward.",
    ],
    process: [
      {
        title: "Start with your goals",
        body: "The form is designed to gather the essentials without forcing a fully worked-out application at the first touchpoint.",
      },
      {
        title: "Keep the submission secure",
        body: "Lead data is validated and stored through the backend so each first-home enquiry follows the same reliable workflow.",
      },
      {
        title: "Set up the next conversation",
        body: "KM Financing receives a clear summary that can guide a helpful follow-up without overpromising outcomes.",
      },
    ],
    formName: "First Home Buyer Form",
    enquiryType: "First Home Buyer",
    submitLabel: "Submit first-home enquiry",
  },
  {
    slug: "asset-finance",
    label: "Asset Finance",
    navLabel: "Asset Finance",
    teaser: "A dedicated page for equipment, plant, and vehicle finance discussions tied to business needs.",
    eyebrow: "Business asset funding",
    heading: "Capture asset finance enquiries with the right commercial detail.",
    description:
      "Use this page when the enquiry relates to equipment, plant, vehicles, or other asset purchases that need a secure and trackable starting point.",
    highlights: [
      "Equipment and plant focus",
      "Business purchase context",
      "Secure lead handoff",
    ],
    checkpoints: [
      "What asset you are considering and why it matters to the business plan.",
      "Any budget range, timing, or cash-flow context worth noting.",
      "Whether the enquiry is early research or tied to a near-term purchase.",
    ],
    process: [
      {
        title: "Describe the asset need",
        body: "Start with the asset type, timeline, and any funding questions you want the next conversation to address.",
      },
      {
        title: "Save the commercial context",
        body: "The shared backend stores the enquiry with the correct form name and page source for cleaner tracking.",
      },
      {
        title: "Follow up with clarity",
        body: "Notification emails sent through Resend keep the core facts together for a smoother response process.",
      },
    ],
    formName: "Asset Finance Form",
    enquiryType: "Asset Finance",
    submitLabel: "Submit asset finance enquiry",
  },
  {
    slug: "business-loans",
    label: "Business Loans",
    navLabel: "Business Loans",
    teaser: "A focused intake path for expansion, working capital, or general business lending discussions.",
    eyebrow: "Commercial lending",
    heading: "Give business loan enquiries a stronger starting brief.",
    description:
      "This route is built for business owners who want to explain funding goals, timing, and general lending needs before the next conversation begins.",
    highlights: [
      "Growth and cash-flow briefs",
      "Commercial enquiry tracking",
      "Shared secure workflow",
    ],
    checkpoints: [
      "The business objective behind the finance enquiry.",
      "Any broad amount, timeline, or funding-purpose information to include.",
      "Questions you want to work through in the follow-up conversation.",
    ],
    process: [
      {
        title: "Summarise the funding objective",
        body: "Use the message field to explain the business context in plain language without needing a full application pack upfront.",
      },
      {
        title: "Validate every submission",
        body: "The API route ensures required fields and consent are present before the lead is recorded.",
      },
      {
        title: "Send the lead to the team",
        body: "KM Financing receives the business enquiry details by email and in Supabase for ongoing tracking.",
      },
    ],
    formName: "Business Loan Form",
    enquiryType: "Business Loan",
    submitLabel: "Submit business loan enquiry",
  },
  {
    slug: "calculators",
    label: "Calculators",
    navLabel: "Calculators",
    teaser: "Turn calculator estimates into a real enquiry without losing the numbers that prompted the question.",
    eyebrow: "Calculator follow-up",
    heading: "Convert calculator results into a practical next step.",
    description:
      "If a borrowing power or repayment calculation sparked a question, this page gives visitors a clean way to send that context through for follow-up.",
    highlights: [
      "Calculator result follow-up",
      "Repayment context capture",
      "Source-page attribution",
    ],
    checkpoints: [
      "Which calculator you used and what result stood out to you.",
      "Any estimated amount, repayment figure, or scenario you want reviewed.",
      "What kind of next-step guidance would be most useful from the follow-up.",
    ],
    process: [
      {
        title: "Reference the result",
        body: "Use the enquiry form to mention the figure or scenario that sparked the conversation.",
      },
      {
        title: "Keep the trail connected",
        body: "The submission records the calculator form name and source page so results-led leads can be tracked distinctly.",
      },
      {
        title: "Move from estimate to discussion",
        body: "KM Financing can use the stored enquiry details as a starting point for the next general-information conversation.",
      },
    ],
    formName: "Calculator Enquiry Form",
    enquiryType: "Other",
    submitLabel: "Send calculator enquiry",
  },
];

export function getJourneyPage(slug: string) {
  return journeyPages.find((page) => page.slug === slug);
}
