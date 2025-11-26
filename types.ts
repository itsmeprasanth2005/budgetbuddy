
export type TransactionType = 'income' | 'expense';

export type PaymentMode = 'Cash' | 'Card' | 'UPI' | 'Bank Transfer' | 'Other';

export interface Transaction {
  id: string;
  userId: string;
  dateTime: string; // ISO String
  type: TransactionType;
  title: string;
  amount: number;
  paymentMode: PaymentMode;
  notes?: string;
  createdAt: number;
  updatedAt: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  // Password is optional because Firebase Auth handles it securely remotely
  password?: string; 
  createdAt: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface DateRange {
  start: Date;
  end: Date;
}

export type ReportPeriod = 'daily' | 'weekly' | 'monthly' | 'yearly';
