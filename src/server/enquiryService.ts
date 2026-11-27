import { prisma } from '../lib/prisma';
import { CreateEnquiryInput, Enquiry, EnquiryStatus } from '../types/enquiry';

// Fallback in-memory store for demo/development when DATABASE_URL is not yet connected
let fallbackStore: Enquiry[] = [
  {
    id: 'demo-enq-001',
    name: 'John Miller',
    company: 'ABC Foods & Beverages Ltd',
    country: 'India',
    email: 'john.miller@abcfoods.com',
    phone: '+91 9876543210',
    product: 'Banana Powder (100% Pure Standard 60 to 100 Mesh)',
    application: 'Food & Beverage',
    quantity: '500 kg',
    message: 'We are interested in evaluating your 100% pure banana powder for our new breakfast cereal and clean-label bakery bar formulations. Please share technical COA and pilot pricing.',
    status: 'NEW',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
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
    status: 'CONTACTED',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
  {
    id: 'demo-enq-003',
    name: 'Kenji Sato',
    company: 'Kyoto Clean Organics',
    country: 'Japan',
    email: 'k.sato@kyotoclean.co.jp',
    phone: '+81 3 5555 0192',
    product: 'Banana Powder (100% Pure Standard 60 to 100 Mesh)',
    application: 'Industrial Food Processing Premixes',
    quantity: '10 MT (Annual Contract)',
    message: 'Requesting quotation for regular sea-freight 20ft container deliveries to Yokohama seaport with full phytosanitary clearance dossiers.',
    status: 'IN_PROGRESS',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 8).toISOString(),
  }
];

export async function createEnquiry(input: CreateEnquiryInput): Promise<Enquiry> {
  if (process.env.DATABASE_URL) {
    try {
      const created = await prisma.enquiry.create({
        data: {
          name: input.name,
          company: input.company,
          country: input.country,
          email: input.email,
          phone: input.phone || null,
          product: input.product || null,
          application: input.application || null,
          quantity: input.quantity || null,
          message: input.message,
          status: 'NEW',
        }
      });
      return created;
    } catch (dbError) {
      console.warn('PostgreSQL database query failed, using in-memory store:', dbError);
    }
  }

  // In-memory fallback
  const newEnquiry: Enquiry = {
    id: `enq-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    name: input.name,
    company: input.company,
    country: input.country,
    email: input.email,
    phone: input.phone || null,
    product: input.product || null,
    application: input.application || null,
    quantity: input.quantity || null,
    message: input.message,
    status: 'NEW',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  fallbackStore.unshift(newEnquiry);
  return newEnquiry;
}

export async function getAllEnquiries(): Promise<Enquiry[]> {
  if (process.env.DATABASE_URL) {
    try {
      const enquiries = await prisma.enquiry.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      });
      return enquiries;
    } catch (dbError) {
      console.warn('PostgreSQL database query failed, using in-memory store:', dbError);
    }
  }

  return [...fallbackStore];
}

export async function getEnquiryById(id: string): Promise<Enquiry | null> {
  if (process.env.DATABASE_URL) {
    try {
      const enquiry = await prisma.enquiry.findUnique({
        where: { id },
      });
      return enquiry;
    } catch (dbError) {
      console.warn('PostgreSQL database query failed, using in-memory store:', dbError);
    }
  }

  const found = fallbackStore.find((item) => item.id === id);
  return found || null;
}

export async function updateEnquiryStatus(id: string, status: EnquiryStatus): Promise<Enquiry | null> {
  if (process.env.DATABASE_URL) {
    try {
      const updated = await prisma.enquiry.update({
        where: { id },
        data: {
          status: status as any,
        },
      });
      return updated;
    } catch (dbError: any) {
      if (dbError.code === 'P2025') {
        // Record not found in Prisma
        return null;
      }
      console.warn('PostgreSQL database query failed, using in-memory store:', dbError);
    }
  }

  const index = fallbackStore.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }

  fallbackStore[index] = {
    ...fallbackStore[index],
    status,
    updatedAt: new Date().toISOString(),
  };

  return fallbackStore[index];
}

export async function deleteEnquiry(id: string): Promise<boolean> {
  if (process.env.DATABASE_URL) {
    try {
      await prisma.enquiry.delete({
        where: { id },
      });
      return true;
    } catch (dbError: any) {
      if (dbError.code === 'P2025') {
        return false;
      }
      console.warn('PostgreSQL database query failed, using in-memory store:', dbError);
    }
  }

  const initialLength = fallbackStore.length;
  fallbackStore = fallbackStore.filter((item) => item.id !== id);
  return fallbackStore.length < initialLength;
}
