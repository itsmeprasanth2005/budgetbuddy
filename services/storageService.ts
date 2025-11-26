import { User, Transaction } from '../types';
import { supabase } from './supabaseClient';

export const getCurrentSession = async (): Promise<User | null> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();

    if (error) throw error;
    if (!data) return null;

    return {
      id: data.id,
      name: data.name,
      email: data.email,
      createdAt: new Date(data.created_at).getTime(),
    };
  } catch (error) {
    console.error('Error getting current session:', error);
    return null;
  }
};

export const setCurrentSession = async (user: User, password: string, isSignUp: boolean) => {
  try {
    if (isSignUp) {
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: user.email,
        password,
      });

      if (signUpError) throw signUpError;
      if (!authData.user) throw new Error('Failed to create user');

      const { error: insertError } = await supabase.from('users').insert({
        id: authData.user.id,
        email: user.email,
        name: user.name,
      });

      if (insertError) throw insertError;
    } else {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password,
      });

      if (signInError) throw signInError;
    }
  } catch (error) {
    console.error('Error setting session:', error);
    throw error;
  }
};

export const clearCurrentSession = async () => {
  try {
    await supabase.auth.signOut();
  } catch (error) {
    console.error('Error clearing session:', error);
  }
};

export const fetchTransactions = async (userId: string): Promise<Transaction[]> => {
  try {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', userId)
      .order('date_time', { ascending: false });

    if (error) throw error;

    return (data || []).map((t) => ({
      id: t.id,
      userId: t.user_id,
      dateTime: t.date_time,
      type: t.type as 'income' | 'expense',
      title: t.title,
      amount: t.amount,
      paymentMode: t.payment_mode as any,
      notes: t.notes || undefined,
      createdAt: new Date(t.created_at).getTime(),
      updatedAt: new Date(t.updated_at).getTime(),
    }));
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return [];
  }
};

export const saveTransaction = async (transaction: Transaction): Promise<void> => {
  try {
    const { error } = await supabase.from('transactions').insert({
      user_id: transaction.userId,
      title: transaction.title,
      amount: transaction.amount,
      type: transaction.type,
      payment_mode: transaction.paymentMode,
      date_time: transaction.dateTime,
      notes: transaction.notes,
    });

    if (error) throw error;
  } catch (error) {
    console.error('Error saving transaction:', error);
    throw error;
  }
};

export const updateTransaction = async (transaction: Transaction): Promise<void> => {
  try {
    const { error } = await supabase
      .from('transactions')
      .update({
        title: transaction.title,
        amount: transaction.amount,
        type: transaction.type,
        payment_mode: transaction.paymentMode,
        date_time: transaction.dateTime,
        notes: transaction.notes,
      })
      .eq('id', transaction.id);

    if (error) throw error;
  } catch (error) {
    console.error('Error updating transaction:', error);
    throw error;
  }
};

export const deleteTransaction = async (transactionId: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('id', transactionId);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting transaction:', error);
    throw error;
  }
};
