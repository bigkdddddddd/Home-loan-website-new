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
  "Home loans",
  "Car loans",
  "Refinance",
  "Business lending",
] as const;

export const homeProcess: JourneyStep[] = [
  {
    title: "Choose the right lending path",
    body: "Start with the loan or finance category that best matches your plans, whether that is property, vehicles, refinance, or business lending.",
  },
  {
    title: "Share the details that matter",
    body: "Use the enquiry form to explain your goals, timing, estimated amount, and the questions you want to discuss with KM Financing.",
  },
  {
    title: "Receive a more relevant follow-up",
    body: "Your enquiry arrives with the right service context so KM Financing can continue the conversation from a more informed starting point.",
  },
];

export const homePageForms: HomePageForm[] = [
  {
    title: "General finance enquiry",
    copy: "Use this for broad finance questions or when you want KM Financing to help identify the best place to start.",
    formName: "Home Page Contact Form",
    defaultEnquiryType: "Other",
    submitLabel: "Send message",
  },
  {
    title: "Book a conversation",
    copy: "Start a conversation about timing, borrowing goals and the right way to prepare for the next step.",
    formName: "Book a Free Consultation Form",
    defaultEnquiryType: "Home Loan",
    submitLabel: "Book consultation",
  },
  {
    title: "Explore your options",
    copy: "Share your current position and goals if you want help narrowing down which loan or finance path is most relevant.",
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
    teaser: "Support for owner-occupier and investment purchase enquiries.",
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
        body: "Share where you are in the buying process and what you want the next conversation to help you clarify.",
      },
      {
        title: "Add the key numbers",
        body: "Include your expected budget, deposit or equity position, and any timing details that may shape the discussion.",
      },
      {
        title: "Move to the next conversation",
        body: "KM Financing can continue the conversation with a clearer understanding of your property goals and finance priorities.",
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
    teaser: "A straightforward starting point for vehicle finance questions.",
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
        body: "Start with the vehicle you are considering and any purchase timing or repayment preferences you already have in mind.",
      },
      {
        title: "Add budget and purchase context",
        body: "Include any expected purchase price, deposit, trade-in, or borrowing range that may help frame the discussion.",
      },
      {
        title: "Receive a guided response",
        body: "KM Financing can pick up the conversation with the vehicle finance details already linked to your enquiry.",
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
    teaser: "A focused page for reviewing your current loan and refinance goals.",
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
        title: "Share what you want to improve",
        body: "Mention whether the goal is lower repayments, a different loan structure, debt consolidation, or more flexibility.",
      },
      {
        title: "Continue with context",
        body: "KM Financing can review the enquiry with your current loan picture and refinance goals already in place.",
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
    teaser: "A comfortable starting point for first-home buyer questions and planning.",
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
        title: "Start with where you are up to",
        body: "Share whether you are saving, researching, house hunting, or preparing to speak with a lender for the first time.",
      },
      {
        title: "Add deposit and timing context",
        body: "Include any deposit progress, target price range, or timing goals so the follow-up can be more practical.",
      },
      {
        title: "Set up the next conversation",
        body: "KM Financing receives a clear summary that helps shape a more helpful first-home buyer conversation.",
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
    teaser: "A dedicated page for equipment, plant and commercial asset finance discussions.",
    eyebrow: "Business asset funding",
    heading: "Capture asset finance enquiries with the right commercial detail.",
    description:
      "Use this page when the enquiry relates to equipment, plant, vehicles, or other asset purchases that need a secure and trackable starting point.",
    highlights: [
      "Equipment and plant focus",
      "Business purchase context",
      "Commercial funding clarity",
    ],
    checkpoints: [
      "What asset you are considering and why it matters to the business plan.",
      "Any budget range, timing, or cash-flow context worth noting.",
      "Whether the enquiry is early research or tied to a near-term purchase.",
    ],
    process: [
      {
        title: "Describe the asset need",
        body: "Start with the asset type, business purpose, and any funding questions you want the next conversation to address.",
      },
      {
        title: "Add budget and timing",
        body: "Share any budget range, purchase timing, or cash-flow considerations that may shape the funding discussion.",
      },
      {
        title: "Follow up with clarity",
        body: "KM Financing can continue the discussion with the commercial asset details already summarised in one place.",
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
    teaser: "A focused starting point for expansion, working capital and general business funding discussions.",
    eyebrow: "Commercial lending",
    heading: "Give business loan enquiries a stronger starting brief.",
    description:
      "This route is built for business owners who want to explain funding goals, timing, and general lending needs before the next conversation begins.",
    highlights: [
      "Growth and cash-flow briefs",
      "Commercial enquiry tracking",
      "Funding conversations with context",
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
        title: "Add timing and amount context",
        body: "Include the broad amount, purpose and timeframe so the business lending discussion can start with the right frame.",
      },
      {
        title: "Send the enquiry through",
        body: "KM Financing receives the business funding enquiry with the context needed for a more relevant follow-up.",
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
    teaser: "Turn calculator estimates into a real finance conversation.",
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
        body: "Use the enquiry form to mention the figure, estimate, or scenario that sparked the question.",
      },
      {
        title: "Explain what you want to clarify",
        body: "Let KM Financing know whether you want to discuss borrowing power, repayments, loan structure, or what to do next.",
      },
      {
        title: "Move from estimate to discussion",
        body: "KM Financing can use the calculator context as a starting point for a more practical follow-up conversation.",
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
