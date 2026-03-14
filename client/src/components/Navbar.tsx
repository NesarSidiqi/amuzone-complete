// ShopWave – Navbar Component
// Design: Sunrise Marketplace – transparent-to-solid on scroll, warm white bg, saffron accents

import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
  Zap,
  Shirt,
  Home,
  Sparkles,
  Dumbbell,
  BookOpen,
  Gamepad2,
  ShoppingBasket,
  MapPin,
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation } from "@/lib/i18n";
import { searchProducts } from "@/lib/data";
import { toast } from "sonner";
import LanguageSwitcher from "./LanguageSwitcher";

const categoryIcons: Record<string, React.ReactNode> = {
  electronics: <Zap size={16} />,
  fashion: <Shirt size={16} />,
  home: <Home size={16} />,
  beauty: <Sparkles size={16} />,
  sports: <Dumbbell size={16} />,
  books: <BookOpen size={16} />,
  toys: <Gamepad2 size={16} />,
  food: <ShoppingBasket size={16} />,
};

const navCategories = [
  { id: "electronics", name: "Electronics" },
  { id: "fashion", name: "Fashion" },
  { id: "home", name: "Home & Living" },
  { id: "beauty", name: "Beauty" },
  { id: "sports", name: "Sports" },
  { id: "books", name: "Books" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ReturnType<typeof searchProducts>>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [, navigate] = useLocation();
  const searchRef = useRef<HTMLDivElement>(null);
  const { totalItems, openCart } = useCart();
  const { wishlist } = useWishlist();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (q: string) => {
    setSearchQuery(q);
    if (q.trim().length > 1) {
      setSearchResults(searchProducts(q).slice(0, 5));
      setSearchOpen(true);
    } else {
      setSearchResults([]);
      setSearchOpen(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
    }
  };

  return (
    <>
      {/* Top announcement bar */}
      <div className="bg-[#1A1A2E] text-white text-xs py-2 text-center font-body tracking-wide">
        <span className="opacity-90">Free shipping on orders over $50 · </span>
        <span className="text-[#E8700A] font-semibold cursor-pointer hover:underline">
          Shop Now →
        </span>
      </div>

      {/* Main navbar */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-[#E8E8E0]"
            : "bg-[#FAFAF7]"
        }`}
      >
        <div className="container">
          <div className="flex items-center gap-4 h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="w-8 h-8 rounded-lg bg-[#E8700A] flex items-center justify-center">
                <ShoppingCart size={16} className="text-white" strokeWidth={2.5} />
              </div>
              <span
                className="text-xl font-bold tracking-tight"
                style={{ fontFamily: "var(--font-display)", color: "#1A1A2E" }}
              >
                Amu<span style={{ color: "#E8700A" }}>zone</span>
              </span>
            </Link>

            {/* Delivery location */}
            <div className="hidden lg:flex items-center gap-1 text-xs text-gray-500 shrink-0">
              <MapPin size={13} className="text-[#E8700A]" />
              <div>
                <div className="text-[10px] text-gray-400">Deliver to</div>
                <div className="font-semibold text-[#1A1A2E] text-xs">New York 10001</div>
              </div>
            </div>

            {/* Search bar */}
            <div ref={searchRef} className="flex-1 max-w-2xl relative">
              <form onSubmit={handleSearchSubmit} className="relative">
                <div className="flex items-center bg-white border-2 border-[#E8E8E0] rounded-full overflow-hidden focus-within:border-[#E8700A] transition-colors">
                  <Search size={16} className="ml-4 text-gray-400 shrink-0" />
                  <input
                    type="text"
                    placeholder="Search products, brands, categories..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    onFocus={() => searchQuery.length > 1 && setSearchOpen(true)}
                    className="flex-1 px-3 py-2.5 text-sm bg-transparent outline-none text-[#1A1A2E] placeholder:text-gray-400 font-body"
                  />
                  <button
                    type="submit"
                    className="bg-[#E8700A] text-white px-5 py-2.5 text-sm font-semibold hover:bg-[#D0620A] transition-colors shrink-0 font-body"
                  >
                    Search
                  </button>
                </div>
              </form>

              {/* Search dropdown */}
              {searchOpen && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-xl border border-[#E8E8E0] overflow-hidden z-50">
                  {searchResults.map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.id}`}
                      onClick={() => setSearchOpen(false)}
                    >
                      <div className="flex items-center gap-3 px-4 py-3 hover:bg-[#FAFAF7] transition-colors">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-10 h-10 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-[#1A1A2E] truncate font-body">
                            {product.name}
                          </div>
                          <div className="text-xs text-gray-500 font-body">{product.brand}</div>
                        </div>
                        <div className="text-sm font-bold text-[#E8700A] font-body">
                          ${product.price.toFixed(2)}
                        </div>
                      </div>
                    </Link>
                  ))}
                  <div className="px-4 py-2 border-t border-[#E8E8E0] bg-[#FAFAF7]">
                    <button
                      onClick={handleSearchSubmit}
                      className="text-sm text-[#E8700A] font-semibold font-body hover:underline"
                    >
                      See all results for "{searchQuery}" →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Right actions */}
            <div className="flex items-center gap-1 shrink-0">
              {/* Account */}
              <button
                onClick={() => toast.info("Sign in feature coming soon!")}
                className="hidden md:flex flex-col items-start px-3 py-1.5 rounded-lg hover:bg-[#F0EDE8] transition-colors"
              >
                <span className="text-[10px] text-gray-500 font-body">Hello, Sign in</span>
                <span className="text-xs font-bold text-[#1A1A2E] font-body flex items-center gap-1">
                  Account <ChevronDown size={11} />
                </span>
              </button>

              {/* Wishlist */}
              <Link href="/wishlist">
                <button className="relative p-2.5 rounded-lg hover:bg-[#F0EDE8] transition-colors">
                  <Heart size={20} className="text-[#1A1A2E]" />
                  {wishlist.length > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#E8700A] text-white text-[9px] font-bold rounded-full flex items-center justify-center font-body">
                      {wishlist.length}
                    </span>
                  )}
                </button>
              </Link>

              {/* Cart */}
              <button
                onClick={openCart}
                className="relative flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#F0EDE8] transition-colors"
              >
                <div className="relative">
                  <ShoppingCart size={20} className="text-[#1A1A2E]" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#E8700A] text-white text-[9px] font-bold rounded-full flex items-center justify-center font-body">
                      {totalItems > 9 ? "9+" : totalItems}
                    </span>
                  )}
                </div>
                <span className="hidden md:block text-sm font-bold text-[#1A1A2E] font-body">
                  Cart
                </span>
              </button>

              {/* Mobile menu toggle */}
              <button
                className="md:hidden p-2.5 rounded-lg hover:bg-[#F0EDE8] transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Category nav bar */}
          <nav className="hidden md:flex items-center gap-0 border-t border-[#E8E8E0] py-1">
            <Link href="/products">
              <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-[#1A1A2E] rounded-md mr-2 hover:bg-[#2A2A3E] transition-colors font-body">
                <Menu size={14} />
                All Categories
              </button>
            </Link>
            {navCategories.map((cat) => (
              <Link key={cat.id} href={`/products?category=${cat.id}`}>
                <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#1A1A2E] hover:text-[#E8700A] rounded-md hover:bg-[#F5F0EB] transition-colors font-body nav-link-underline">
                  {categoryIcons[cat.id]}
                  {cat.name}
                </button>
              </Link>
            ))}
            <div className="ml-auto flex items-center gap-3 text-xs text-gray-500 font-body">
              <button onClick={() => toast.info("Today's Deals coming soon!")} className="hover:text-[#E8700A] transition-colors font-semibold">
                Today's Deals
              </button>
              <button onClick={() => toast.info("Customer Service coming soon!")} className="hover:text-[#E8700A] transition-colors">
                Customer Service
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-[#E8E8E0] px-4 py-4 space-y-3">
            <form onSubmit={handleSearchSubmit} className="flex gap-2">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="flex-1 px-3 py-2 text-sm border border-[#E8E8E0] rounded-lg outline-none focus:border-[#E8700A] font-body"
              />
              <button type="submit" className="bg-[#E8700A] text-white px-4 py-2 rounded-lg text-sm font-semibold font-body">
                Go
              </button>
            </form>
            <div className="grid grid-cols-2 gap-2">
              {navCategories.map((cat) => (
                <Link key={cat.id} href={`/products?category=${cat.id}`} onClick={() => setMobileOpen(false)}>
                  <button className="flex items-center gap-2 w-full px-3 py-2.5 text-sm font-medium text-[#1A1A2E] bg-[#FAFAF7] rounded-lg hover:bg-[#F0EDE8] transition-colors font-body">
                    {categoryIcons[cat.id]}
                    {cat.name}
                  </button>
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
