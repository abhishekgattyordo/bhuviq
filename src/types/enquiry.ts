export type EnquiryStatus = 'NEW' | 'CONTACTED' | 'IN_PROGRESS' | 'CLOSED';

export interface Enquiry {
  id: string;
  name: string;
  company: string;
  country: string;
  email: string;
  phone?: string | null;
  product?: string | null;
  application?: string | null;
  quantity?: string | null;
  message: string;
  status: EnquiryStatus;
  createdAt: string | Date;
  updatedAt?: string | Date;
}

export interface CreateEnquiryInput {
  name: string;
  company: string;
  country: string;
  email: string;
  phone?: string;
  product?: string;
  application?: string;
  quantity?: string;
  message: string;
}

export interface UpdateEnquiryStatusInput {
  status: EnquiryStatus;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}
