import { jsPDF } from 'jspdf';
import { CURRENT_PRODUCT } from '../data/products';
import { PRODUCT_SPEC_SHEET } from '../data/quality';

function addDocumentFooter(doc: jsPDF, footerNote: string) {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 44;
  const totalPages = doc.getNumberOfPages();

  for (let i = 1; i <= totalPages; i += 1) {
    doc.setPage(i);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(102, 112, 133);
    doc.text(footerNote, margin, pageHeight - 24);
    doc.text(`Page ${i} of ${totalPages}`, pageWidth - margin - 48, pageHeight - 24);
  }
}

function addDocumentHeader(
  doc: jsPDF,
  eyebrow: string,
  title: string,
  subtitle: string
) {
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 44;

  doc.setFillColor(16, 42, 67);
  doc.rect(0, 0, pageWidth, 88, 'F');
  doc.setFillColor(184, 155, 94);
  doc.rect(0, 88, pageWidth, 3, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(184, 155, 94);
  doc.text(eyebrow, margin, 30);

  doc.setFontSize(18);
  doc.setTextColor(250, 247, 240);
  doc.text(title, margin, 54);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(225, 225, 220);
  doc.text(subtitle, margin, 73);
}

export function downloadProductSpecificationPdf(): string {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 44;
  const contentWidth = pageWidth - margin * 2;
  let y = 112;

  const ensureSpace = (needed: number) => {
    if (y + needed > pageHeight - 54) {
      doc.addPage();
      y = 48;
    }
  };

  const addSectionTitle = (title: string) => {
    ensureSpace(34);
    doc.setFillColor(247, 243, 234);
    doc.rect(margin, y, contentWidth, 22, 'F');
    doc.setDrawColor(184, 155, 94);
    doc.line(margin, y + 22, margin + contentWidth, y + 22);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(16, 42, 67);
    doc.text(title.toUpperCase(), margin + 8, y + 15);
    y += 32;
  };

  const addRow = (label: string, value: string, extra?: string) => {
    const valueText = extra ? `${value}  (${extra})` : value;
    const wrapped = doc.splitTextToSize(valueText, contentWidth - 185);
    const rowHeight = Math.max(18, wrapped.length * 13 + 6);
    ensureSpace(rowHeight + 4);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(16, 42, 67);
    doc.text(label, margin + 4, y + 11);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(40, 55, 71);
    doc.text(wrapped, margin + 180, y + 11);

    doc.setDrawColor(225, 225, 220);
    doc.line(margin, y + rowHeight, margin + contentWidth, y + rowHeight);
    y += rowHeight + 2;
  };

  addDocumentHeader(
    doc,
    'BHUVI Q NYRA INTERNATIONAL PRIVATE LIMITED  |  PRODUCT SPECIFICATION SHEET',
    'Banana Powder (100% Pure)',
    `Botanical Name: ${CURRENT_PRODUCT.botanicalName}   |   Doc Ref: DOC-BQNP-TDS-2026`
  );

  addSectionTitle('1. Product Overview, Maturity & Composition');
  addRow('Product Name', 'Banana Powder (100% Pure)');
  addRow('Botanical Source', CURRENT_PRODUCT.botanicalName);
  addRow('Geographic Origin', 'India (Approved agricultural suppliers)');
  addRow('Banana Maturity', 'Ripe (controlled ripeness & Brix graded prior to dehydration)');
  addRow('Ingredient Composition', '100% Pure Banana (no carriers, fillers, maltodextrin, or additives)');
  addRow('Banana Peel Status', 'Excluded (sanitary washed and hygienically peeled prior to processing)');
  addRow('Processing Method', 'Enclosed SS-316 low-temperature dehydration and calibrated milling');
  y += 8;

  addSectionTitle('2. Physicochemical Specifications');
  addRow('Moisture Content (LOD)', '<= 5.0% w/w', 'Halogen / AOAC 925.10 / Karl Fischer');
  addRow('Water Activity (aw)', 'Confirmed per lot Certificate of Analysis upon request');
  addRow('Particle Size / Mesh', '>= 95% pass through 60 to 100 Mesh', 'ASTM Sieve Analysis');
  addRow('Colour / Appearance', 'Pale golden-ivory to light cream, fine free-flowing powder', 'Visual / Lovibond');
  addRow('pH (10% aqueous solution)', '4.8 - 5.6', 'Potentiometric');
  addRow('Bulk Density', '0.45 - 0.65 g/ml (Tapped)', 'USP <616>');
  addRow('Aroma & Taste', 'Characteristic ripe banana aroma, clean natural sweet profile', 'Organoleptic');
  y += 8;

  addSectionTitle('3. Microbiological Limits & Heavy Metals');
  PRODUCT_SPEC_SHEET.microbiological.forEach((item) => {
    addRow(item.parameter, item.specification, item.method);
  });
  addRow(
    'Heavy Metals (Pb, As, Cd, Hg)',
    'Accredited laboratory screening dossier confirmed per batch CoA upon request'
  );
  y += 8;

  addSectionTitle('4. Nutritional Profile');
  addRow(
    'Confirmed Profile',
    '100% single-ingredient ripe banana carbohydrates, naturally occurring dietary potassium and soluble fibers; zero added sugars or carriers.'
  );
  addRow(
    'Quantitative Nutrition Panel',
    'Per-100g accredited laboratory values are issued upon official technical inquiry.'
  );
  y += 8;

  addSectionTitle('5. Packaging, Storage, Shelf Life & Commercial Supply');
  addRow(
    'Packaging Formats',
    '25 kg fiber drum with double PE barrier liner; 20 kg / 25 kg multi-layer kraft bag with aluminum/PE moisture barrier; 1 kg / 5 kg / 10 kg pilot pouches.'
  );
  addRow(
    'Storage Instructions',
    'Store in cool, dry, dark conditions below 25 C (77 F) and < 60% RH. Hygroscopic material: heat-reseal or tightly clamp inner liner after opening.'
  );
  addRow('Shelf Life', '24 months from manufacturing date in unopened original barrier packaging.');
  addRow('MOQ', 'Pilot runs supported from 25 kg; commercial bulk MOQ confirmed per quotation.');
  addRow('Lead Time', 'Confirmed per order quantity, mesh specification, and destination schedule upon inquiry.');

  addDocumentFooter(
    doc,
    'Bhuvi Q Nyra International Private Limited  •  Baseline specification; lot values issued on Batch CoA.'
  );

  const filename = 'BhuviQ-Nyra-Banana-Powder-Specification.pdf';
  doc.save(filename);
  return filename;
}

export function downloadSampleCoaTemplatePdf(): string {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 44;
  const contentWidth = pageWidth - margin * 2;
  let y = 108;

  addDocumentHeader(
    doc,
    'BHUVI Q NYRA INTERNATIONAL PRIVATE LIMITED  |  SAMPLE COA FORMAT',
    'Sample CoA Template - Banana Powder (100% Pure)',
    `Format Reference: DOC-BQNP-COA-STD  |  Botanical: ${CURRENT_PRODUCT.botanicalName}`
  );

  doc.setFillColor(247, 243, 234);
  doc.rect(margin, y, contentWidth, 34, 'F');
  doc.setDrawColor(184, 155, 94);
  doc.rect(margin, y, contentWidth, 34, 'S');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(16, 42, 67);
  doc.text(
    'TEMPLATE NOTICE: Format reference only. Genuine batch-specific CoAs are issued separately per production lot.',
    margin + 10,
    y + 14
  );
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(80, 92, 108);
  doc.text(
    'No placeholder test results or fabricated pass records are populated in this reference template.',
    margin + 10,
    y + 26
  );

  y += 50;

  const metaRows = [
    ['Production Lot Number', '[Assigned per production run]'],
    ['Manufacturing & Expiry Date', '[Lot-specific dates - 24 month shelf life]'],
    ['Raw Material Origin', '[Approved supplier cluster traceability ID]'],
    ['Ingredient & Peel Status', '100% Pure Ripe Banana (Peel Excluded)']
  ];

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(16, 42, 67);
  doc.text('BATCH TRACEABILITY HEADER FIELDS', margin, y);
  y += 10;

  metaRows.forEach(([k, v]) => {
    doc.setDrawColor(220, 220, 215);
    doc.line(margin, y, margin + contentWidth, y);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(16, 42, 67);
    doc.text(k, margin + 4, y + 13);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(70, 82, 98);
    doc.text(v, margin + 175, y + 13);
    y += 20;
  });
  doc.line(margin, y, margin + contentWidth, y);
  y += 20;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(16, 42, 67);
  doc.text('ANALYTICAL PARAMETERS & TEST METHODS', margin, y);
  y += 10;

  const colX = [margin, margin + 150, margin + 295, margin + 410];
  doc.setFillColor(16, 42, 67);
  doc.rect(margin, y, contentWidth, 20, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(250, 247, 240);
  doc.text('Parameter', colX[0] + 4, y + 13);
  doc.text('Standard Spec', colX[1] + 4, y + 13);
  doc.text('Test Method', colX[2] + 4, y + 13);
  doc.text('Lot Result', colX[3] + 4, y + 13);
  y += 20;

  const specRows = [
    ['Appearance & Colour', 'Pale golden-ivory to cream', 'Visual / Lovibond', '[Per Lot Assay]'],
    ['Moisture Content', '<= 5.0% w/w', 'AOAC 925.10 / LOD', '[Per Lot Assay]'],
    ['Particle Size', '>= 95% pass 60-100 Mesh', 'ASTM Sieve', '[Per Lot Assay]'],
    ['pH (10% solution)', '4.8 - 5.6', 'Potentiometric', '[Per Lot Assay]'],
    ['Bulk Density', '0.45 - 0.65 g/ml', 'USP <616>', '[Per Lot Assay]'],
    ['Total Aerobic Count', '< 5,000 CFU/g', 'ISO 4833-1', '[Per Lot Assay]'],
    ['Yeast & Mold', '< 100 CFU/g', 'ISO 21527-2', '[Per Lot Assay]'],
    ['E. coli / Salmonella / S. aureus', 'Absent per ISO limit', 'ISO 16649 / 6579 / 6888', '[Per Lot Assay]'],
    ['Water Activity / Heavy Metals', 'Confirmed per batch scope', 'Verified Lab Method', '[On Request / Lot]']
  ];

  specRows.forEach(([param, spec, method, res], idx) => {
    if (idx % 2 === 1) {
      doc.setFillColor(250, 248, 242);
      doc.rect(margin, y, contentWidth, 20, 'F');
    }
    doc.setDrawColor(225, 225, 220);
    doc.line(margin, y + 20, margin + contentWidth, y + 20);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(16, 42, 67);
    doc.text(param, colX[0] + 4, y + 13);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(40, 89, 67);
    doc.text(spec, colX[1] + 4, y + 13);
    doc.setTextColor(80, 92, 108);
    doc.text(method, colX[2] + 4, y + 13);
    doc.text(res, colX[3] + 4, y + 13);
    y += 20;
  });

  y += 22;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(70, 82, 98);
  doc.text(
    'Authorized QA Sign-Off: [Issued only after physical, chemical & microbiological release verification of the specific production lot]',
    margin,
    y
  );

  addDocumentFooter(
    doc,
    'Bhuvi Q Nyra International Private Limited  •  Sample CoA Format Reference  •  Contact QA for lot-linked CoA issuance'
  );

  const filename = 'BhuviQ-Nyra-Sample-COA-Template.pdf';
  doc.save(filename);
  return filename;
}

export function downloadAllergenNonGmoPdf(): string {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 44;
  const contentWidth = pageWidth - margin * 2;
  let y = 112;

  addDocumentHeader(
    doc,
    'BHUVI Q NYRA INTERNATIONAL PRIVATE LIMITED  |  COMPOSITION DECLARATION',
    'Allergen & Composition Reference Statement',
    `Product: Banana Powder (100% Pure)  |  Doc Ref: DOC-BQNP-ALG-2026`
  );

  const addParagraph = (title: string, body: string) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(16, 42, 67);
    doc.text(title, margin, y);
    y += 15;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(55, 65, 81);
    const lines = doc.splitTextToSize(body, contentWidth);
    doc.text(lines, margin, y);
    y += lines.length * 14 + 14;
  };

  addParagraph(
    '1. Single-Ingredient Botanical Composition',
    'Bhuvi Q Nyra Banana Powder is manufactured exclusively from 100% pure ripe bananas (Musa acuminata / Musa balbisiana) sourced from approved food-grade suppliers in India. Bananas are washed and hygienically peeled prior to dehydration so banana peel is excluded. No maltodextrin, carriers, anti-caking agents, synthetic flavors, colors, or preservatives are added.'
  );

  addParagraph(
    '2. Major Allergen Status (Formulation Basis)',
    'Based on the single-ingredient banana formulation and enclosed SS-316 processing line design, the product does not contain added cereals containing gluten, crustaceans, eggs, fish, peanuts, soybeans, milk/dairy, tree nuts, celery, mustard, sesame seeds, lupin, molluscs, or added sulphites.'
  );

  addParagraph(
    '3. Non-GMO & Plant-Origin Basis',
    'Manufactured solely from traditionally cultivated non-genetically-modified banana cultivars grown in India. Specific third-party PCR or external certification documentation is provided directly upon formal B2B audit or compliance request where applicable.'
  );

  addParagraph(
    '4. Lot Verification Notice',
    'This reference document summarizes baseline product composition parameters. Batch-specific compliance declarations and analytical verification dossiers are issued upon commercial enquiry.'
  );

  addDocumentFooter(
    doc,
    'Bhuvi Q Nyra International Private Limited  •  Reference Composition Statement (DOC-BQNP-ALG-2026)'
  );

  const filename = 'BhuviQ-Nyra-Allergen-Non-GMO-Statement.pdf';
  doc.save(filename);
  return filename;
}

export function downloadStorageHandlingPdf(): string {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 44;
  const contentWidth = pageWidth - margin * 2;
  let y = 112;

  addDocumentHeader(
    doc,
    'BHUVI Q NYRA INTERNATIONAL PRIVATE LIMITED  |  LOGISTICS & HANDLING GUIDE',
    'Storage, Packaging & Handling Technical Guide',
    `Product: Banana Powder (100% Pure)  |  Doc Ref: DOC-BQNP-HND-2026`
  );

  const sections = [
    {
      title: '1. Hygroscopic Sensitivity & Warehouse Environment',
      body: 'Because pure ripe banana powder contains naturally occurring fruit sugars without artificial anti-caking fillers, it is naturally hygroscopic. Store unopened containers in a clean, cool, dry, dark warehouse maintained below 25 C (77 F) and below 60% relative humidity, away from direct sunlight, moisture condensation, and strong odors.'
    },
    {
      title: '2. Approved Packaging Formats',
      body: 'Commercial bulk formats include 25 kg sealed fiber drums with double food-grade polyethylene moisture-barrier liners and tamper-evident bands, as well as 20 kg / 25 kg multi-wall kraft bags or 5-ply corrugated cartons with internal aluminum/PE barrier liners. Pilot evaluation batches are supplied in 1 kg, 5 kg, and 10 kg nitrogen-flushed barrier pouches.'
    },
    {
      title: '3. Line Loading & Resealing Protocol',
      body: 'Open barrier liners only immediately prior to hopper charging or batching in a humidity-controlled blending area. Any partially consumed liner must be expelled of excess air and heat-resealed or tightly clamped immediately after dosing to avoid atmospheric moisture uptake and caking.'
    },
    {
      title: '4. Shelf Life & Traceability',
      body: 'Recommended shelf life is 24 months from the date of manufacture when stored continuously in original unopened moisture-barrier packaging under specified conditions. Retain lot batch labels for full incoming QC traceability.'
    }
  ];

  sections.forEach((sec) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(16, 42, 67);
    doc.text(sec.title, margin, y);
    y += 15;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(55, 65, 81);
    const lines = doc.splitTextToSize(sec.body, contentWidth);
    doc.text(lines, margin, y);
    y += lines.length * 14 + 14;
  });

  addDocumentFooter(
    doc,
    'Bhuvi Q Nyra International Private Limited  •  Storage & Handling Guide (DOC-BQNP-HND-2026)'
  );

  const filename = 'BhuviQ-Nyra-Storage-Handling-Guide.pdf';
  doc.save(filename);
  return filename;
}

export function downloadDocumentByCode(code: string): string {
  switch (code) {
    case 'DOC-BQNP-COA-STD':
      return downloadSampleCoaTemplatePdf();
    case 'DOC-BQNP-ALG-2026':
      return downloadAllergenNonGmoPdf();
    case 'DOC-BQNP-HND-2026':
      return downloadStorageHandlingPdf();
    case 'DOC-BQNP-TDS-2026':
    default:
      return downloadProductSpecificationPdf();
  }
}
