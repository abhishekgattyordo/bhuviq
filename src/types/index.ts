export interface Product {
  id: string;
  name: string;
  botanicalName?: string;
  tagline: string;
  slug: string;
  status: 'Current Ingredient' | 'In Development' | 'Future Vision';
  shortDescription: string;
  description: string;
  image: string;
  origin: string;
  processing: string;
  form: string;
  supply: string;
  attributes: string[];
  applications: string[];
  specifications: {
    label: string;
    value: string;
    method?: string;
  }[];
  packagingOptions: {
    type: string;
    weight: string;
    details: string;
  }[];
  qualityHighlights: string[];
}

export interface ApplicationCategory {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  image: string;
  keyBenefits: string[];
  useCases: string[];
  ingredientSynergy: string;
  suitabilityScore?: number;
}

export interface ProcessingTelemetry {
  metric: string;
  value: string;
  unit: string;
  status?: 'normal' | 'optimal' | 'active';
}

export interface JourneyStep {
  step: string;
  number: string;
  title: string;
  description: string;
  details: string;
  parameters: string[];
  image: string;
  videoUrl?: string;
  videoPoster?: string;
  videoDuration?: string;
  telemetry?: ProcessingTelemetry[];
}

export interface QualityStage {
  stepNumber: string;
  title: string;
  subtitle: string;
  description: string;
  checkpoints: string[];
  standardNotes: string;
}

export interface BatchRecord {
  batchId: string;
  productionDate: string;
  productName: string;
  moistureContent: string;
  particleSizeMesh: string;
  solubility: string;
  status: 'Verified' | 'Approved' | 'Testing Completed';
  traceabilityOrigin: string;
  sensoryProfile: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'Ingredient Insights' | 'Industry Trends' | 'Innovation & Sustainability';
  publishedDate: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  summary: string;
  heroImage: string;
  tags: string[];
  content: {
    sectionHeading?: string;
    paragraphs: string[];
    quote?: string;
    keyTakeaways?: string[];
  }[];
}

export interface EnquiryFormData {
  fullName: string;
  companyName: string;
  country: string;
  businessEmail: string;
  phone: string;
  productInterest: string;
  targetApplication: string;
  quantityRequirement: string;
  timeframe?: string;
  message: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  department: string;
  message: string;
}
