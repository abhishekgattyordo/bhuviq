import { QualityStage, BatchRecord } from '../types';

export const QUALITY_STAGES: QualityStage[] = [
  {
    stepNumber: "01",
    title: "Raw Material Control",
    subtitle: "Incoming Agricultural Scrutiny",
    description: "Every harvest consignment undergoes visual defect inspection, Brix (sugar-content) measurement, and raw fruit sorting prior to acceptance.",
    checkpoints: ["Fruit Maturity Grading", "Total soluble solids (°Brix)", "Pesticide screen verification sample", "Sorting triage removal"],
    standardNotes: "Fruits are sourced exclusively from approved food-grade suppliers and are graded based on maturity, size, variety, and processing suitability to ensure consistent raw-material quality."
  },
  {
    stepNumber: "02",
    title: "Process Control",
    subtitle: "Real-time Line Monitoring",
    description: "Continuous tracking of line throughput, dehydration chamber temperature gradients, puree homogenization viscosity, and moisture loss curves.",
    checkpoints: ["Chamber temperature logging", "Residence time control", "Inline rare-earth magnet traps", "Visual line monitoring"],
    standardNotes: "Automated alert thresholds to prevent thermal degradation of natural aroma."
  },
  {
    stepNumber: "03",
    title: "Testing & Analytical Assay",
    subtitle: "Physical, Chemical & Microbiological Verification",
    description: "Batch samples are tested in-house and with accredited laboratory benchmarks for critical release specifications.",
    checkpoints: ["Moisture determination (LOD)", "Sieve analysis (Particle mesh distribution)", "Bulk density measurement", "Microbial safety parameters"],
    standardNotes: "Testing completed against standardized protocol specifications."
  },
  {
    stepNumber: "04",
    title: "Traceability",
    subtitle: "Digital Batch Linking",
    description: "Every drum, bag, and consignment is tagged with a unique batch identification code linking raw harvest origin to final packaging date.",
    checkpoints: ["Farmer cluster origin ID", "Processing line run ID", "Operator shift log", "Retained sample archival (24 months)"],
    standardNotes: "Instant bi-directional retrieval of production data."
  },
  {
    stepNumber: "05",
    title: "Final Verification & Release",
    subtitle: "Commercial Quality Certificate",
    description: "Final sensory appraisal, packaging integrity seal check, and Certificate of Analysis (COA) generation before dispatch authorization.",
    checkpoints: ["Multi-layer seal pressure check", "Weight verification", "COA generation & approval", "Export pallet strapping inspection"],
    standardNotes: "No dispatch without QA authorized sign-off."
  }
];

export const MOCK_BATCH_RECORDS: BatchRecord[] = [
  {
    batchId: "BQNP-2026-001",
    productionDate: "September 02, 2026",
    productName: "Banana Powder (100% Pure)",
    moistureContent: "4.2% w/w (Spec: ≤ 5.0%)",
    particleSizeMesh: "98.4% pass through 60 to 100 Mesh",
    solubility: "Complete dispersion in 25s",
    status: "Verified",
    traceabilityOrigin: "Cluster K-12, Agro-Zone 4, South India",
    sensoryProfile: "Characteristic sweet ripe banana, pale cream-ivory fine powder"
  },
  {
    batchId: "BQNP-2026-002",
    productionDate: "September 08, 2026",
    productName: "Banana Powder (100% Pure)",
    moistureContent: "4.1% w/w (Spec: ≤ 5.0%)",
    particleSizeMesh: "99.1% pass through 60 to 100 Mesh",
    solubility: "Complete dispersion in 22s",
    status: "Approved",
    traceabilityOrigin: "Cluster M-08, Western Agro-Zone, India",
    sensoryProfile: "Clean tropical aroma, smooth mouthfeel, zero caking"
  },
  {
    batchId: "BQNP-2026-003",
    productionDate: "September 14, 2026",
    productName: "Banana Powder (Pilot R&D Batch)",
    moistureContent: "3.8% w/w (Spec: ≤ 5.0%)",
    particleSizeMesh: "99.6% pass through 100 Mesh (Fine Micronized)",
    solubility: "Instant dispersion in 18s",
    status: "Testing Completed",
    traceabilityOrigin: "Dedicated Research Orchard Trial B-03",
    sensoryProfile: "Delicate natural fruit bouquet, ultra-fine mouthfeel"
  }
];

export const DOCUMENTATION_LIBRARY = [
  {
    title: "Product Technical Specification (TDS)",
    code: "DOC-BQNP-TDS-2026",
    category: "Technical",
    description: "Complete physical, chemical, organoleptic, and storage parameters for BhuviQ Nyra Banana Powder.",
    format: "PDF Document (Download Ready)",
    status: "Approved Reference"
  },
  {
    title: "Sample Certificate of Analysis (COA Format)",
    code: "DOC-BQNP-COA-STD",
    category: "Quality Assurance",
    description: "Standardized batch test reporting layout detailing release testing, moisture assays, and sieve tests.",
    format: "PDF Template (Download Ready)",
    status: "Format Reference"
  },
  {
    title: "Allergen & Non-GMO Statement",
    code: "DOC-BQNP-ALG-2026",
    category: "Regulatory & Compliance",
    description: "Declaration confirming single-origin natural banana composition with zero carriers or allergen additives.",
    format: "PDF Document (Download Ready)",
    status: "Approved Reference"
  },
  {
    title: "Storage & Handling Technical Guide",
    code: "DOC-BQNP-HND-2026",
    category: "Handling & Logistics",
    description: "Guidelines for industrial hopper loading, ambient humidity management, and resealing open liners.",
    format: "PDF Document (Download Ready)",
    status: "Approved Reference"
  }
];

export const PRODUCT_SPEC_SHEET = {
  productName: "BhuviQ Nyra Pure Banana Powder",
  grade: "Food & Nutritional Grade (Standardized)",
  botanicalSource: "Musa acuminata / Musa balbisiana",
  origin: "India (Tropical Agro-Industrial Corridor)",
  physicalChemical: [
    { parameter: "Appearance / Form", specification: "Fine, free-flowing powder, zero lumps", method: "Visual / Sensory" },
    { parameter: "Color", specification: "Pale golden-ivory to light cream", method: "Sensory / Lovibond" },
    { parameter: "Aroma / Taste", specification: "Authentic ripe banana aroma, natural sweetness", method: "Organoleptic Panel" },
    { parameter: "Moisture Content (LOD)", specification: "≤ 5.0% w/w", method: "Halogen / AOAC 925.10" },
    { parameter: "Particle Size / Mesh", specification: "≥ 95% passes through 60 to 100 Mesh", method: "ASTM Sieve Analysis" },
    { parameter: "Bulk Density", specification: "0.45 – 0.65 g/ml (Tapped)", method: "USP <616>" },
    { parameter: "pH (10% aqueous solution)", specification: "4.8 – 5.6", method: "Potentiometric" },
    { parameter: "Total Soluble Solids (°Brix equivalent)", specification: "Preserved natural monosaccharide ratio", method: "Refractometric" }
  ],
  microbiological: [
    { parameter: "Total Aerobic Plate Count", specification: "< 5,000 CFU/g", method: "ISO 4833-1" },
    { parameter: "Yeast & Mold Count", specification: "< 100 CFU/g", method: "ISO 21527-2" },
    { parameter: "Escherichia coli", specification: "Absent in 10g", method: "ISO 16649-2" },
    { parameter: "Salmonella spp.", specification: "Absent in 25g", method: "ISO 6579-1" },
    { parameter: "Staphylococcus aureus", specification: "Absent in 1g", method: "ISO 6888-1" }
  ],
  packagingStorage: {
    standardPack: "25 kg fiber drum with double polyethylene moisture-barrier liner; 5 kg and 1 kg pilot bags.",
    shelfLife: "24 months from manufacturing date in unopened original packaging.",
    storageConditions: "Store in a cool, dry, dark environment below 25°C and < 60% relative humidity. Keep sealed."
  }
};

