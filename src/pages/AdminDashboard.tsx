import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Plus, Edit2, Trash2, Save, X, 
  LogIn, LogOut, Package, Image as ImageIcon, 
  Tag, Briefcase, DollarSign, AlertCircle, CheckCircle 
} from "lucide-react";
import { 
  collection, query, onSnapshot, 
  addDoc, updateDoc, deleteDoc, doc, 
  serverTimestamp, getDoc
} from "firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth";
import { db, auth, loginWithGoogle, logout } from "../lib/firebase";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface Product {
  id: string;
  name: string;
  price: string;
  priceNum: number;
  image: string;
  category: string;
  material: string;
}

export default function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [status, setStatus] = useState<{ type: 'success' | 'error', msg: string } | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    priceNum: 0,
    image: "",
    category: "Bàn Ghế",
    material: "Handcrafted"
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        setUser(user);
        if (user) {
          const adminDoc = await getDoc(doc(db, "admins", user.uid));
          setIsAdmin(adminDoc.exists());
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!isAdmin) return;
    const q = query(collection(db, "products"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const prods = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];
      setProducts(prods);
    }, (error) => {
      console.error("Error listening to products:", error);
      setStatus({ type: 'error', msg: "Không thể tải danh sách sản phẩm. Vui lòng kiểm tra quyền truy cập." });
    });
    return unsubscribe;
  }, [isAdmin]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        price: new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(formData.priceNum),
        updatedAt: serverTimestamp()
      };

      if (editingId) {
        await updateDoc(doc(db, "products", editingId), data);
        setStatus({ type: 'success', msg: "Cập nhật sản phẩm thành công" });
      } else {
        await addDoc(collection(db, "products"), {
          ...data,
          createdAt: serverTimestamp()
        });
        setStatus({ type: 'success', msg: "Thêm sản phẩm thành công" });
      }
      resetForm();
    } catch (error) {
      setStatus({ type: 'error', msg: "Đã xảy ra lỗi khi lưu sản phẩm" });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) return;
    try {
      await deleteDoc(doc(db, "products", id));
      setStatus({ type: 'success', msg: "Đã xóa sản phẩm" });
    } catch (error) {
      setStatus({ type: 'error', msg: "Không thể xóa sản phẩm" });
    }
  };

  const startEdit = (product: Product) => {
    setEditingId(product.id);
    setFormData({
      name: product.name,
      priceNum: product.priceNum,
      image: product.image,
      category: product.category,
      material: product.material
    });
    setIsAdding(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({
      name: "",
      priceNum: 0,
      image: "",
      category: "Bàn Ghế",
      material: "Handcrafted"
    });
  };

  if (loading) return <div className="h-screen flex items-center justify-center font-serif italic">Đang tải...</div>;

  return (
    <div className="bg-editorial-bg min-h-screen">
      <Navbar />
      
      <main className="pt-40 pb-20 px-[60px] max-w-7xl mx-auto">
        {!isAdmin ? (
          <div className="text-center py-20">
            <h1 className="text-4xl font-serif mb-8">Admin Dashboard</h1>
            <p className="text-[#666] mb-12 max-w-md mx-auto">
              Khu vực này chỉ dành cho quản trị viên. Vui lòng đăng nhập bằng tài khoản được cấp quyền.
            </p>
            {user ? (
              <div className="space-y-4">
                <p className="text-sm text-editorial-accent font-bold uppercase tracking-widest">
                   Tài khoản {user.email} không có quyền truy cập.
                </p>
                <button onClick={logout} className="px-8 py-3 border border-editorial-text hover:bg-editorial-text hover:text-white transition-all uppercase text-[10px] tracking-[2px] font-bold">
                  Đăng xuất
                </button>
              </div>
            ) : (
              <button 
                onClick={loginWithGoogle}
                className="flex items-center gap-4 mx-auto px-10 py-5 bg-editorial-text text-white hover:bg-editorial-accent transition-all duration-500 uppercase text-[12px] tracking-[4px] font-bold"
              >
                <LogIn size={18} /> Đăng nhập bằng Google
              </button>
            )}
            
            {/* Note about bootstrapping */}
            <div className="mt-20 p-6 border border-dashed border-editorial-line/20 max-w-2xl mx-auto text-left">
              <h3 className="text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                <AlertCircle size={14} className="text-editorial-accent" /> Hướng dẫn cấp quyền admin
              </h3>
              <ol className="text-xs space-y-2 opacity-60 list-decimal pl-4">
                <li>Truy cập Firebase Console {">"} Firestore Database.</li>
                <li><strong>QUAN TRỌNG:</strong> Chọn Database ID là <code className="bg-editorial-muted/20 px-1">ai-studio-f6625d20-a513-41aa-8f53-86bb62998c62</code> thay vì <code>(default)</code>.</li>
                <li>Tạo collection có tên là <code>admins</code>.</li>
                <li>Thêm một document với ID là <strong>UID</strong> tài khoản của bạn.</li>
                <li>UID của bạn hiện tại: <code className="bg-editorial-muted/20 px-1">{user?.uid || "(Đăng nhập để xem UID)"}</code></li>
              </ol>
            </div>
          </div>
        ) : (
          <div className="space-y-16">
            <header className="flex flex-col md:flex-row justify-between items-end gap-8 border-b border-editorial-line/10 pb-10">
              <div>
                <span className="text-editorial-accent text-[12px] uppercase tracking-[4px] font-semibold mb-4 block">Store Management</span>
                <h1 className="text-5xl font-serif">Quản Lý Danh Mục</h1>
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={() => setIsAdding(!isAdding)}
                  className="px-8 py-4 bg-editorial-text text-white hover:bg-editorial-accent transition-all flex items-center gap-3 uppercase text-[10px] tracking-[4px] font-bold"
                >
                  {isAdding ? <X size={16} /> : <Plus size={16} />}
                  {isAdding ? "Hủy" : "Thêm Sản Phẩm"}
                </button>
                <button onClick={logout} className="p-4 border border-editorial-line/10 hover:bg-editorial-muted/10 transition-all text-editorial-text/40 hover:text-editorial-text">
                  <LogOut size={20} />
                </button>
              </div>
            </header>

            <AnimatePresence>
              {status && (
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`p-4 flex items-center gap-3 ${status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'} text-xs font-bold uppercase tracking-wider`}
                >
                  {status.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                  {status.msg}
                  <button onClick={() => setStatus(null)} className="ml-auto opacity-50 hover:opacity-100"><X size={14} /></button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form Section */}
            <AnimatePresence>
              {isAdding && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <form onSubmit={handleSave} className="bg-editorial-muted/5 border border-editorial-line/10 p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-[2px] font-bold opacity-40 flex items-center gap-2">
                          <Package size={12} /> Tên sản phẩm
                        </label>
                        <input 
                          required
                          value={formData.name}
                          onChange={e => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-white border border-editorial-line/10 p-4 font-serif outline-none focus:border-editorial-accent transition-colors"
                          placeholder="Ví dụ: Ghế Mây Thư Giãn"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-[2px] font-bold opacity-40 flex items-center gap-2">
                          <DollarSign size={12} /> Giá (VNĐ)
                        </label>
                        <input 
                          type="number"
                          required
                          value={isNaN(formData.priceNum) ? "" : formData.priceNum}
                          onChange={e => {
                            const val = e.target.value === "" ? 0 : parseInt(e.target.value);
                            setFormData({ ...formData, priceNum: isNaN(val) ? 0 : val });
                          }}
                          className="w-full bg-white border border-editorial-line/10 p-4 font-serif outline-none focus:border-editorial-accent transition-colors"
                        />
                        <p className="text-[10px] italic opacity-40">Hiển thị: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(formData.priceNum || 0)}</p>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-[2px] font-bold opacity-40 flex items-center gap-2">
                          <ImageIcon size={12} /> Link Ảnh (Unsplash/CDN)
                        </label>
                        <input 
                          required
                          value={formData.image}
                          onChange={e => setFormData({ ...formData, image: e.target.value })}
                          className="w-full bg-white border border-editorial-line/10 p-4 font-mono text-xs outline-none focus:border-editorial-accent transition-colors"
                          placeholder="https://images.unsplash.com/..."
                        />
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-[2px] font-bold opacity-40 flex items-center gap-2">
                          <Tag size={12} /> Danh mục
                        </label>
                        <select 
                          value={formData.category}
                          onChange={e => setFormData({ ...formData, category: e.target.value })}
                          className="w-full bg-white border border-editorial-line/10 p-4 font-serif outline-none focus:border-editorial-accent transition-colors"
                        >
                          <option>Bàn Ghế</option>
                          <option>Đèn Trang Trí</option>
                          <option>Phụ Kiện</option>
                          <option>Nội Thất</option>
                          <option>Trang Trí</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-[2px] font-bold opacity-40 flex items-center gap-2">
                          <Briefcase size={12} /> Chất liệu / Chế tác
                        </label>
                        <select 
                          value={formData.material}
                          onChange={e => setFormData({ ...formData, material: e.target.value })}
                          className="w-full bg-white border border-editorial-line/10 p-4 font-serif outline-none focus:border-editorial-accent transition-colors"
                        >
                          <option value="Natural">Tre Tự Nhiên (Natural)</option>
                          <option value="Handcrafted">Thủ Công (Handcrafted)</option>
                          <option value="Processed">Tre Kỹ Thuật (Processed)</option>
                        </select>
                      </div>
                      <div className="pt-6 flex gap-4">
                        <button type="submit" className="flex-1 bg-editorial-text text-white py-5 flex items-center justify-center gap-3 uppercase text-[10px] tracking-[4px] font-bold hover:bg-editorial-accent transition-all">
                          <Save size={16} /> {editingId ? "Cập Nhật Sản Phẩm" : "Lưu Sản Phẩm"}
                        </button>
                        <button type="button" onClick={resetForm} className="px-8 border border-editorial-line/10 hover:bg-white transition-all uppercase text-[10px] tracking-[2px] opacity-40 hover:opacity-100">
                          Hủy
                        </button>
                      </div>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            {/* List Section */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-editorial-line/20">
                    <th className="py-6 px-4 text-[10px] uppercase tracking-[3px] font-bold opacity-30">Hình ảnh</th>
                    <th className="py-6 px-4 text-[10px] uppercase tracking-[3px] font-bold opacity-30">Tên sản phẩm</th>
                    <th className="py-6 px-4 text-[10px] uppercase tracking-[3px] font-bold opacity-30">Danh mục</th>
                    <th className="py-6 px-4 text-[10px] uppercase tracking-[3px] font-bold opacity-30">Giá</th>
                    <th className="py-6 px-4 text-[10px] uppercase tracking-[3px] font-bold opacity-30 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-20 text-center font-serif italic text-[#999]">Chưa có sản phẩm nào trong kho.</td>
                    </tr>
                  ) : (
                    products.map(product => (
                      <tr key={product.id} className="border-b border-editorial-line/10 hover:bg-editorial-muted/5 transition-colors group">
                        <td className="py-6 px-4">
                          <div className="w-16 h-20 overflow-hidden bg-editorial-muted/20">
                            <img src={product.image} alt="" className="w-full h-full object-cover grayscale brightness-95 group-hover:grayscale-0 scale-105" referrerPolicy="no-referrer" />
                          </div>
                        </td>
                        <td className="py-6 px-4">
                          <div className="font-serif text-lg">{product.name}</div>
                          <div className="text-[10px] uppercase tracking-widest opacity-40">{product.material}</div>
                        </td>
                        <td className="py-6 px-4">
                          <span className="text-[10px] px-3 py-1 border border-editorial-line/10 uppercase tracking-widest">{product.category}</span>
                        </td>
                        <td className="py-6 px-4 font-serif">{product.price}</td>
                        <td className="py-6 px-4 text-right">
                          <div className="flex justify-end gap-4">
                            <button onClick={() => startEdit(product)} className="p-2 text-editorial-text hover:text-blue-600 transition-colors"><Edit2 size={18} /></button>
                            <button onClick={() => handleDelete(product.id)} className="p-2 text-editorial-text hover:text-editorial-accent transition-colors"><Trash2 size={18} /></button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
