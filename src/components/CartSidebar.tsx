import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Plus, Minus, ShoppingBag, ArrowRight, Trash2, AlertTriangle } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function CartSidebar() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const handleClearCart = () => {
    clearCart();
    setShowConfirmClear(false);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setIsCartOpen(false);
              setShowConfirmClear(false);
            }}
            className="fixed inset-0 bg-black/40 z-[100] backdrop-blur-[2px]"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-[450px] bg-editorial-bg z-[101] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="px-8 py-10 flex justify-between items-center border-b border-editorial-line/10 relative">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} strokeWidth={1.5} />
                <h2 className="text-xl font-serif">Giỏ Hàng</h2>
              </div>
              
              <div className="flex items-center gap-4">
                {cart.length > 0 && !showConfirmClear && (
                  <button 
                    onClick={() => setShowConfirmClear(true)}
                    className="flex items-center gap-2 text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100 hover:text-editorial-accent transition-all group"
                  >
                    <Trash2 size={14} className="group-hover:scale-110 transition-transform" />
                    <span>Xóa tất cả</span>
                  </button>
                )}
                <button 
                  onClick={() => {
                    setIsCartOpen(false);
                    setShowConfirmClear(false);
                  }}
                  className="w-10 h-10 border border-editorial-line/10 flex items-center justify-center hover:bg-editorial-text hover:text-editorial-bg transition-all"
                >
                  <X size={20} strokeWidth={1.5} />
                </button>
              </div>

              {/* Confirmation Overlay in Header area to be less intrusive but clear */}
              <AnimatePresence>
                {showConfirmClear && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute inset-0 bg-[#fdfdfd] z-20 flex items-center justify-between px-8"
                  >
                    <div className="flex items-center gap-3">
                      <AlertTriangle size={18} className="text-editorial-accent" />
                      <p className="text-xs font-medium uppercase tracking-wider">Xóa toàn bộ giỏ hàng?</p>
                    </div>
                    <div className="flex gap-4">
                      <button 
                        onClick={() => setShowConfirmClear(false)}
                        className="text-[10px] uppercase tracking-widest font-bold opacity-40 hover:opacity-100"
                      >
                        Hủy
                      </button>
                      <button 
                        onClick={handleClearCart}
                        className="text-[10px] uppercase tracking-widest font-bold text-editorial-accent hover:underline"
                      >
                        Xác nhận xóa
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-8 py-6 space-y-8 scrollbar-hide">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                  <ShoppingBag size={48} strokeWidth={0.5} className="mb-6" />
                  <p className="font-serif italic">Giỏ hàng của bạn đang trống.</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-6 group">
                    <div className="w-24 aspect-[3/4] bg-editorial-muted/10 overflow-hidden shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover grayscale brightness-95 group-hover:grayscale-0 transition-all duration-700" 
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-serif text-lg leading-tight">{item.name}</h3>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100 hover:text-editorial-accent transition-all"
                          >
                            Xóa
                          </button>
                        </div>
                        <p className="text-[10px] uppercase tracking-[2px] opacity-40 mb-4">{item.category}</p>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center border border-editorial-line/10 rounded-[2px]">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-editorial-line/5 transition-all"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-8 text-center text-xs font-medium">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-editorial-line/5 transition-all"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <span className="text-sm font-light">{item.price}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-8 border-t border-editorial-line/10 bg-editorial-bg">
                <div className="flex justify-between items-end mb-8">
                  <span className="text-[10px] uppercase tracking-[4px] opacity-40">Tổng cộng</span>
                  <span className="text-2xl font-serif">{formatPrice(totalPrice)}</span>
                </div>
                <button className="w-full py-5 bg-editorial-text text-white text-[12px] uppercase tracking-[4px] font-bold hover:bg-editorial-accent transition-all duration-500 flex items-center justify-center gap-4 group">
                  Thanh Toán <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                </button>
                <button 
                   onClick={() => setIsCartOpen(false)}
                   className="w-full py-4 text-[10px] uppercase tracking-[2px] opacity-40 hover:opacity-100 transition-all text-center mt-4"
                >
                  Tiếp tục mua sắm
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

