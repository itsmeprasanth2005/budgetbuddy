import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types';
import { LogOut, LayoutDashboard, List, Plus, BarChart3 } from 'lucide-react';
import { clearCurrentSession } from '../services/storageService';

interface LayoutProps {
  user: User;
  setUser: (user: User | null) => void;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ user, setUser, children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearCurrentSession();
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-indigo-600">Budget Buddy</h1>
        </div>

        <nav className="space-y-2 px-4">
          {[
            { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
            { icon: List, label: 'Transactions', path: '/transactions' },
            { icon: Plus, label: 'Add Transaction', path: '/add' },
            { icon: BarChart3, label: 'Reports', path: '/reports' },
          ].map(({ icon: Icon, label, path }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-indigo-50 text-gray-700 hover:text-indigo-600 transition font-medium"
            >
              <Icon size={20} />
              {label}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 w-64 border-t bg-gray-50 p-4">
          <div className="mb-4">
            <p className="text-sm text-gray-600">Logged in as</p>
            <p className="font-semibold text-gray-900">{user.name}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
};
