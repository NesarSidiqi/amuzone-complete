// ShopWave – ProductCard Component
// Design: Sunrise Marketplace – warm card with hover lift, quick-add, wishlist toggle

import { useState } from "react";
import { Link } from "wouter";
import { Heart, Star, ShoppingCart, Eye } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { type Product, getDiscountPercent } from "@/lib/data";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  size?: "sm" | "md" | "lg";
}

export default function ProductCard({ product, size = "md" }: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { addItem, openCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    openCart();
    toast.success(`${product.name} added to cart!`, {
      description: `$${product.price.toFixed(2)}`,
    });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    toast(wishlisted ? "Removed from wishlist" : "Added to wishlist!", {
      icon: wishlisted ? "💔" : "❤️",
    });
  };

  const discount = product.originalPrice
    ? getDiscountPercent(product.price, product.originalPrice)
    : 0;

  return (
    <Link href={`/product/${product.id}`}>
      <div className="group relative bg-white rounded-2xl overflow-hidden border border-[#E8E8E0] product-card-hover cursor-pointer">
        {/* Image container */}
        <div className={`relative overflow-hidden bg-[#F5F0EB] ${size === "lg" ? "aspect-[4/3]" : "aspect-square"}`}>
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-[#F5F0EB] to-[#EDE8E0] animate-pulse" />
          )}
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.badge === "sale" && discount > 0 && (
              <span className="badge-sale">-{discount}%</span>
            )}
            {product.badge === "new" && (
              <span className="badge-new">New</span>
            )}
            {product.badge === "bestseller" && (
              <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded font-body uppercase tracking-wide">
                Bestseller
              </span>
            )}
          </div>

          {/* Wishlist button */}
          <button
            onClick={handleWishlist}
            className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
              wishlisted
                ? "bg-red-50 text-red-500 opacity-100"
                : "bg-white/80 text-gray-400 opacity-0 group-hover:opacity-100"
            } hover:scale-110 shadow-sm`}
          >
            <Heart size={15} fill={wishlisted ? "currentColor" : "none"} />
          </button>

          {/* Quick view button */}
          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-2 group-hover:translate-y-0">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className="w-full bg-white/90 backdrop-blur-sm text-[#1A1A2E] text-xs font-semibold py-2 rounded-xl flex items-center justify-center gap-1.5 hover:bg-white transition-colors font-body shadow-sm"
            >
              <Eye size={13} />
              Quick View
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-xs text-[#E8700A] font-semibold uppercase tracking-wider mb-1 font-body">
            {product.brand}
          </p>
          <h3
            className={`font-semibold text-[#1A1A2E] line-clamp-2 leading-snug mb-2 font-body ${
              size === "sm" ? "text-sm" : "text-sm"
            }`}
          >
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={11}
                  className={
                    star <= Math.round(product.rating)
                      ? "text-amber-400 fill-amber-400"
                      : "text-gray-200 fill-gray-200"
                  }
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 font-body">
              {product.rating} ({product.reviewCount.toLocaleString()})
            </span>
          </div>

          {/* Price & CTA */}
          <div className="flex items-center justify-between gap-2">
            <div>
              <span className="text-lg font-bold text-[#1A1A2E] font-body">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-gray-400 line-through ml-1.5 font-body">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <button
              onClick={handleAddToCart}
              className="flex items-center gap-1.5 bg-[#1A1A2E] hover:bg-[#E8700A] text-white text-xs font-semibold px-3 py-2 rounded-xl transition-colors duration-200 font-body shrink-0"
            >
              <ShoppingCart size={13} />
              Add
            </button>
          </div>

          {/* Stock warning */}
          {product.stockCount <= 10 && (
            <p className="text-xs text-red-500 mt-1.5 font-body">
              Only {product.stockCount} left in stock!
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
