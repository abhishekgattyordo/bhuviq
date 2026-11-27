import { PrismaClient, EnquiryStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding initial demo enquiries...');

  // Clean or upsert demo enquiries
  const demoEnquiries = [
    {
      id: 'demo-enq-001',
      name: 'John Miller',
      company: 'ABC Foods & Beverages Ltd',
      country: 'India',
      email: 'john.miller@abcfoods.com',
      phone: '+91 9876543210',
      product: 'Banana Powder (100% Pure Standard 80 Mesh)',
      application: 'Food & Beverage (Bakery & Nutrition)',
      quantity: '500 kg',
      message: 'We are interested in evaluating your 100% pure banana powder for our new breakfast cereal and clean-label bakery bar formulations. Please share technical COA and pilot pricing.',
      status: EnquiryStatus.NEW,
    },
    {
      id: 'demo-enq-002',
      name: 'Elena Rostova',
      company: 'Helvetic Nutrition AG',
      country: 'Switzerland',
      email: 'elena.rostova@helveticnutrition.ch',
      phone: '+41 22 890 1234',
      product: 'Banana Powder (Fine Micronized 100+ Mesh)',
      application: 'Nutrition & Functional Supplements',
      quantity: '2,000 kg',
      message: 'Looking for high-potassium botanical banana powder for sports hydration mix. Need batch-to-batch moisture testing protocol and export lead times to Basel.',
      status: EnquiryStatus.CONTACTED,
    },
    {
      id: 'demo-enq-003',
      name: 'Kenji Sato',
      company: 'Kyoto Clean Organics',
      country: 'Japan',
      email: 'k.sato@kyotoclean.co.jp',
      phone: '+81 3 5555 0192',
      product: 'Banana Powder (100% Pure Standard 80 Mesh)',
      application: 'Industrial Food Processing Premixes',
      quantity: '10 MT (Annual Contract)',
      message: 'Requesting quotation for regular sea-freight 20ft container deliveries to Yokohama seaport with full phytosanitary clearance dossiers.',
      status: EnquiryStatus.IN_PROGRESS,
    }
  ];

  for (const enq of demoEnquiries) {
    await prisma.enquiry.upsert({
      where: { id: enq.id },
      update: enq,
      create: enq,
    });
  }

  console.log(`Successfully seeded ${demoEnquiries.length} demo enquiries.`);
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
