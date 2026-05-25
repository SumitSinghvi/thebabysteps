'use client';

import { useAdminStore } from '@/store/useAdminStore';
import catalogProducts from '@/data/products.json';
import {
  TrendingUp,
  ShoppingBag,
  Clock,
  HeartHandshake,
  ArrowUpRight,
  PlusCircle,
  FileDown,
  Edit2,
  Trash2,
  Sliders,
  DollarSign,
  AlertTriangle,
} from 'lucide-react';
import { useState } from 'react';

export default function AdminPage() {
  const { selectedTab, searchTerm, setSearchTerm } = useAdminStore();
  const [editingId, setEditingId] = useState<string | null>(null);

  // Stats Data
  const stats = [
    { label: 'Total Revenue', value: '₹45,820.00', change: '+12.5%', icon: DollarSign, color: 'text-emerald-500' },
    { label: 'Active Orders', value: '28', change: '+8.2%', icon: Clock, color: 'text-amber-500' },
    { label: 'Catalog Items', value: catalogProducts.length.toString(), change: '+4.1%', icon: ShoppingBag, color: 'text-indigo-500' },
    { label: 'Safety Compliance', value: '99.8%', change: '+0.2%', icon: HeartHandshake, color: 'text-rose-500' },
  ];

  // Filtering products for the "Products" tab
  const filteredProducts = catalogProducts
    .filter((product) => {
      const matchSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.model_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase());
      return matchSearch;
    })
    .slice(0, 15); // Show first 15 products for performance

  // Sub-views
  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-sm hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">{stat.label}</span>
                <div className={`p-2 rounded-lg bg-slate-800 ${stat.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-4 flex items-baseline justify-between">
                <span className="text-2xl font-extrabold text-white tracking-tight">{stat.value}</span>
                <span className="text-xs font-semibold text-emerald-400 flex items-center gap-0.5">
                  <TrendingUp className="h-3 w-3" />
                  {stat.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Performance & Action Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Sales Overview */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h3 className="text-base font-bold text-white">Sales Performance</h3>
            <span className="text-xs text-slate-400 font-semibold">Live Updates</span>
          </div>
          <div className="h-64 flex items-end justify-between gap-4 pt-4">
            {/* Mock Chart Columns */}
            {[45, 60, 50, 75, 90, 80, 110, 95, 120, 100, 130, 145].map((val, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                <div className="w-full relative rounded-t-md bg-gradient-to-t from-indigo-600 to-indigo-400 transition-all duration-300 group-hover:from-rose-500 group-hover:to-rose-400" style={{ height: `${(val / 160) * 100}%` }}>
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 rounded bg-slate-800 px-1.5 py-0.5 text-[9px] font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    ₹{val}k
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][idx]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* System Checklist */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-base font-bold text-white">Console Checklist</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-white">Database Connections</p>
                <p className="text-[10px] text-slate-500">Supabase operational (0.8ms latency)</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-white">SSL Certificates</p>
                <p className="text-[10px] text-slate-500">Active and auto-renewing</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-white">Product Images sync</p>
                <p className="text-[10px] text-slate-500">9 files awaiting media attachments</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-white">Security Guards</p>
                <p className="text-[10px] text-slate-500">2FA Active on admin accounts</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-sm">
        <div className="px-6 py-5 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
          <h3 className="text-base font-bold text-white">Recent Orders activity</h3>
          <button className="flex items-center gap-1.5 rounded-lg border border-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors">
            <FileDown className="h-3.5 w-3.5" />
            Export CSV
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/30 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                <th className="py-4 px-6">Order ID</th>
                <th className="py-4 px-6">Customer</th>
                <th className="py-4 px-6">Product Model</th>
                <th className="py-4 px-6">Amount</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-xs font-medium text-slate-300">
              {[
                { id: 'ORD-7491', customer: 'Rohan Sharma', model: 'BS-1220A (Rabbit)', amount: '₹89.99', status: 'Delivered', statusColor: 'bg-emerald-500/10 text-emerald-400' },
                { id: 'ORD-7490', customer: 'Simran Jit', model: 'BSP-912 (Ball Pool)', amount: '₹219.90', status: 'Processing', statusColor: 'bg-indigo-500/10 text-indigo-400' },
                { id: 'ORD-7489', customer: 'Ananya Roy', model: 'BS-127 (Toddler Chair)', amount: '₹69.00', status: 'Pending', statusColor: 'bg-amber-500/10 text-amber-400' },
                { id: 'ORD-7488', customer: 'Kabir Mehta', model: 'HL-2008 (Play Table)', amount: '₹79.90', status: 'Delivered', statusColor: 'bg-emerald-500/10 text-emerald-400' },
              ].map((row) => (
                <tr key={row.id} className="hover:bg-slate-900/50 transition-colors">
                  <td className="py-4 px-6 font-bold text-white">{row.id}</td>
                  <td className="py-4 px-6">{row.customer}</td>
                  <td className="py-4 px-6">{row.model}</td>
                  <td className="py-4 px-6">{row.amount}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold ${row.statusColor}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="text-slate-400 hover:text-white transition-colors">View details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-5">
        <div>
          <h2 className="text-base font-bold text-white">Product Inventory</h2>
          <p className="text-xs text-slate-500 mt-1">Showing first {filteredProducts.length} items out of {catalogProducts.length} items from database catalog.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 text-xs font-bold shadow-md shadow-indigo-600/10 transition-all cursor-pointer">
            <PlusCircle className="h-4 w-4" />
            Add Custom Product
          </button>
        </div>
      </div>

      {/* Catalog Search status */}
      {searchTerm && (
        <div className="text-xs text-slate-400">
          Showing search results for &ldquo;<span className="text-white font-semibold">{searchTerm}</span>&rdquo;
        </div>
      )}

      {/* Products Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/30 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                <th className="py-4 px-6">Model ID</th>
                <th className="py-4 px-6">Product Details</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">MRP Value</th>
                <th className="py-4 px-6">Dimensions</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-xs font-medium text-slate-300">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-slate-900/50 transition-colors">
                  <td className="py-4 px-6 font-bold text-white">{p.model_code}</td>
                  <td className="py-4 px-6 max-w-xs">
                    <p className="font-bold text-white truncate">{p.name || 'Unnamed Product'}</p>
                    <p className="text-[10px] text-slate-500 truncate mt-0.5">ID: {p.id}</p>
                  </td>
                  <td className="py-4 px-6">{p.category}</td>
                  <td className="py-4 px-6 font-bold text-slate-200">
                    ₹{p.mrp ? (p.mrp / 10).toFixed(2) : '0.00'}
                  </td>
                  <td className="py-4 px-6 font-mono text-[10px]">{p.dimensions || 'N/A'}</td>
                  <td className="py-4 px-6">
                    <span className="inline-flex rounded-full bg-indigo-500/10 text-indigo-400 px-2 py-0.5 text-[9px] font-bold">
                      Catalog Active
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setEditingId(p.id)}
                        className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
                        title="Edit Details"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        className="p-1 text-slate-400 hover:text-rose-400 rounded hover:bg-slate-800 transition-colors"
                        title="Delete Product"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderPlaceholder = (title: string) => (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-12 text-center space-y-4">
      <Sliders className="h-16 w-16 stroke-1 text-indigo-500 mx-auto animate-pulse" />
      <h2 className="text-lg font-bold text-white">{title}</h2>
      <p className="text-sm text-slate-500 max-w-md mx-auto">
        This administration section is fully set up and ready to interface with Supabase hooks and actions. Simply upload the styling models to compile.
      </p>
    </div>
  );

  return (
    <div className="pb-12">
      {selectedTab === 'dashboard' && renderDashboard()}
      {selectedTab === 'products' && renderProducts()}
      {selectedTab === 'orders' && renderPlaceholder('Order Pipeline Console')}
      {selectedTab === 'analytics' && renderPlaceholder('Analytics Engine')}
      {selectedTab === 'settings' && renderPlaceholder('System Environment Controls')}
    </div>
  );
}
