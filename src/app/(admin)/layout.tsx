import type { Metadata } from 'next';
import { Quicksand, Plus_Jakarta_Sans } from 'next/font/google';
import '../globals.css';
import { QueryProvider } from '@/lib/query-client';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';

const quicksand = Quicksand({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'TheBabySteps Admin | Dashboard',
  description: 'Manage products, inventory, orders, customers, and view reports.',
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${quicksand.variable} ${plusJakartaSans.variable} h-full antialiased`}>
      <body className="min-h-full bg-slate-900 text-slate-100 flex flex-col selection:bg-indigo-500/35 selection:text-indigo-200 font-sans">
        <QueryProvider>
          <div className="flex h-screen w-screen overflow-hidden">
            {/* Sidebar navigation */}
            <AdminSidebar />
            
            {/* Main content viewport */}
            <div className="flex flex-col flex-1 h-full min-w-0 overflow-hidden bg-slate-950">
              <AdminHeader />
              <main className="flex-1 overflow-y-auto p-6 md:p-8">
                <div className="mx-auto max-w-7xl">
                  {children}
                </div>
              </main>
            </div>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}

