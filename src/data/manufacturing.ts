import { JourneyStep } from '../types';

export const SEVEN_STEP_JOURNEY: JourneyStep[] = [
  {
    step: "01",
    number: "01",
    title: "SOURCE",
    description: "Carefully selected agricultural raw materials.",
    details: "Fruits are sourced exclusively from approved food-grade suppliers and are graded based on maturity, size, variety, and processing suitability to ensure consistent raw-material quality.",
    parameters: ["Fruit Maturity Grading", "Visual Sorting", "Traceable Origin Batching"],
    image: "/images/source_banana_harvest_1790837563988.jpg"
  },
  {
    step: "02",
    number: "02",
    title: "PREPARE",
    description: "Controlled preparation for consistent processing.",
    details: "Hygienic peeling, multi-stage ozonated water washing, and temperature-stabilized pre-conditioning under strict sanitation protocols.",
    parameters: ["Sanitary Wash Stage", "Controlled Puree Formulation", "Enzymatic Oxidation Management"],
    image: "/images/prepare_banana_washing_1790837580651.jpg"
  },
  {
    step: "03",
    number: "03",
    title: "PROCESS",
    description: "Precision-Driven Manufacturing",
    details: "Enclosed sanitary stainless-steel processing pipelines, designed in accordance with FSSAI food-safety requirements, GMP/GHP, HACCP principles, ISO 22000, and applicable Codex Alimentarius standards, ensuring minimal atmospheric contamination, controlled shear, and uniform dispersion for consistent food-grade processing and export-quality production.",
    parameters: ["SS-316 Food Grade Contact", "Continuous Flow Control", "Thermal Pre-treatment"],
    image: "/images/process_puree_homogenizer_1790837594587.jpg"
  },
  {
    step: "04",
    number: "04",
    title: "DRY",
    description: "Controlled drying to achieve desired characteristics.",
    details: "Gentle low-temperature dehydration calibrated to preserve natural sugars, aroma compounds, golden-ivory color, and nutritional integrity.",
    parameters: ["Low-Thermal Degradation", "Moisture Evaporation Profiling", "Aroma Preservation"],
    image: "/images/dry_banana_dehydrator_1790837606475.jpg"
  },
  {
    step: "05",
    number: "05",
    title: "REFINE",
    description: "Milling and sieving for consistency.",
    details: "Cryogenic/precision hammer milling with vibratory ultrasonic sifting to generate calibrated mesh particle distribution and optimal bulk density.",
    parameters: ["60 to 100 Mesh Particle Sizing", "Vibratory Sieving", "Anti-caking Homogeneity"],
    image: "/images/refine_milling_sieving_1790837618318.jpg"
  },
  {
    step: "06",
    number: "06",
    title: "VERIFY",
    description: "Quality testing and batch verification.",
    details: "Comprehensive internal laboratory testing for moisture (Halogen/LOD), particle mesh, bulk density, sensory notes, and microbiological purity.",
    parameters: ["Moisture LOD Assay", "Microbiological Screening", "COA Documentation Issued"],
    image: "/images/verify_lab_quality_test_1790837631222.jpg"
  },
  {
    step: "07",
    number: "07",
    title: "DELIVER",
    description: "Secure packaging and reliable B2B supply.",
    details: "Hermetically sealed multi-barrier industrial bags or fiber drums with tamper-evident seals, dispatched under export-grade palletization standards.",
    parameters: ["Moisture-Barrier Liner Pack", "Tamper Evident Seal", "Global B2B Logistics Ready"],
    image: "/images/deliver_sealed_packaging_1790837643690.jpg"
  }
];

export const NINE_STEP_FLOW = [
  { 
    id: 1, 
    name: "Fruit Maturity Grading", 
    detail: "Fruits are sourced exclusively from approved food-grade suppliers and are graded based on maturity, size, variety, and processing suitability to ensure consistent raw-material quality.",
    image: "/images/source_banana_harvest_1790837563988.jpg"
  },
  { 
    id: 2, 
    name: "Preparation", 
    detail: "Sanitary wash & hygienic peeling",
    image: "/images/prepare_banana_washing_1790837580651.jpg"
  },
  { 
    id: 3, 
    name: "Processing", 
    detail: "Enclosed puree homogenization",
    image: "/images/process_puree_homogenizer_1790837594587.jpg"
  },
  { 
    id: 4, 
    name: "Drying", 
    detail: "Controlled low-temp thermal evaporation",
    image: "/images/dry_banana_dehydrator_1790837606475.jpg"
  },
  { 
    id: 5, 
    name: "Refining", 
    detail: "Precision milling & ultrasonic sieving",
    image: "/images/refine_milling_sieving_1790837618318.jpg"
  },
  { 
    id: 6, 
    name: "Testing", 
    detail: "In-house lab verification & batch COA",
    image: "/images/verify_lab_quality_test_1790837631222.jpg"
  },
  { 
    id: 7, 
    name: "Packaging", 
    detail: "Multi-barrier foil bags / fiber drums",
    image: "/images/packaging_powder_filling_1790838244944.jpg"
  },
  { 
    id: 8, 
    name: "Storage", 
    detail: "Humidity & temperature controlled warehouse",
    image: "/images/storage_ingredient_warehouse_1790838268436.jpg"
  },
  { 
    id: 9, 
    name: "Delivery", 
    detail: "Containerized international B2B dispatch",
    image: "/images/delivery_export_shipping_1790838287014.jpg"
  }
];

export const MANUFACTURING_CAPABILITIES = [
  {
    title: "Enclosed Cleanroom Processing",
    subtitle: "Sanitary Integrity",
    description: "All product contact lines are built using SS-316 food-grade stainless steel with positive-pressure air filtration to prevent external airborne contaminants.",
    icon: "ShieldCheck"
  },
  {
    title: "Moisture & Dehydration Control",
    subtitle: "Thermal Precision",
    description: "Multi-zone temperature profiling allows dehydration without burning fruit sugars or triggering heat-induced caramelization defects.",
    icon: "Gauge"
  },
  {
    title: "Calibrated Milling & Sieving",
    subtitle: "Particle Uniformity",
    description: "High-precision micronization units achieve tight particle size distributions between 60 and 120 mesh for uniform dissolution and texture.",
    icon: "Layers"
  },
  {
    title: "Multi-Barrier Packaging",
    subtitle: "Shelf Stability Protection",
    description: "Oxygen and moisture impermeable liners prevent hygroscopic clumping during sea transit and tropical warehousing.",
    icon: "Package"
  },
  {
    title: "Full Batch Traceability",
    subtitle: "End-to-End Tracking",
    description: "Every packaged drum connects to a unique digital batch code documenting harvest date, line settings, testing logs, and dispatch records.",
    icon: "QrCode"
  },
  {
    title: "Reliable B2B Supply Scalability",
    subtitle: "Commercial Readiness",
    description: "Structured production scheduling designed to support both pilot formulation runs (from 25kg) and steady monthly commercial container supply.",
    icon: "Truck"
  }
];
