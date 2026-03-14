// ShopWave – Cart Drawer Component
// Slides in from the right with cart items, totals, and checkout CTA

import { X, ShoppingCart, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Link } from "wouter";
import { toast } from "sonner";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalItems, totalPrice } = useCart();

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8E8E0]">
          <div className="flex items-center gap-2">
            <ShoppingCart size={20} className="text-[#E8700A]" />
            <h2 className="text-lg font-bold text-[#1A1A2E] font-display">
              Your Cart
            </h2>
            {totalItems > 0 && (
              <span className="bg-[#E8700A] text-white text-xs font-bold px-2 py-0.5 rounded-full font-body">
                {totalItems}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="p-2 rounded-lg hover:bg-[#F0EDE8] transition-colors"
          >
            <X size={20} className="text-[#1A1A2E]" />
          </button>
        </div>

        {/* Cart items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <div className="w-20 h-20 bg-[#F5F0EB] rounded-full flex items-center justify-center">
                <ShoppingCart size={32} className="text-[#E8700A] opacity-60" />
              </div>
              <div>
                <p className="text-lg font-semibold text-[#1A1A2E] font-display">
                  Your cart is empty
                </p>
                <p className="text-sm text-gray-500 mt-1 font-body">
                  Add items to get started
                </p>
              </div>
              <button
                onClick={closeCart}
                className="btn-primary-pill mt-2"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-3 bg-[#FAFAF7] rounded-xl"
                >
                  <Link href={`/product/${item.product.id}`} onClick={closeCart}>
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-lg shrink-0 hover:opacity-90 transition-opacity"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link href={`/product/${item.product.id}`} onClick={closeCart}>
                      <p className="text-sm font-semibold text-[#1A1A2E] line-clamp-2 hover:text-[#E8700A] transition-colors font-body">
                        {item.product.name}
                      </p>
                    </Link>
                    <p className="text-xs text-gray-500 mt-0.5 font-body">{item.product.brand}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-7 h-7 rounded-full border border-[#E8E8E0] flex items-center justify-center hover:border-[#E8700A] hover:text-[#E8700A] transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-sm font-bold text-[#1A1A2E] w-6 text-center font-body">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-full border border-[#E8E8E0] flex items-center justify-center hover:border-[#E8700A] hover:text-[#E8700A] transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[#E8700A] font-body">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-[#E8E8E0] px-6 py-4 space-y-3">
            <div className="flex items-center justify-between text-sm font-body">
              <span className="text-gray-500">Subtotal ({totalItems} items)</span>
              <span className="font-bold text-[#1A1A2E]">${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-sm font-body">
              <span className="text-gray-500">Shipping</span>
              <span className="text-green-600 font-semibold">
                {totalPrice >= 50 ? "FREE" : `$${(9.99).toFixed(2)}`}
              </span>
            </div>
            {totalPrice < 50 && (
              <p className="text-xs text-gray-500 font-body">
                Add ${(50 - totalPrice).toFixed(2)} more for free shipping
              </p>
            )}
            <div className="h-px bg-[#E8E8E0]" />
            <div className="flex items-center justify-between font-body">
              <span className="font-bold text-[#1A1A2E]">Total</span>
              <span className="text-xl font-bold text-[#1A1A2E]">
                ${(totalPrice + (totalPrice >= 50 ? 0 : 9.99)).toFixed(2)}
              </span>
            </div>
            <button
              onClick={() => {
                closeCart();
                toast.success("Checkout feature coming soon!");
              }}
              className="w-full btn-primary-pill flex items-center justify-center gap-2 py-3 text-base"
            >
              Proceed to Checkout
              <ArrowRight size={18} />
            </button>
            <button
              onClick={closeCart}
              className="w-full text-sm text-gray-500 hover:text-[#1A1A2E] transition-colors font-body py-1"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
