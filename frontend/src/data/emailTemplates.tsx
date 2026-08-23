import type { EmailFormData } from "../types/email";

export interface EmailTemplate {
  id: string;
  name: string;
  description: string;
  values: Partial<EmailFormData>;
}

export const emailTemplates: EmailTemplate[] = [
  {
    id: "job-application",
    name: "Job Application",
    description: "Apply for a job professionally.",
    values: {
      purpose: "Job application",
      tone: "Professional",
      language: "English",
      length: "Medium",
    },
  },

  {
    id: "follow-up",
    name: "Follow-up",
    description: "Follow up after a previous conversation or application.",
    values: {
      purpose: "Follow-up email",
      tone: "Professional",
      language: "English",
      length: "Short",
    },
  },

  {
    id: "meeting-request",
    name: "Meeting Request",
    description: "Request a meeting or call.",
    values: {
      purpose: "Meeting request",
      tone: "Professional",
      language: "English",
      length: "Short",
    },
  },

  {
    id: "customer-support",
    name: "Customer Support",
    description: "Respond to a customer issue.",
    values: {
      purpose: "Customer support response",
      tone: "Friendly",
      language: "English",
      length: "Medium",
    },
  },

  {
    id: "sales-outreach",
    name: "Sales Outreach",
    description: "Reach out to a potential customer.",
    values: {
      purpose: "Sales outreach",
      tone: "Persuasive",
      language: "English",
      length: "Short",
    },
  },

  {
    id: "complaint",
    name: "Complaint",
    description: "Write a clear and professional complaint.",
    values: {
      purpose: "Complaint",
      tone: "Formal",
      language: "English",
      length: "Medium",
    },
  },

  {
    id: "thank-you",
    name: "Thank You",
    description: "Send a professional thank-you message.",
    values: {
      purpose: "Thank-you email",
      tone: "Friendly",
      language: "English",
      length: "Short",
    },
  },

  {
    id: "internship-application",
    name: "Internship Application",
    description: "Apply for an internship.",
    values: {
      purpose: "Internship application",
      tone: "Professional",
      language: "English",
      length: "Medium",
    },
  },

  {
    id: "freelance-proposal",
    name: "Freelance Proposal",
    description: "Send a proposal to a potential freelance client.",
    values: {
      purpose: "Freelance proposal",
      tone: "Professional",
      language: "English",
      length: "Medium",
    },
  },

  {
    id: "invoice-reminder",
    name: "Invoice Reminder",
    description: "Politely remind a client about an unpaid invoice.",
    values: {
      purpose: "Invoice payment reminder",
      tone: "Professional",
      language: "English",
      length: "Short",
    },
  },
];