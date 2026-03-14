// ShopWave – Wishlist Page

import { Link } from "wouter";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import { products } from "@/lib/data";
import { toast } from "sonner";

export default function Wishlist() {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addItem, openCart } = useCart();
  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      <div className="bg-white border-b border-[#E8E8E0]">
        <div className="container py-6">
          <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A2E] font-display flex items-center gap-3">
            <Heart size={28} className="text-[#E8700A]" />
            My Wishlist
            {wishlist.length > 0 && (
              <span className="text-lg font-normal text-gray-500 font-body">
                ({wishlist.length} items)
              </span>
            )}
          </h1>
        </div>
      </div>

      <div className="container py-8">
        {wishlistProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 bg-[#F5F0EB] rounded-full flex items-center justify-center mb-5">
              <Heart size={40} className="text-[#E8700A] opacity-50" />
            </div>
            <h2 className="text-2xl font-bold text-[#1A1A2E] font-display mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-gray-500 font-body mb-8">
              Save items you love to your wishlist and shop them later.
            </p>
            <Link href="/products">
              <button className="btn-primary-pill px-8 py-3 text-base">
                Start Shopping
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {wishlistProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-[#E8E8E0] overflow-hidden product-card-hover group"
              >
                <Link href={`/product/${product.id}`}>
                  <div className="relative aspect-square overflow-hidden bg-[#F5F0EB]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </Link>
                <div className="p-4">
                  <p className="text-xs text-[#E8700A] font-semibold uppercase tracking-wider font-body mb-1">
                    {product.brand}
                  </p>
                  <Link href={`/product/${product.id}`}>
                    <h3 className="text-sm font-semibold text-[#1A1A2E] line-clamp-2 hover:text-[#E8700A] transition-colors font-body mb-3">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-[#1A1A2E] font-body">
                      ${product.price.toFixed(2)}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          addItem(product);
                          openCart();
                          toast.success(`${product.name} added to cart!`);
                        }}
                        className="p-2 bg-[#1A1A2E] hover:bg-[#E8700A] text-white rounded-lg transition-colors"
                      >
                        <ShoppingCart size={15} />
                      </button>
                      <button
                        onClick={() => {
                          toggleWishlist(product.id);
                          toast("Removed from wishlist", { icon: "💔" });
                        }}
                        className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
