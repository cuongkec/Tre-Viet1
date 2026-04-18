import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, ShoppingBag, Plus, Minus, 
  ChevronRight, Award, ShieldCheck, Truck 
} from "lucide-react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { initialProducts } from "../constants";

interface Product {
  id: string;
  name: string;
  price: string;
  priceNum: number;
  image: string;
  category: string;
  material: string;
  description?: string;
}

export default function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;
      setLoading(true);
      try {
        const docRef = doc(db, "products", productId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() } as Product);
        } else {
          // Fallback to initialProducts if not in Firestore
          const fallbackProduct = initialProducts.find(p => p.id === productId);
          if (fallbackProduct) {
            setProduct(fallbackProduct as Product);
          } else {
            console.error("Product not found in Firestore or fallback");
          }
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    window.scrollTo(0, 0);
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      const safeQty = isNaN(quantity) || quantity < 1 ? 1 : quantity;
      for (let i = 0; i < safeQty; i++) {
        addToCart(product);
      }
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-editorial-bg">
        <motion.div 
          animate={{ opacity: [0.4, 1, 0.4] }} 
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="font-serif italic text-xl"
        >
          Đang tải tuyệt tác...
        </motion.div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-editorial-bg px-8 text-center">
        <h1 className="text-4xl font-serif mb-6">Sản phẩm không tồn tại</h1>
        <button 
          onClick={() => navigate("/collections")}
          className="flex items-center gap-2 text-editorial-accent uppercase tracking-widest text-xs font-bold hover:underline"
        >
          <ArrowLeft size={16} /> Quay lại bộ sưu tập
        </button>
      </div>
    );
  }

  return (
    <div className="bg-editorial-bg min-h-screen">
      <Navbar />
      
      <main className="pt-40 pb-32 px-[60px] max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-4 text-[10px] uppercase tracking-[2px] opacity-40 mb-16">
          <button onClick={() => navigate("/")} className="hover:opacity-100 transition-opacity">Trang chủ</button>
          <ChevronRight size={10} />
          <button onClick={() => navigate("/collections")} className="hover:opacity-100 transition-opacity">Bộ sưu tập</button>
          <ChevronRight size={10} />
          <span className="opacity-100 font-bold text-editorial-text">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Image Gallery */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="aspect-[4/5] overflow-hidden bg-editorial-muted/10 relative group">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover grayscale-[20%] brightness-95 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2s] ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-6 left-6">
                <span className="bg-editorial-text text-white px-4 py-2 text-[10px] uppercase tracking-[2px] font-bold">
                  {product.material === "Handcrafted" ? "Thủ Công" : product.material === "Natural" ? "Tự Nhiên" : "Kỹ Thuật"}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col"
          >
            <div className="border-b border-editorial-line/10 pb-10 mb-10">
              <span className="text-editorial-accent text-[12px] uppercase tracking-[4px] font-semibold mb-6 block">
                {product.category}
              </span>
              <h1 className="text-5xl md:text-6xl font-serif mb-6 leading-tight">
                {product.name}
              </h1>
              <p className="text-2xl font-serif text-editorial-text/80">{product.price}</p>
            </div>

            <div className="space-y-10">
              <div>
                <h4 className="text-[10px] uppercase tracking-[3px] font-bold mb-4 opacity-40">Mô tả sản phẩm</h4>
                <p className="text-[#666] leading-relaxed font-light">
                  {product.description || `Mẫu ${product.name} là sự kết hợp hoàn mỹ giữa chất liệu tre tuyển chọn và kỹ thuật ${product.material === "Handcrafted" ? "đan lát thủ công tinh xảo" : "xử lý kỹ thuật hiện đại"}. Mỗi đường nét đều phảng phất hơi thở của thiên nhiên, mang lại vẻ đẹp đương đại nhưng vẫn vô cùng gần gũi cho không gian sống của bạn.`}
                </p>
              </div>

              <div className="flex items-end gap-8">
                <div className="space-y-4">
                  <h4 className="text-[10px] uppercase tracking-[3px] font-bold opacity-40">Số lượng</h4>
                  <div className="flex items-center border border-editorial-line/10 w-32">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center hover:bg-editorial-muted/10 transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="flex-1 text-center font-medium text-sm">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center hover:bg-editorial-muted/10 transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
                
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-editorial-text text-white py-5 px-10 flex items-center justify-center gap-4 uppercase text-[12px] tracking-[4px] font-bold hover:bg-editorial-accent transition-all duration-500 group"
                >
                  <ShoppingBag size={18} /> 
                  Thêm vào giỏ hàng
                </button>
              </div>

              {/* USP List */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-editorial-line/10">
                <div className="flex flex-col items-center text-center space-y-3">
                  <Award size={24} strokeWidth={1} className="text-editorial-accent" />
                  <span className="text-[9px] uppercase tracking-[1px] font-bold opacity-60">Chất lượng cao cấp</span>
                </div>
                <div className="flex flex-col items-center text-center space-y-3">
                  <ShieldCheck size={24} strokeWidth={1} className="text-editorial-accent" />
                  <span className="text-[9px] uppercase tracking-[1px] font-bold opacity-60">Bảo hành 24 tháng</span>
                </div>
                <div className="flex flex-col items-center text-center space-y-3">
                  <Truck size={24} strokeWidth={1} className="text-editorial-accent" />
                  <span className="text-[9px] uppercase tracking-[1px] font-bold opacity-60">Giao hàng toàn quốc</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Recommended Section (Simplified for now) */}
      <section className="bg-editorial-muted/5 py-32 px-[60px]">
        <div className="max-w-7xl mx-auto">
          <header className="mb-16 flex justify-between items-end">
             <div>
              <span className="text-editorial-accent text-[12px] uppercase tracking-[4px] font-semibold mb-4 block">You might like</span>
              <h2 className="text-4xl font-serif">Sản phẩm liên quan</h2>
            </div>
            <button 
              onClick={() => navigate("/collections")}
              className="text-[10px] uppercase tracking-[2px] opacity-40 hover:opacity-100 hover:text-editorial-accent transition-all mb-2"
            >
              Xem tất cả
            </button>
          </header>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <p className="col-span-full text-center py-10 font-serif italic opacity-40">Khám phá thêm các thiết kế tuyệt vời khác của Tre Việt.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
