import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Menu, Search, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { totalItems, setIsCartOpen } = useCart();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-[60px] py-[40px] flex justify-between items-baseline bg-editorial-bg text-editorial-text">
      <Link to="/" className="logo text-[24px] font-serif font-bold tracking-[4px] uppercase text-editorial-accent">
        Tre Việt.
      </Link>

      <div className="hidden md:flex gap-[30px] items-center">
        <Link to="/collections" className="nav-link">Bộ Sưu Tập</Link>
        <a href="/#about" className="nav-link">Về Chúng Tôi</a>
        <a href="/#process" className="nav-link">Quy Trình</a>
        <a href="/#contact" className="px-4 py-1.5 border border-editorial-text rounded-[4px] text-[12px] uppercase tracking-[2px] font-semibold hover:bg-editorial-text hover:text-editorial-bg transition-all">
          Liên Hệ
        </a>
        
        <div className="flex items-center gap-6 ml-10">
          <button className="hover:opacity-70 transition-opacity">
            <Search size={20} strokeWidth={1.5} />
          </button>
          <button 
            onClick={() => setIsCartOpen(true)}
            className="hover:opacity-70 transition-opacity relative"
          >
            <ShoppingBag size={20} strokeWidth={1.5} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-editorial-accent text-white text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      <button className="md:hidden hover:opacity-70 transition-opacity">
        <Menu size={24} />
      </button>
    </nav>
  );
}
