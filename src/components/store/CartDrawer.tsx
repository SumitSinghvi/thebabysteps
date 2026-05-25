'use client';

import { X, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';
import { useStorefrontStore } from '@/store/useStorefrontStore';

export default function CartDrawer() {
  const { isCartOpen, setCartOpen, cart, updateQuantity, removeFromCart, clearCart } = useStorefrontStore();

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={() => setCartOpen(false)}
      />

      <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
        {/* Panel */}
        <div className="w-screen max-w-md transform bg-white shadow-2xl transition-all duration-300 flex flex-col h-full border-l border-slate-100">
          {/* Header */}
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-rose-500" />
              Your Shopping Cart
            </h2>
            <button
              onClick={() => setCartOpen(false)}
              className="rounded-full p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-3">
                <ShoppingBag className="h-16 w-16 stroke-1 text-slate-300" />
                <p className="text-sm font-medium">Your cart is empty</p>
                <button
                  onClick={() => setCartOpen(false)}
                  className="text-xs font-semibold text-rose-500 hover:text-rose-600 underline"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-3 border border-slate-100 rounded-xl hover:shadow-sm transition-shadow bg-white"
                >
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="h-16 w-16 object-cover rounded-lg bg-slate-50"
                    />
                  ) : (
                    <div className="h-16 w-16 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 font-bold text-xs">
                      Baby
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-slate-800 truncate">{item.name}</h3>
                    <p className="text-xs text-rose-500 font-bold mt-0.5">₹{item.price.toFixed(2)}</p>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 rounded-md bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="text-xs font-bold text-slate-700 w-5 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 rounded-md bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-1.5 text-slate-300 hover:text-rose-500 rounded-lg hover:bg-rose-50 transition-colors self-start"
                    aria-label="Delete item"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="border-t border-slate-100 p-6 bg-slate-50 space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-sm text-slate-500">
                  <span>Subtotal</span>
                  <span>₹{totalAmount.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-base font-bold text-slate-800 pt-1.5 border-t border-slate-200">
                  <span>Total</span>
                  <span>₹{totalAmount.toFixed(2)}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={clearCart}
                  className="py-2.5 px-4 rounded-xl border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-100 transition-colors"
                >
                  Clear Cart
                </button>
                <button className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-rose-500 to-indigo-600 text-white font-semibold text-sm hover:from-rose-600 hover:to-indigo-700 shadow-md shadow-rose-100 hover:shadow-lg transition-all duration-300">
                  Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
