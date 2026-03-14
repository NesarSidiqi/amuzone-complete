// ShopWave – Product Detail Page
// Design: Sunrise Marketplace – editorial layout, image gallery, reviews, related products

import { useState } from "react";
import { useParams, Link } from "wouter";
import {
  Heart,
  ShoppingCart,
  Star,
  Truck,
  Shield,
  RotateCcw,
  Check,
  ChevronRight,
  Minus,
  Plus,
  Share2,
  Package,
} from "lucide-react";
import { getProductById, getRelatedProducts, reviews, getDiscountPercent } from "@/lib/data";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import ProductCard from "@/components/ProductCard";
import StarRating from "@/components/StarRating";
import { toast } from "sonner";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || "");
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "reviews" | "shipping">("description");
  const { addItem, openCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FAFAF7] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#1A1A2E] font-display mb-3">Product Not Found</h2>
          <p className="text-gray-500 font-body mb-6">The product you're looking for doesn't exist.</p>
          <Link href="/products">
            <button className="btn-primary-pill">Browse Products</button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = getRelatedProducts(product);
  const productReviews = reviews.filter((r) => r.productId === product.id);
  const wishlisted = isWishlisted(product.id);
  const discount = product.originalPrice
    ? getDiscountPercent(product.price, product.originalPrice)
    : 0;

  const handleAddToCart = () => {
    addItem(product, quantity);
    openCart();
    toast.success(`${product.name} added to cart!`);
  };

  const handleBuyNow = () => {
    addItem(product, quantity);
    toast.success("Checkout feature coming soon!");
  };

  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#E8E8E0]">
        <div className="container py-3">
          <div className="flex items-center gap-1.5 text-xs text-gray-500 font-body flex-wrap">
            <Link href="/">
              <span className="hover:text-[#E8700A] transition-colors cursor-pointer">Home</span>
            </Link>
            <ChevronRight size={12} />
            <Link href="/products">
              <span className="hover:text-[#E8700A] transition-colors cursor-pointer">Products</span>
            </Link>
            <ChevronRight size={12} />
            <Link href={`/products?category=${product.category}`}>
              <span className="hover:text-[#E8700A] transition-colors cursor-pointer capitalize">
                {product.category}
              </span>
            </Link>
            <ChevronRight size={12} />
            <span className="text-[#1A1A2E] font-medium truncate max-w-[200px]">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container py-8">
        {/* Main product section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative bg-white rounded-3xl overflow-hidden border border-[#E8E8E0] aspect-square">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.badge === "sale" && discount > 0 && (
                <div className="absolute top-4 left-4">
                  <span className="badge-sale text-sm px-3 py-1">-{discount}%</span>
                </div>
              )}
              {product.badge === "new" && (
                <div className="absolute top-4 left-4">
                  <span className="badge-new text-sm px-3 py-1">New</span>
                </div>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === i
                        ? "border-[#E8700A] shadow-md"
                        : "border-[#E8E8E0] hover:border-[#E8700A]/50"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-5">
            {/* Brand & title */}
            <div>
              <p className="text-sm font-bold text-[#E8700A] uppercase tracking-wider font-body mb-1">
                {product.brand}
              </p>
              <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A2E] font-display leading-tight">
                {product.name}
              </h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <StarRating rating={product.rating} reviewCount={product.reviewCount} />
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-[#1A1A2E] font-body">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-gray-400 line-through font-body">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                  <span className="badge-sale">Save {discount}%</span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 font-body leading-relaxed text-sm">
              {product.description}
            </p>

            {/* Features */}
            <div className="bg-[#F5F0EB] rounded-2xl p-4">
              <h3 className="text-sm font-bold text-[#1A1A2E] mb-3 font-display">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700 font-body">
                    <Check size={14} className="text-[#E8700A] mt-0.5 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Stock status */}
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  product.inStock ? "bg-green-500" : "bg-red-500"
                }`}
              />
              <span
                className={`text-sm font-semibold font-body ${
                  product.inStock ? "text-green-600" : "text-red-500"
                }`}
              >
                {product.inStock
                  ? product.stockCount <= 10
                    ? `Only ${product.stockCount} left in stock!`
                    : "In Stock"
                  : "Out of Stock"}
              </span>
            </div>

            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-4">
              <div className="flex items-center border-2 border-[#E8E8E0] rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-3 hover:bg-[#F5F0EB] transition-colors"
                >
                  <Minus size={16} className="text-[#1A1A2E]" />
                </button>
                <span className="px-4 py-3 text-base font-bold text-[#1A1A2E] font-body min-w-[48px] text-center border-x-2 border-[#E8E8E0]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-3 hover:bg-[#F5F0EB] transition-colors"
                >
                  <Plus size={16} className="text-[#1A1A2E]" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 flex items-center justify-center gap-2 bg-[#E8700A] hover:bg-[#D0620A] disabled:opacity-50 text-white font-bold py-3.5 rounded-xl transition-colors font-body"
              >
                <ShoppingCart size={18} />
                Add to Cart
              </button>

              <button
                onClick={() => {
                  toggleWishlist(product.id);
                  toast(wishlisted ? "Removed from wishlist" : "Added to wishlist!", {
                    icon: wishlisted ? "💔" : "❤️",
                  });
                }}
                className={`p-3.5 rounded-xl border-2 transition-all ${
                  wishlisted
                    ? "border-red-400 bg-red-50 text-red-500"
                    : "border-[#E8E8E0] hover:border-red-300 text-gray-400 hover:text-red-400"
                }`}
              >
                <Heart size={18} fill={wishlisted ? "currentColor" : "none"} />
              </button>
            </div>

            {/* Buy Now */}
            <button
              onClick={handleBuyNow}
              disabled={!product.inStock}
              className="w-full flex items-center justify-center gap-2 bg-[#1A1A2E] hover:bg-[#2A2A3E] disabled:opacity-50 text-white font-bold py-3.5 rounded-xl transition-colors font-body"
            >
              Buy Now
            </button>

            {/* Trust signals */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {[
                { icon: Truck, text: "Free Shipping", sub: "Over $50" },
                { icon: RotateCcw, text: "30-Day Returns", sub: "Easy returns" },
                { icon: Shield, text: "Secure Payment", sub: "Protected" },
              ].map(({ icon: Icon, text, sub }) => (
                <div key={text} className="flex flex-col items-center text-center p-3 bg-[#F5F0EB] rounded-xl">
                  <Icon size={18} className="text-[#E8700A] mb-1" />
                  <span className="text-xs font-bold text-[#1A1A2E] font-body">{text}</span>
                  <span className="text-[10px] text-gray-500 font-body">{sub}</span>
                </div>
              ))}
            </div>

            {/* Share */}
            <button
              onClick={() => toast.info("Share feature coming soon!")}
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#E8700A] transition-colors font-body"
            >
              <Share2 size={14} />
              Share this product
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-3xl border border-[#E8E8E0] overflow-hidden mb-12">
          <div className="flex border-b border-[#E8E8E0]">
            {(["description", "reviews", "shipping"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 text-sm font-semibold font-body capitalize transition-colors ${
                  activeTab === tab
                    ? "text-[#E8700A] border-b-2 border-[#E8700A] bg-[#FFF8F3]"
                    : "text-gray-500 hover:text-[#1A1A2E]"
                }`}
              >
                {tab === "reviews" ? `Reviews (${productReviews.length || product.reviewCount})` : tab}
              </button>
            ))}
          </div>

          <div className="p-6 md:p-8">
            {activeTab === "description" && (
              <div className="space-y-4">
                <p className="text-gray-700 font-body leading-relaxed">{product.description}</p>
                <h3 className="font-bold text-[#1A1A2E] font-display">Product Features</h3>
                <ul className="space-y-2">
                  {product.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700 font-body">
                      <Check size={14} className="text-[#E8700A] mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2 mt-4">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-[#F5F0EB] text-[#8B5E3C] text-xs font-medium px-3 py-1 rounded-full font-body"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-6">
                {/* Rating summary */}
                <div className="flex items-center gap-6 p-5 bg-[#F5F0EB] rounded-2xl">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-[#1A1A2E] font-display">
                      {product.rating}
                    </div>
                    <StarRating rating={product.rating} showCount={false} size={16} />
                    <p className="text-xs text-gray-500 mt-1 font-body">
                      {product.reviewCount.toLocaleString()} reviews
                    </p>
                  </div>
                  <div className="flex-1 space-y-1.5">
                    {[5, 4, 3, 2, 1].map((stars) => {
                      const pct = stars === 5 ? 68 : stars === 4 ? 22 : stars === 3 ? 7 : stars === 2 ? 2 : 1;
                      return (
                        <div key={stars} className="flex items-center gap-2">
                          <span className="text-xs text-gray-500 font-body w-4">{stars}</span>
                          <Star size={10} className="text-amber-400 fill-amber-400" />
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-amber-400 rounded-full"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-500 font-body w-8">{pct}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Review list */}
                {productReviews.length > 0 ? (
                  productReviews.map((review) => (
                    <div key={review.id} className="border-b border-[#E8E8E0] pb-6">
                      <div className="flex items-start gap-3">
                        <img
                          src={review.avatar}
                          alt={review.author}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-bold text-[#1A1A2E] font-body">
                              {review.author}
                            </span>
                            {review.verified && (
                              <span className="flex items-center gap-1 text-[10px] text-green-600 font-body">
                                <Check size={10} />
                                Verified Purchase
                              </span>
                            )}
                          </div>
                          <StarRating rating={review.rating} showCount={false} size={12} />
                          <h4 className="text-sm font-bold text-[#1A1A2E] mt-2 mb-1 font-body">
                            {review.title}
                          </h4>
                          <p className="text-sm text-gray-600 font-body leading-relaxed">
                            {review.body}
                          </p>
                          <p className="text-xs text-gray-400 mt-2 font-body">{review.date}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Package size={32} className="text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 font-body">No reviews yet. Be the first to review!</p>
                    <button
                      onClick={() => toast.info("Review feature coming soon!")}
                      className="btn-primary-pill mt-4 text-sm"
                    >
                      Write a Review
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === "shipping" && (
              <div className="space-y-4">
                {[
                  { icon: Truck, title: "Standard Shipping", desc: "Free on orders over $50. Delivery in 5–7 business days." },
                  { icon: Package, title: "Express Shipping", desc: "$9.99 flat rate. Delivery in 2–3 business days." },
                  { icon: RotateCcw, title: "Returns & Exchanges", desc: "Free returns within 30 days of purchase. Items must be in original condition." },
                  { icon: Shield, title: "Purchase Protection", desc: "All orders are covered by ShopWave's buyer protection guarantee." },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex items-start gap-4 p-4 bg-[#F5F0EB] rounded-xl">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shrink-0">
                      <Icon size={18} className="text-[#E8700A]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#1A1A2E] font-body">{title}</h4>
                      <p className="text-sm text-gray-600 font-body mt-0.5">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-[#1A1A2E] font-display mb-6">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
