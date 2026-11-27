import { Product } from '../types';

export const CURRENT_PRODUCT: Product = {
  id: "banana-powder",
  name: "Banana Powder",
  botanicalName: "Musa acuminata / Musa balbisiana",
  tagline: "Naturally Derived. Precisely Processed.",
  slug: "banana-powder",
  status: "Current Ingredient",
  shortDescription: "A standardized, free-flowing natural banana powder manufactured via controlled low-temperature dehydration and fine milling for exceptional flavor retention and consistent dispersion.",
  description: "BhuviQ Nyra Banana Powder is engineered specifically for B2B industrial formulation across bakery, dry beverage mixes, infant nutrition, functional snacks, and cosmetics. Produced in an enclosed hygienic facility in India, our process preserves natural carbohydrates, dietary potassium, pleasant aroma, and golden-ivory color without artificial additives or carriers.",
  image: "/images/insight_banana_pure_ingredient_1790839554597.jpg",
  origin: "Sustainably sourced agricultural bananas (India)",
  processing: "Gentle low-temperature dehydration & precision micronization",
  form: "Fine homogenous free-flowing powder",
  supply: "B2B bulk supply (Export-grade food packaging)",
  attributes: [
    "Natural Origin (100% Pure)",
    "Consistent Batch Quality",
    "Controlled Processing",
    "Reliable B2B Supply Chain",
    "No Artificial Flavors or Colors",
    "Moisture-Controlled Barrier Pack"
  ],
  applications: [
    "Food & Beverage",
    "Bakery & Confectionery",
    "Nutrition & Functional Blends",
    "Dairy & Plant-Based Alternatives",
    "Infant & Toddler Cereals",
    "Beauty & Personal Care"
  ],
  specifications: [
    { label: "Physical Appearance", value: "Fine, free-flowing pale ivory to cream powder", method: "Visual / Sensory" },
    { label: "Aroma & Flavor", value: "Characteristic ripe natural banana aroma, clean sweet profile", method: "Organoleptic" },
    { label: "Moisture Content (LOD)", value: "≤ 5.0% w/w", method: "Karl Fischer / Halogen LOD" },
    { label: "Particle Size Mesh", value: "≥ 95% pass through 60 to 100 Mesh", method: "ASTM Sieve Analysis" },
    { label: "Bulk Density", value: "0.45 – 0.65 g/ml", method: "Tapped Density Meter" },
    { label: "Solubility / Rehydration", value: "Rapid dispersion in warm/cold aqueous matrices", method: "Internal Method" },
    { label: "pH (10% Solution in water)", value: "4.5 – 5.8", method: "pH Potentiometric" },
    { label: "Carriers / Fillers", value: "None (100% Pure Banana derived)", method: "Formulation Trace" }
  ],
  packagingOptions: [
    {
      type: "Industrial Multi-layer Bag with Aluminum Barrier",
      weight: "20 kg / 25 kg Net Weight",
      details: "High-barrier vacuum-sealed food-grade polyethylene liner in heavy-duty kraft paper outer bag."
    },
    {
      type: "Fiber Drum Bulk Option",
      weight: "25 kg Net Weight",
      details: "Sealed fiber drum with tamper-evident band, suited for international ocean freight and climate variability."
    },
    {
      type: "Custom Commercial Packaging",
      weight: "5 kg / 10 kg / Customized Pack",
      details: "Nitrogen-flushed food-grade barrier pouches customized to client volume specifications for commercial dispatch."
    }
  ],
  qualityHighlights: [
    "Strict incoming raw banana sorting (brix and ripeness control)",
    "Enclosed stainless steel contact processing lines",
    "Automated magnet and metal detection filtration",
    "Every batch accompanied by Certificate of Analysis (COA) for commercial dispatch"
  ]
};

export const FUTURE_CATEGORIES = [
  {
    id: "food-ingredients",
    title: "Food & Beverage Ingredients",
    timeline: "Tomorrow",
    status: "R&D Pipeline",
    description: "Dehydrated tropical fruit matrices, natural texturizers, clean-label flavor carriers, and vegetable powders.",
    highlights: ["Mango solids", "Papaya powders", "Clean-label fruit sweeteners", "Natural color extracts"],
    image: "/images/insight_agri_value_addition_1790839474306.jpg"
  },
  {
    id: "nutrition-ingredients",
    title: "Nutrition & Functional Actives",
    timeline: "Strategic Horizon",
    status: "Formulation Exploration",
    description: "Prebiotic fiber fractions, resistant starch complexes, plant minerals, and sports nutrition powders.",
    highlights: ["Green banana resistant starch", "Soluble botanical fibers", "Electrolyte complexes", "Postbiotic precursors"],
    image: "/images/insight_functional_food_matrix_1790839527671.jpg"
  },
  {
    id: "wellness-ingredients",
    title: "Wellness & Ayurvedic Botanicals",
    timeline: "Strategic Horizon",
    status: "Exploratory Roadmap",
    description: "Standardized herbal powders, adaptogenic fruit co-products, and gut-microbiome targeted ingredients.",
    highlights: ["Moringa derivatives", "Herbal synergy blends", "Natural digestion aids", "Cold-milled botanical powders"],
    image: "/images/south_india_banana_varieties_1795782889959.jpg"
  },
  {
    id: "beauty-ingredients",
    title: "Beauty & Personal Care Ingredients",
    timeline: "Future Vision",
    status: "Concept Exploration",
    description: "Botanical extracts and fruit powders for clean-label skincare, clay masks, bath powders, and haircare treatments.",
    highlights: ["Enzymatic banana powder for face masks", "Exfoliating seed meals", "Natural lipid fractions", "Cosmetic-grade botanicals"],
    image: "/images/rd_lab_banana_powder_grades_1795783124764.jpg"
  }
];
