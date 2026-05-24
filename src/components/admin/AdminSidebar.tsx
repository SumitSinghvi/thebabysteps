'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ShoppingBag,
  ShoppingCart,
  BarChart3,
  Settings,
  Baby,
  ArrowLeft,
  ChevronLeft,
  Menu,
} from 'lucide-react';
import { useAdminStore } from '@/store/useAdminStore';

const MENU_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
  { id: 'products', label: 'Products', icon: ShoppingBag, path: '/admin/products' },
  { id: 'orders', label: 'Orders', icon: ShoppingCart, path: '/admin/orders' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '/admin/analytics' },
  { id: 'settings', label: 'Settings', icon: Settings, path: '/admin/settings' },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { isSidebarOpen, selectedTab, setSelectedTab, toggleSidebar } = useAdminStore();

  return (
    <aside
      className={`relative h-full flex flex-col border-r border-slate-800 bg-slate-900 transition-all duration-300 ${
        isSidebarOpen ? 'w-64' : 'w-20'
      }`}
    >
      {/* Header / Logo */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-slate-800">
        <Link href="/admin" className="flex items-center gap-2.5 overflow-hidden">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/20">
            <Baby className="h-5 w-5" />
          </div>
          {isSidebarOpen && (
            <span className="font-extrabold text-sm tracking-tight text-white uppercase bg-gradient-to-r from-indigo-200 to-slate-200 bg-clip-text text-transparent">
              BabyAdmin
            </span>
          )}
        </Link>
        
        {isSidebarOpen && (
          <button
            onClick={toggleSidebar}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Nav Menu */}
      <nav className="flex-1 px-3 py-6 space-y-1">
        {MENU_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = selectedTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setSelectedTab(item.id)}
              className={`w-full flex items-center gap-3.5 px-3 py-3 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/15'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {isSidebarOpen && <span>{item.label}</span>}
              {isActive && isSidebarOpen && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-white animate-ping" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Link to Store */}
      <div className="p-3 border-t border-slate-800">
        <Link
          href="/"
          className={`flex items-center gap-3.5 px-3 py-3 rounded-xl text-sm font-semibold text-rose-400 bg-rose-500/5 hover:bg-rose-500/10 transition-colors ${
            isSidebarOpen ? '' : 'justify-center'
          }`}
        >
          <ArrowLeft className="h-5 w-5 shrink-0" />
          {isSidebarOpen && <span>View Storefront</span>}
        </Link>
      </div>
    </aside>
  );
}
