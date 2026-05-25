import Link from 'next/link';

export default function StoreFooter() {
  return (
    <footer className="w-full border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="bg-gradient-to-r from-rose-500 to-indigo-600 bg-clip-text text-md font-bold tracking-tight text-transparent">
              TheBabySteps
            </span>
            <span className="text-xs text-slate-400">| Premium Baby Care</span>
          </div>
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} TheBabySteps. Built with love for little feet.
          </p>
          <div className="flex gap-4 text-xs text-slate-500">
            <Link href="/our-story" className="hover:text-rose-500 transition-colors">
              Our Story
            </Link>
            <Link href="/" className="hover:text-rose-500 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/" className="hover:text-rose-500 transition-colors">
              Terms of Service
            </Link>
            <Link href="/" className="hover:text-rose-500 transition-colors">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
