export interface NavItem {
  name: string;
  href: string;
  description?: string;
  badge?: string;
}

export const NAV_ITEMS: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about", description: "Philosophy, Vision & Scientific Approach" },
  { name: "Ingredients", href: "/ingredients", description: "Banana Powder & Future Platform" },
  { name: "Science & Quality", href: "/science-quality", description: "Testing, Traceability & Specifications" },
  { name: "Applications", href: "/applications", description: "Food, Nutrition, Wellness & Personal Care" },
  { name: "Sustainability", href: "/sustainability", description: "Responsible Sourcing & Zero-Waste Ethos" },
  { name: "Manufacturing", href: "/manufacturing", description: "Controlled Processing & Cleanroom Standards" },
  { name: "TerraVance", href: "/terravance", description: "Agricultural Value Enhancement & Distribution" },
  { name: "Insights", href: "/insights", description: "Articles, Trends & Ingredient Science" },
];

export const FOOTER_LINKS = {
  company: [
    { name: "About Us", href: "/about" },
    { name: "Our Vision", href: "/about#vision" },
    { name: "Manufacturing", href: "/manufacturing" },
    { name: "Sustainability", href: "/sustainability" }
  ],
  ingredients: [
    { name: "Banana Powder", href: "/ingredients/banana-powder" },
    { name: "Applications", href: "/applications" },
    { name: "Science & Quality", href: "/science-quality" },
    { name: "Technical Specifications", href: "/ingredients/banana-powder#technical" }
  ],
  connect: [
    { name: "Contact", href: "/contact" },
    { name: "Business Enquiry", href: "/partner-with-us" },
    { name: "Admin Enquiries Portal", href: "/admin" },
    { name: "Quality Assurance Desk", href: "/contact#quality" },
    { name: "Global Supply Inquiries", href: "/partner-with-us" }
  ],
  legal: [
    { name: "Trust & Compliance", href: "/#trust-compliance" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms & Conditions", href: "/terms-and-conditions" }
  ]
};
