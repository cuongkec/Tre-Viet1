import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className="py-40 px-[60px] bg-editorial-bg border-t border-editorial-line/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          
          <div>
            <span className="text-editorial-accent text-[12px] uppercase tracking-[2px] font-semibold mb-6 block">Get in Touch</span>
            <h2 className="text-5xl md:text-7xl font-serif leading-[0.9] mb-12">
              Bắt Đầu Một <br />
              <span className="italic-serif text-editorial-accent">Dự Án Mới.</span>
            </h2>
            <p className="text-[#666] leading-[1.6] font-light text-[18px] max-w-md mb-16">
              Chúng tôi luôn sẵn lòng lắng nghe những ý tưởng về không gian của bạn. Hãy liên hệ để cùng nhau kiến tạo nên những giá trị bền vững.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-10 h-10 border border-editorial-line flex items-center justify-center rounded-full shrink-0">
                  <MapPin size={18} strokeWidth={1.5} className="text-editorial-accent" />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest font-bold opacity-40 mb-2">Showroom Hà Nội</h4>
                  <p className="text-sm">24 Lý Quốc Sư, Hoàn Kiếm, Hà Nội</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-10 h-10 border border-editorial-line flex items-center justify-center rounded-full shrink-0">
                  <Phone size={18} strokeWidth={1.5} className="text-editorial-accent" />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest font-bold opacity-40 mb-2">Điện thoại</h4>
                  <p className="text-sm">+84 (0) 24 3828 2212</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-10 h-10 border border-editorial-line flex items-center justify-center rounded-full shrink-0">
                  <Mail size={18} strokeWidth={1.5} className="text-editorial-accent" />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest font-bold opacity-40 mb-2">Email</h4>
                  <p className="text-sm">contact@treviet.vn</p>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="bg-white p-12 shadow-[0_30px_60px_rgba(0,0,0,0.03)] border border-editorial-line/10 relative"
          >
            {/* Corner Accent */}
            <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-editorial-accent/20" />
            
            <form className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="relative">
                  <input type="text" id="name" required className="w-full bg-transparent border-b border-editorial-line py-2 focus:border-editorial-accent outline-none text-sm transition-colors peer" placeholder=" " />
                  <label htmlFor="name" className="absolute left-0 top-2 text-[10px] uppercase tracking-widest font-bold opacity-40 transition-all peer-focus:-top-6 peer-focus:text-editorial-accent peer-not-placeholder-shown:-top-6">Họ và Tên</label>
                </div>
                <div className="relative">
                  <input type="email" id="email" required className="w-full bg-transparent border-b border-editorial-line py-2 focus:border-editorial-accent outline-none text-sm transition-colors peer" placeholder=" " />
                  <label htmlFor="email" className="absolute left-0 top-2 text-[10px] uppercase tracking-widest font-bold opacity-40 transition-all peer-focus:-top-6 peer-focus:text-editorial-accent peer-not-placeholder-shown:-top-6">Email</label>
                </div>
              </div>

              <div className="relative">
                <select id="subject" className="w-full bg-transparent border-b border-editorial-line py-2 focus:border-editorial-accent outline-none text-sm transition-colors peer appearance-none">
                  <option value="consultancy">Tư vấn thiết kế</option>
                  <option value="retail">Mua hàng cá nhân</option>
                  <option value="wholesale">Hợp tác kinh doanh</option>
                </select>
                <label htmlFor="subject" className="absolute left-0 -top-6 text-[10px] uppercase tracking-widest font-bold opacity-40">Mục đích liên hệ</label>
              </div>

              <div className="relative">
                <textarea id="message" rows={4} required className="w-full bg-transparent border-b border-editorial-line py-2 focus:border-editorial-accent outline-none text-sm transition-colors peer resize-none" placeholder=" " />
                <label htmlFor="message" className="absolute left-0 top-2 text-[10px] uppercase tracking-widest font-bold opacity-40 transition-all peer-focus:-top-6 peer-focus:text-editorial-accent peer-not-placeholder-shown:-top-6">Lời nhắn của bạn</label>
              </div>

              <button type="submit" className="w-full py-4 bg-editorial-text text-white text-[12px] uppercase tracking-[3px] font-bold hover:bg-editorial-accent transition-all duration-500 flex items-center justify-center gap-3">
                Gửi yêu cầu <Send size={14} />
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
