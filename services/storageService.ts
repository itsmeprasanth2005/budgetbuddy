import { User, Transaction } from '../types';

const SESSION_KEY = 'budget_buddy_session';
const TRANSACTIONS_KEY = 'budget_buddy_transactions';

export const getCurrentSession = (): User | null => {
  const session = localStorage.getItem(SESSION_KEY);
  return session ? JSON.parse(session) : null;
};

export const setCurrentSession = (user: User) => {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
};

export const clearCurrentSession = () => {
  localStorage.removeItem(SESSION_KEY);
};

export const fetchTransactions = async (userId: string): Promise<Transaction[]> => {
  const transactions = localStorage.getItem(TRANSACTIONS_KEY);
  const allTransactions = transactions ? JSON.parse(transactions) : [];
  return allTransactions.filter((t: Transaction) => t.userId === userId);
};

export const saveTransaction = async (transaction: Transaction): Promise<void> => {
  const transactions = localStorage.getItem(TRANSACTIONS_KEY);
  const allTransactions = transactions ? JSON.parse(transactions) : [];
  allTransactions.push(transaction);
  localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(allTransactions));
};

export const updateTransaction = async (transaction: Transaction): Promise<void> => {
  const transactions = localStorage.getItem(TRANSACTIONS_KEY);
  const allTransactions = transactions ? JSON.parse(transactions) : [];
  const index = allTransactions.findIndex((t: Transaction) => t.id === transaction.id);
  if (index !== -1) {
    allTransactions[index] = transaction;
    localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(allTransactions));
  }
};

export const deleteTransaction = async (transactionId: string): Promise<void> => {
  const transactions = localStorage.getItem(TRANSACTIONS_KEY);
  const allTransactions = transactions ? JSON.parse(transactions) : [];
  const filtered = allTransactions.filter((t: Transaction) => t.id !== transactionId);
  localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(filtered));
};
