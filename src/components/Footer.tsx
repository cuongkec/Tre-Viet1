import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, Mail, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-editorial-text text-editorial-bg pt-24 pb-12 px-[60px]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-8">
              <span className="text-3xl font-serif tracking-[4px] uppercase font-bold text-editorial-accent">Tre Việt.</span>
            </Link>
            <p className="opacity-50 text-[14px] leading-[1.6] mb-8 max-w-xs">
              Mang không gian sống xanh và bền vững vào mỗi ngôi nhà Việt thông qua ngôn ngữ thiết kế từ Tre.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 border border-editorial-bg/20 rounded-full flex items-center justify-center hover:bg-editorial-bg hover:text-editorial-text transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 border border-editorial-bg/20 rounded-full flex items-center justify-center hover:bg-editorial-bg hover:text-editorial-text transition-all">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 border border-editorial-bg/20 rounded-full flex items-center justify-center hover:bg-editorial-bg hover:text-editorial-text transition-all">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-[12px] uppercase tracking-[2px] font-semibold mb-8 text-editorial-accent">Khám phá</h4>
            <ul className="space-y-4 text-[13px] opacity-60">
              <li><Link to="/collections" className="hover:opacity-100 transition-opacity">Bộ Sưu Tập</Link></li>
              <li><a href="/#process" className="hover:opacity-100 transition-opacity">Quy Trình Sản Xuất</a></li>
              <li><Link to="/collections" className="hover:opacity-100 transition-opacity">Sản Phẩm Mới</Link></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Cửa Hàng Trực Tuyến</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[12px] uppercase tracking-[2px] font-semibold mb-8 text-editorial-accent">Tạp chí</h4>
            <ul className="space-y-4 text-[13px] opacity-60">
              <li><a href="/#about" className="hover:opacity-100 transition-opacity">Về Chúng Tôi</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Chuyện Của Tre</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Blog Thiết Kế</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Tin Tức & Sự Kiện</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[12px] uppercase tracking-[2px] font-semibold mb-8 text-editorial-accent">Hỗ trợ</h4>
            <ul className="space-y-4 text-[13px] opacity-60 mb-10">
              <li><a href="#" className="hover:opacity-100 transition-opacity">Chính Sách Bảo Hành</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Vận Chuyển & Giao Nhận</a></li>
              <li><a href="/#contact" className="hover:opacity-100 transition-opacity">Liên Hệ</a></li>
              <li><Link to="/admin" className="hover:text-editorial-accent transition-colors font-medium">Quản Trị Viên</Link></li>
            </ul>
            
            <h4 className="text-[12px] uppercase tracking-[2px] font-semibold mb-6 text-editorial-accent">Đăng ký</h4>
            <p className="text-[12px] opacity-50 mb-6 font-light">Nhận bản tin từ Tre Việt.</p>
            <form className="relative border-b border-editorial-bg/20 pb-2">
              <input 
                type="email" 
                placeholder="Email của bạn" 
                className="bg-transparent border-none outline-none text-[13px] w-full pr-10 placeholder:text-editorial-bg/30"
              />
              <button type="submit" className="absolute right-0 top-0 opacity-50 hover:opacity-100 transition-opacity">
                <Mail size={18} />
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center border-t border-editorial-bg/10 pt-12 gap-8">
          <span className="text-[10px] uppercase tracking-[2px] opacity-40">
            © 2024 Tre Việt Interior. All Rights Reserved.
          </span>
          <div className="flex gap-8 text-[10px] uppercase tracking-[2px] opacity-40">
            <a href="#" className="hover:opacity-100">Chính sách bảo mật</a>
            <a href="#" className="hover:opacity-100">Điều khoản sử dụng</a>
          </div>
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-2 group"
          >
            <span className="text-[10px] uppercase tracking-[2px] opacity-40 group-hover:opacity-100">Lên đầu trang</span>
            <div className="w-8 h-8 rounded-full border border-editorial-bg/20 flex items-center justify-center group-hover:bg-editorial-bg group-hover:text-editorial-text transition-all">
              <ArrowUp size={14} />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
