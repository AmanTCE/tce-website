import { enquiryServiceOptions } from "@/content/services";

export const budgetOptions = [
  "Under AED 10,000",
  "AED 10,000 – 25,000",
  "AED 25,000 – 50,000",
  "AED 50,000 – 100,000",
  "AED 100,000+",
  "Not sure yet",
];

export type Enquiry = {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  message: string;
};

export type FieldErrors = Partial<Record<keyof Enquiry, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Shared by the browser form and the API route. */
export function validateEnquiry(input: Partial<Record<keyof Enquiry, unknown>>): { data: Enquiry; errors: FieldErrors } {
  const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
  const data: Enquiry = {
    name: str(input.name, 120),
    company: str(input.company, 160),
    email: str(input.email, 200),
    phone: str(input.phone, 40),
    service: str(input.service, 120),
    budget: str(input.budget, 60),
    message: str(input.message, 5000),
  };
  const errors: FieldErrors = {};
  if (data.name.length < 2) errors.name = "Please enter your full name.";
  if (!EMAIL.test(data.email)) errors.email = "Please enter a valid email address, like name@company.com.";
  if (data.phone && !/^[+()\d\s-]{6,40}$/.test(data.phone)) errors.phone = "Use digits, spaces and an optional + country code.";
  if (!enquiryServiceOptions.includes(data.service)) errors.service = "Please choose the service you’re interested in.";
  if (data.budget && !budgetOptions.includes(data.budget)) errors.budget = "Please choose a budget range from the list.";
  if (data.message.length < 20) errors.message = "Please tell us a little more about the project (at least 20 characters).";
  return { data, errors };
}
