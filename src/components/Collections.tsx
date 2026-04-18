import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const collections = [
  {
    title: "Bàn Ghế Phòng Khách",
    category: "Living Room",
    image: "https://images.unsplash.com/photo-1617103996702-96ff29b1c467?q=80&w=1932&auto=format&fit=crop",
    link: "/collections"
  },
  {
    title: "Đèn Trang Trí Thủ Công",
    category: "Lighting",
    image: "https://images.unsplash.com/photo-1543167660-39d5272bc53b?q=80&w=2070&auto=format&fit=crop",
    link: "/collections"
  },
  {
    title: "Phụ Kiện Nhà Bếp",
    category: "Kitchen & Dining",
    image: "https://images.unsplash.com/photo-1610701596007-11502444005b?q=80&w=2070&auto=format&fit=crop",
    link: "/collections"
  },
  {
    title: "Nội Thất Đương Đại",
    category: "Modern Furniture",
    image: "https://images.unsplash.com/photo-1620626011761-9963d7b59675?q=80&w=2070&auto=format&fit=crop",
    link: "/collections"
  }
];

export default function Collections() {
  return (
    <section id="collections" className="py-32 px-[60px] bg-editorial-bg">
      <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
        <div className="max-w-2xl">
          <span className="text-editorial-accent text-[12px] uppercase tracking-[2px] font-semibold mb-4 block">Our Collections</span>
          <h2 className="text-4xl md:text-5xl font-serif leading-tight">
            Khi vật liệu truyền thống <br />
            <span className="italic-serif text-editorial-accent">giao thoa cùng hơi thở mới.</span>
          </h2>
        </div>
        <Link to="/collections" className="border-b border-editorial-text pb-2 hover:text-editorial-accent hover:border-editorial-accent transition-all text-[12px] uppercase tracking-[2px] font-semibold">
          Xem tất cả sản phẩm
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[20px]">
        {collections.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.8 }}
            className="group cursor-pointer editorial-card"
          >
            <Link to={item.link} className="block">
              <div className="overflow-hidden mb-6 aspect-[4/5] bg-editorial-muted/20 relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                
                {/* Enhanced Hover Overlay */}
                <div className="absolute inset-0 bg-editorial-text/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                    <h4 className="text-white font-serif text-2xl mb-2 leading-tight">{item.title}</h4>
                    <div className="flex items-center gap-2 text-white/80 text-[10px] uppercase tracking-[3px] font-bold">
                      View Collection <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <h3 className="text-[18px] font-serif group-hover:italic transition-all mb-1">{item.title}</h3>
                <p className="text-[11px] text-[#8a8a8a] uppercase tracking-[1px]">{item.category} • {index % 2 === 0 ? 'Tự nhiên' : 'Thủ công'}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
