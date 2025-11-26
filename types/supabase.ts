export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          created_at: string;
        };
        Insert: {
          id: string;
          email: string;
          name: string;
          created_at?: string;
        };
        Update: {
          email?: string;
          name?: string;
        };
      };
      transactions: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          amount: number;
          type: 'income' | 'expense';
          payment_mode: string;
          date_time: string;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          amount: number;
          type: 'income' | 'expense';
          payment_mode: string;
          date_time: string;
          notes?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          title?: string;
          amount?: number;
          type?: 'income' | 'expense';
          payment_mode?: string;
          date_time?: string;
          notes?: string;
          updated_at?: string;
        };
      };
    };
  };
};
