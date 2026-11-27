import { ApplicationCategory } from '../types';

export const APPLICATIONS: ApplicationCategory[] = [
  {
    id: "food-beverage",
    title: "Food & Beverage",
    subtitle: "Ingredients for Modern Food Systems",
    description: "Transforming natural fruit solids into clean-label beverage bases, dairy inclusions, bakery mixes, and confectionery fillings with unmatched consistency.",
    iconName: "UtensilsCrossed",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80",
    keyBenefits: [
      "Natural sweetness and authentic tropical flavor without artificial enhancers",
      "Excellent suspension stability in smoothies, shakes, and instant drink powders",
      "Superior rehydration properties and moisture retention in baked goods",
      "Clean-label declaration: 100% natural fruit powder"
    ],
    useCases: [
      "Artisan and industrial bread, muffins, and cake premixes",
      "Instant smoothie powders and ready-to-mix beverage sachets",
      "Fruit-based fillings, glazes, and confectionery centers",
      "Ice creams, yogurts, and plant-based frozen desserts"
    ],
    ingredientSynergy: "Blends seamlessly with oat milk bases, cocoa solids, wheat flours, and natural pectin systems."
  },
  {
    id: "nutrition",
    title: "Nutrition & Functional Foods",
    subtitle: "Natural Ingredient Solutions for Formulations",
    description: "Delivering digestible fruit carbohydrates, essential potassium, natural dietary fiber, and gentle energy profiles for high-performance dietary supplements.",
    iconName: "Activity",
    image: "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=1000&q=80",
    keyBenefits: [
      "Naturally rich in bio-available potassium and complex plant carbohydrates",
      "Low glycaemic impact when utilizing resistant starch stages",
      "Easily digestible base for infant foods, pediatric formulas, and convalescent diets",
      "Non-allergenic hypoallergenic matrix suitable for sensitive demographics"
    ],
    useCases: [
      "Plant protein shakes, pre-workout hydration mixes, and recovery drinks",
      "Infant cereals, porridge mixes, and weaning food formulations",
      "Nutritional bars, granola clusters, and pressed fruit snacks",
      "Clinical and geriatric meal replacement powders"
    ],
    ingredientSynergy: "Enhances mouthfeel in pea/rice protein blends by masking vegetal astringency naturally."
  },
  {
    id: "wellness",
    title: "Wellness & Gut Health",
    subtitle: "Functional and Microbiome Opportunities",
    description: "Exploring prebiotic matrix carriers, botanical digestion aids, and daily functional health blends rooted in traditional agricultural intelligence.",
    iconName: "Sparkles",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1000&q=80",
    keyBenefits: [
      "Promotes short-chain fatty acid (SCFA) generation in targeted gut microbiomes",
      "Gentle buffering effect on gastrointestinal mucosa",
      "Synergistic carrier for probiotic strains and botanical adaptogens",
      "Mild natural aroma that improves consumer compliance in daily routines"
    ],
    useCases: [
      "Synbiotic powder drink sticks and gut wellness blends",
      "Ayurvedic and modern botanical daily sachets",
      "Electrolyte and gentle mineral rehydration blends",
      "Holistic wellness tonics and herbal elixirs"
    ],
    ingredientSynergy: "Acts as a protective thermal and osmotic carrier for heat-sensitive active botanicals."
  },
  {
    id: "beauty-personal-care",
    title: "Beauty & Personal Care",
    subtitle: "Future Naturally Derived Cosmetic Actives",
    description: "Unlocking fruit enzymes, potassium-rich humectant properties, and skin-softening plant lipids for clean, eco-conscious cosmetic formulations.",
    iconName: "HeartHandshake",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1000&q=80",
    keyBenefits: [
      "Natural skin-conditioning properties from fruit oligosaccharides and minerals",
      "Mild enzymatic exfoliation without abrasive synthetic microplastics",
      "Waterless beauty formulation capability for dry masks and bath concentrates",
      "Biodegradable, vegan, and environmentally benign cosmetic ingredient"
    ],
    useCases: [
      "DIY-reconstituted facial mud masks and botanical cleansing powders",
      "Nourishing hair mask bases and scalp treatment pastes",
      "Soothing bath soaks and luxury body polish scrubs",
      "Solid waterless cosmetics and eco-shampoo bars"
    ],
    ingredientSynergy: "Pairs elegantly with kaolin clays, oat starches, and cold-pressed seed oils."
  },
  {
    id: "custom-applications",
    title: "Custom Applications",
    subtitle: "Co-Development & Tailored Milling",
    description: "Collaborating with global product formulators to engineer specific moisture levels, mesh particle distributions, and packaging configurations for proprietary lines.",
    iconName: "Sliders",
    image: "/src/assets/images/custom_milling_rd_1790851092404.jpg",
    keyBenefits: [
      "Custom particle sizing from coarse 40 mesh to ultra-fine 120 mesh",
      "Targeted moisture control tuned to customer packaging and storage climate",
      "Pilot-scale batch trial runs with rapid turnaround sampling",
      "Confidential technical co-development support and pilot benchmarking"
    ],
    useCases: [
      "Custom dry bakery blends and extruded snack pellets",
      "Contract manufacturing of private-label functional beverage bases",
      "Bulk export consignments customized for automated factory hoppers",
      "Experimental agricultural co-product value recovery"
    ],
    ingredientSynergy: "Engineered to client-specific solubility, bulk density, and blending velocity parameters."
  }
];

export const APPLICATION_MATRIX = [
  {
    sector: "Food & Beverage",
    application: "Bakery Mixes & Snack Bars",
    benefit: "Natural moisture retention, structural crumb tenderness & flavor",
    dosage: "3.0% – 8.0% w/w",
    suitability: "Commercial Ready"
  },
  {
    sector: "Food & Beverage",
    application: "Beverage Powders & Smoothies",
    benefit: "Smooth tropical body, instant aqueous dispersion without gums",
    dosage: "5.0% – 15.0% w/w",
    suitability: "Commercial Ready"
  },
  {
    sector: "Nutrition",
    application: "Infant Porridges & Weaning Foods",
    benefit: "Easily digestible carbohydrates, hypoallergenic pure matrix",
    dosage: "10.0% – 25.0% w/w",
    suitability: "Commercial Ready"
  },
  {
    sector: "Nutrition",
    application: "Sports Electrolyte & Recovery Powders",
    benefit: "Bioavailable natural potassium, rapid glycogen recovery support",
    dosage: "4.0% – 10.0% w/w",
    suitability: "Commercial Ready"
  },
  {
    sector: "Wellness",
    application: "Daily Gut Health & Prebiotic Sticks",
    benefit: "Synergistic botanical carrier for targeted microbiome nourishment",
    dosage: "2.5% – 6.0% w/w",
    suitability: "Formulation Ready"
  },
  {
    sector: "Beauty & Personal Care",
    application: "Dry Facial Cleansers & Face Masks",
    benefit: "Gentle fruit enzyme conditioning, natural mineral hydration",
    dosage: "5.0% – 20.0% w/w",
    suitability: "Pilot Testing"
  }
];
