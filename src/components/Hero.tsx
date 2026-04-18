import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-screen w-full pt-[120px] px-[60px] grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-[40px] bg-editorial-bg">
      {/* Accent Circle behind */}
      <div className="absolute top-[-50px] right-[-50px] w-[600px] h-[600px] border border-editorial-muted/30 rounded-full -z-10" />
      <div className="absolute left-5 bottom-[300px] writing-vertical-rl rotate-180 text-[11px] tracking-[5px] text-editorial-muted pb-10">SINCE 1992</div>

      {/* Hero Text */}
      <div className="flex flex-col justify-center max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="text-[82px] leading-[0.9] font-serif mb-[30px] font-light">
            Nghệ Thuật <span className="italic-serif text-editorial-accent">Tre</span> <br />
            Đương Đại.
          </h1>
          <p className="text-[16px] leading-[1.6] text-[#666] mb-[40px] max-w-[400px]">
            Sự kết hợp tinh tế giữa kỹ thuật đan lát truyền thống và tư duy thiết kế hiện đại, 
            mang hơi thở của thiên nhiên Việt vào không gian sống thượng lưu.
          </p>
          
          <Link to="/collections" className="inline-block border border-editorial-text border-solid px-[30px] py-[12px] text-[12px] uppercase tracking-[2px] transition-all hover:bg-editorial-text hover:text-white">
            Khám phá ngay
          </Link>
        </motion.div>
      </div>

      {/* Hero Image */}
      <div className="relative h-[500px] lg:h-full bg-editorial-muted rounded-[2px] overflow-hidden group">
        {/* Subtle Pattern Background simulating the stripe pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "linear-gradient(45deg, #000 25%, transparent 25%, transparent 50%, #000 50%, #000 75%, transparent 75%, transparent 100%)",
            backgroundSize: "20px 20px"
          }}
        />
        <img
          src="https://images.unsplash.com/photo-1513519247388-19345ed5d467?q=80&w=2070&auto=format&fit=crop"
          alt="Bamboo Interior Hero"
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-[30px] right-[-15px] rotate-90 text-[10px] tracking-[4px] text-white/50 font-bold">HANDCRAFTED 2024</div>
        <div className="absolute bottom-6 left-6 text-white text-[12px] font-semibold tracking-widest">BST: XUÂN TRE 2024</div>
      </div>
    </section>
  );
}
