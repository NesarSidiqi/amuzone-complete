// ShopWave – Products Listing Page
// Design: Sunrise Marketplace – sidebar filters, product grid, sort controls

import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import { SlidersHorizontal, Grid3X3, List, X, ChevronDown, ChevronUp, Search } from "lucide-react";
import { products, categories } from "@/lib/data";
import ProductCard from "@/components/ProductCard";

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "reviews", label: "Most Reviewed" },
  { value: "newest", label: "Newest" },
];

const priceRanges = [
  { label: "Under $25", min: 0, max: 25 },
  { label: "$25 – $50", min: 25, max: 50 },
  { label: "$50 – $100", min: 50, max: 100 },
  { label: "$100 – $200", min: 100, max: 200 },
  { label: "Over $200", min: 200, max: Infinity },
];

export default function Products() {
  const [location] = useLocation();
  const params = new URLSearchParams(location.includes("?") ? location.split("?")[1] : "");
  const initialCategory = params.get("category") || "";
  const initialSearch = params.get("search") || "";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedBadge, setSelectedBadge] = useState<string>("");
  const [selectedPriceRange, setSelectedPriceRange] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [expandedFilters, setExpandedFilters] = useState({
    categories: true,
    price: true,
    badge: true,
  });

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.includes(q))
      );
    }

    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (selectedBadge) {
      result = result.filter((p) => p.badge === selectedBadge);
    }

    if (selectedPriceRange !== null) {
      const range = priceRanges[selectedPriceRange];
      result = result.filter((p) => p.price >= range.min && p.price <= range.max);
    }

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "reviews":
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case "newest":
        result.sort((a, b) => (b.badge === "new" ? 1 : 0) - (a.badge === "new" ? 1 : 0));
        break;
      default:
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return result;
  }, [selectedCategory, selectedBadge, selectedPriceRange, sortBy, searchQuery]);

  const clearFilters = () => {
    setSelectedCategory("");
    setSelectedBadge("");
    setSelectedPriceRange(null);
    setSearchQuery("");
    setSortBy("featured");
  };

  const hasActiveFilters =
    selectedCategory || selectedBadge || selectedPriceRange !== null || searchQuery;

  const toggleFilter = (key: keyof typeof expandedFilters) => {
    setExpandedFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const currentCategoryName = selectedCategory
    ? categories.find((c) => c.id === selectedCategory)?.name
    : null;

  const FilterSidebar = () => (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 text-sm border border-[#E8E8E0] rounded-xl outline-none focus:border-[#E8700A] transition-colors font-body bg-white"
          />
        </div>
      </div>

      {/* Categories */}
      <div>
        <button
          onClick={() => toggleFilter("categories")}
          className="flex items-center justify-between w-full mb-3"
        >
          <h3 className="text-sm font-bold text-[#1A1A2E] font-display">Categories</h3>
          {expandedFilters.categories ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
        {expandedFilters.categories && (
          <div className="space-y-1">
            <button
              onClick={() => setSelectedCategory("")}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-body transition-colors ${
                !selectedCategory
                  ? "bg-[#E8700A] text-white font-semibold"
                  : "text-gray-600 hover:bg-[#F5F0EB]"
              }`}
            >
              All Categories
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-body transition-colors flex items-center justify-between ${
                  selectedCategory === cat.id
                    ? "bg-[#E8700A] text-white font-semibold"
                    : "text-gray-600 hover:bg-[#F5F0EB]"
                }`}
              >
                <span>{cat.name}</span>
                <span className="text-xs opacity-70">{cat.productCount}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <hr className="border-[#E8E8E0]" />

      {/* Price Range */}
      <div>
        <button
          onClick={() => toggleFilter("price")}
          className="flex items-center justify-between w-full mb-3"
        >
          <h3 className="text-sm font-bold text-[#1A1A2E] font-display">Price Range</h3>
          {expandedFilters.price ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
        {expandedFilters.price && (
          <div className="space-y-1">
            {priceRanges.map((range, i) => (
              <button
                key={i}
                onClick={() => setSelectedPriceRange(selectedPriceRange === i ? null : i)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-body transition-colors ${
                  selectedPriceRange === i
                    ? "bg-[#E8700A] text-white font-semibold"
                    : "text-gray-600 hover:bg-[#F5F0EB]"
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <hr className="border-[#E8E8E0]" />

      {/* Badge / Type */}
      <div>
        <button
          onClick={() => toggleFilter("badge")}
          className="flex items-center justify-between w-full mb-3"
        >
          <h3 className="text-sm font-bold text-[#1A1A2E] font-display">Product Type</h3>
          {expandedFilters.badge ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
        {expandedFilters.badge && (
          <div className="space-y-1">
            {[
              { value: "", label: "All Products" },
              { value: "sale", label: "On Sale" },
              { value: "new", label: "New Arrivals" },
              { value: "bestseller", label: "Bestsellers" },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSelectedBadge(opt.value)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-body transition-colors ${
                  selectedBadge === opt.value
                    ? "bg-[#E8700A] text-white font-semibold"
                    : "text-gray-600 hover:bg-[#F5F0EB]"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Clear filters */}
      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="w-full flex items-center justify-center gap-2 py-2.5 border-2 border-[#E8700A] text-[#E8700A] rounded-xl text-sm font-semibold font-body hover:bg-[#E8700A] hover:text-white transition-colors"
        >
          <X size={14} />
          Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      {/* Page header */}
      <div className="bg-white border-b border-[#E8E8E0]">
        <div className="container py-6">
          <div className="flex items-center gap-2 text-xs text-gray-500 font-body mb-2">
            <a href="/" className="hover:text-[#E8700A] transition-colors">Home</a>
            <span>/</span>
            <span className="text-[#1A1A2E] font-semibold">
              {currentCategoryName || "All Products"}
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A2E] font-display">
            {searchQuery
              ? `Search results for "${searchQuery}"`
              : currentCategoryName
              ? currentCategoryName
              : "All Products"}
          </h1>
          <p className="text-sm text-gray-500 mt-1 font-body">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""} found
          </p>
        </div>
      </div>

      <div className="container py-8">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-60 shrink-0">
            <div className="bg-white rounded-2xl border border-[#E8E8E0] p-5 sticky top-24">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold text-[#1A1A2E] font-display">Filters</h2>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-xs text-[#E8700A] font-semibold font-body hover:underline"
                  >
                    Clear all
                  </button>
                )}
              </div>
              <FilterSidebar />
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between gap-4 mb-6 bg-white rounded-2xl border border-[#E8E8E0] px-4 py-3">
              <div className="flex items-center gap-3">
                {/* Mobile filter toggle */}
                <button
                  onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                  className="lg:hidden flex items-center gap-2 text-sm font-semibold text-[#1A1A2E] font-body"
                >
                  <SlidersHorizontal size={16} />
                  Filters
                </button>

                <span className="hidden sm:block text-sm text-gray-500 font-body">
                  {filteredProducts.length} results
                </span>
              </div>

              <div className="flex items-center gap-3">
                {/* Sort */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 font-body hidden sm:block">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="text-sm border border-[#E8E8E0] rounded-lg px-3 py-1.5 outline-none focus:border-[#E8700A] font-body bg-white text-[#1A1A2E] cursor-pointer"
                  >
                    {sortOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* View mode */}
                <div className="flex items-center gap-1 bg-[#F5F0EB] rounded-lg p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-1.5 rounded-md transition-colors ${
                      viewMode === "grid" ? "bg-white shadow-sm text-[#E8700A]" : "text-gray-400"
                    }`}
                  >
                    <Grid3X3 size={15} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-1.5 rounded-md transition-colors ${
                      viewMode === "list" ? "bg-white shadow-sm text-[#E8700A]" : "text-gray-400"
                    }`}
                  >
                    <List size={15} />
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile filters */}
            {mobileFiltersOpen && (
              <div className="lg:hidden bg-white rounded-2xl border border-[#E8E8E0] p-5 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold text-[#1A1A2E] font-display">Filters</h2>
                  <button onClick={() => setMobileFiltersOpen(false)}>
                    <X size={18} className="text-gray-400" />
                  </button>
                </div>
                <FilterSidebar />
              </div>
            )}

            {/* Active filter chips */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 mb-5">
                {selectedCategory && (
                  <span className="flex items-center gap-1.5 bg-[#E8700A]/10 text-[#E8700A] text-xs font-semibold px-3 py-1.5 rounded-full font-body">
                    {categories.find((c) => c.id === selectedCategory)?.name}
                    <button onClick={() => setSelectedCategory("")}>
                      <X size={12} />
                    </button>
                  </span>
                )}
                {selectedBadge && (
                  <span className="flex items-center gap-1.5 bg-[#E8700A]/10 text-[#E8700A] text-xs font-semibold px-3 py-1.5 rounded-full font-body">
                    {selectedBadge}
                    <button onClick={() => setSelectedBadge("")}>
                      <X size={12} />
                    </button>
                  </span>
                )}
                {selectedPriceRange !== null && (
                  <span className="flex items-center gap-1.5 bg-[#E8700A]/10 text-[#E8700A] text-xs font-semibold px-3 py-1.5 rounded-full font-body">
                    {priceRanges[selectedPriceRange].label}
                    <button onClick={() => setSelectedPriceRange(null)}>
                      <X size={12} />
                    </button>
                  </span>
                )}
                {searchQuery && (
                  <span className="flex items-center gap-1.5 bg-[#E8700A]/10 text-[#E8700A] text-xs font-semibold px-3 py-1.5 rounded-full font-body">
                    "{searchQuery}"
                    <button onClick={() => setSearchQuery("")}>
                      <X size={12} />
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* Products grid */}
            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-20 h-20 bg-[#F5F0EB] rounded-full flex items-center justify-center mb-4">
                  <Search size={32} className="text-[#E8700A] opacity-60" />
                </div>
                <h3 className="text-xl font-bold text-[#1A1A2E] font-display mb-2">
                  No products found
                </h3>
                <p className="text-gray-500 font-body mb-6">
                  Try adjusting your filters or search terms
                </p>
                <button
                  onClick={clearFilters}
                  className="btn-primary-pill"
                >
                  Clear Filters
                </button>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-2xl border border-[#E8E8E0] p-4 flex gap-5 hover:shadow-md transition-shadow"
                  >
                    <a href={`/product/${product.id}`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-32 h-32 object-cover rounded-xl shrink-0"
                      />
                    </a>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-[#E8700A] font-semibold uppercase tracking-wider font-body">
                        {product.brand}
                      </p>
                      <a href={`/product/${product.id}`}>
                        <h3 className="text-base font-semibold text-[#1A1A2E] mt-1 hover:text-[#E8700A] transition-colors font-body">
                          {product.name}
                        </h3>
                      </a>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2 font-body">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <div>
                          <span className="text-xl font-bold text-[#1A1A2E] font-body">
                            ${product.price.toFixed(2)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-400 line-through ml-2 font-body">
                              ${product.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                        <a href={`/product/${product.id}`}>
                          <button className="btn-primary-pill text-sm px-5 py-2">
                            View Product
                          </button>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
