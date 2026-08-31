import type { ContactContent } from "./types";

export const contact: ContactContent = {
  heading: "Contact",
  subhead:
    "Ready to bring your project to life? Whether you have a specific requirement or just want to explore possibilities, I'm here to help.",
  infoItems: [
    { icon: "Mail", label: "Email", value: "contact@corbinmeier.net" },
    { icon: "MapPin", label: "Location", value: "California, USA" },
    { icon: "Mailbox", label: "Mailing Address", value: "P.O. Box 1433, Chico, CA" },
    { icon: "Clock", label: "Response Time", value: "< 24 Hours" },
  ],
  formLabels: {
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email Address",
    phone: "Phone Number (Optional)",
    subject: "Subject",
    projectDetails: "Project Details",
    submit: "Send Message",
    submitting: "Sending...",
  },
  validation: {
    missingFields: "Please fill out at least your name, email, and the subject.",
    missingTurnstile: "Please complete the security check.",
    genericError: "Failed to send message",
    success: "Message sent - thank you! A confirmation was emailed.",
  },
};
