// ShopWave – 404 Not Found Page

import { Link } from "wouter";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#FAFAF7]">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="text-8xl font-bold text-[#E8700A] font-display mb-4 opacity-30">404</div>
        <h1 className="text-3xl font-bold text-[#1A1A2E] font-display mb-3">
          Page Not Found
        </h1>
        <p className="text-gray-500 font-body mb-8 leading-relaxed">
          Oops! The page you're looking for seems to have wandered off. Let's get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/">
            <button className="btn-primary-pill flex items-center gap-2 px-6 py-3">
              <Home size={16} />
              Back to Home
            </button>
          </Link>
          <Link href="/products">
            <button className="flex items-center gap-2 px-6 py-3 border-2 border-[#1A1A2E] text-[#1A1A2E] rounded-full text-sm font-semibold font-body hover:bg-[#1A1A2E] hover:text-white transition-colors">
              <Search size={16} />
              Browse Products
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
