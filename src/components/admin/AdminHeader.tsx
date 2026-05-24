'use client';

import { Bell, Search, Menu, User } from 'lucide-react';
import { useAdminStore } from '@/store/useAdminStore';

export default function AdminHeader() {
  const { isSidebarOpen, toggleSidebar, selectedTab, searchTerm, setSearchTerm } = useAdminStore();

  const getTitle = () => {
    switch (selectedTab) {
      case 'dashboard': return 'System Dashboard';
      case 'products': return 'Inventory & Catalog';
      case 'orders': return 'Sales Orders';
      case 'analytics': return 'Performance Reports';
      case 'settings': return 'System Settings';
      default: return 'Admin Console';
    }
  };

  return (
    <header className="h-16 border-b border-slate-800 bg-slate-900 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {!isSidebarOpen && (
          <button
            onClick={toggleSidebar}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
          >
            <Menu className="h-5 w-5" />
          </button>
        )}
        <h1 className="text-lg font-bold text-white tracking-tight">{getTitle()}</h1>
      </div>

      <div className="flex items-center gap-6">
        {/* Global Catalog Search */}
        <div className="relative hidden md:block">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search items, SKU, orders..."
            className="h-9 w-64 rounded-xl border border-slate-800 bg-slate-950 pl-9 pr-4 text-xs text-slate-200 outline-none transition-all focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
        </div>

        {/* Notifications */}
        <button className="relative p-2 text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl transition-colors cursor-pointer">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-indigo-500 border-2 border-slate-900" />
        </button>

        {/* Admin Profile */}
        <div className="flex items-center gap-3 pl-4 border-l border-slate-800">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-300">
            <User className="h-5 w-5" />
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-semibold text-white">Administrator</p>
            <p className="text-[10px] text-slate-500">Super Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}
