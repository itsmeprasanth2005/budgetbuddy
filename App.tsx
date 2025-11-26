import React, { useEffect, useState, useCallback } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Auth } from './pages/Auth';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { TransactionList } from './pages/TransactionList';
import { TransactionForm } from './pages/TransactionForm';
import { Reports } from './pages/Reports';
import { User, Transaction } from './types';
import { getCurrentSession, fetchTransactions } from './services/storageService';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [dataLoading, setDataLoading] = useState(false);

  // Restore session
  useEffect(() => {
    (async () => {
      try {
        const session = await getCurrentSession();
        if (session) {
          setUser(session);
        }
      } catch (error) {
        console.error('Failed to restore session:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Fetch transactions when user logs in
  const refreshTransactions = useCallback(async () => {
    if (!user) return;
    setDataLoading(true);
    try {
      const data = await fetchTransactions(user.id);
      setTransactions(data);
    } catch (error) {
      console.error('Failed to fetch transactions', error);
    } finally {
      setDataLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      refreshTransactions();
    } else {
      setTransactions([]);
    }
  }, [user, refreshTransactions]);

  if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;

  return (
    <HashRouter>
      <Routes>
        <Route 
          path="/login" 
          element={!user ? <Auth onLogin={setUser} /> : <Navigate to="/" />} 
        />
        
        <Route
          path="*"
          element={
            user ? (
              <Layout user={user} setUser={setUser}>
                <Routes>
                  <Route path="/" element={<Dashboard transactions={transactions} loading={dataLoading} />} />
                  <Route path="/transactions" element={<TransactionList transactions={transactions} onRefresh={refreshTransactions} />} />
                  <Route path="/add" element={<TransactionForm userId={user.id} onSave={refreshTransactions} />} />
                  <Route path="/reports" element={<Reports transactions={transactions} />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </HashRouter>
  );
};

export default App;