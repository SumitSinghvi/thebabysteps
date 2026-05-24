import type { Metadata } from 'next';
import { Quicksand, Plus_Jakarta_Sans } from 'next/font/google';
import '../globals.css';
import { QueryProvider } from '@/lib/query-client';
import StoreHeader from '@/components/store/StoreHeader';
import StoreFooter from '@/components/store/StoreFooter';
import CartDrawer from '@/components/store/CartDrawer';

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
  title: 'TheBabySteps Store | Premium Baby Care & Toys',
  description: 'Curated premium baby essentials, clothing, toys, and nursery products designed for modern parenting.',
};

export default function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${quicksand.variable} ${plusJakartaSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#f9f9fd] text-[#191c1e] selection:bg-rose-100 selection:text-rose-900 font-sans">
        <QueryProvider>
          <StoreHeader />
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          <StoreFooter />
          <CartDrawer />
        </QueryProvider>
      </body>
    </html>
  );
}

