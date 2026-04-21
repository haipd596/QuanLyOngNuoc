import { useState } from 'react';
import { Search, Plus, Minus, Trash2, CreditCard, Receipt, FileText, ShoppingCart } from 'lucide-react';

const MOCK_PRODUCTS = [
  { id: 1, sku: 'PVC-027', name: 'Ống nhựa Bình Minh Phi 27', price: 45000, stock: 150, unit: 'Ống' },
  { id: 2, sku: 'VAN-D21', name: 'Van bi đồng tay gạt ren trong 21', price: 65000, stock: 25, unit: 'Cái' },
  { id: 3, sku: 'KNT-PVC', name: 'Khớp nối chữ T phi 21', price: 5000, stock: 500, unit: 'Cái' },
  { id: 4, sku: 'KEO-BM', name: 'Keo dán ống nhựa Tiền Phong 500g', price: 25000, stock: 45, unit: 'Hộp' },
  { id: 5, sku: 'BT-001', name: 'Băng tan chống thấm', price: 8000, stock: 200, unit: 'Cuộn' },
];

export function Sales() {
  const [cart, setCart] = useState<{product: typeof MOCK_PRODUCTS[0], qty: number}[]>([
    { product: MOCK_PRODUCTS[0], qty: 2 },
    { product: MOCK_PRODUCTS[1], qty: 1 }
  ]);
  const [searchTerm, setSearchTerm] = useState('');

  const addToCart = (prod: typeof MOCK_PRODUCTS[0]) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === prod.id);
      if (existing) {
        return prev.map(item => item.product.id === prod.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { product: prod, qty: 1 }];
    });
  };

  const updateQty = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === id) {
        const newQty = Math.max(1, item.qty + delta);
        return { ...item, qty: newQty };
      }
      return item;
    }));
  };

  const remove = (id: number) => {
    setCart(prev => prev.filter(item => item.product.id !== id));
  };

  const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.qty), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <div className="flex h-[calc(100vh-140px)] gap-6 animate-in fade-in duration-500">
      
      {/* LEFT COL: PRODUCTS CATALOG */}
      <div className="flex-1 bg-white rounded-[2rem] border border-gray-100 shadow-sm flex flex-col overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex flex-col gap-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <ShoppingCart className="text-blue-500" /> Bác Hàng (Point of Sale)
          </h2>
          <div className="relative">
            <Search className="absolute left-4 top-3 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Quét mã vạch (SKU) hoặc tìm tên vật tư..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl py-3 pl-12 pr-4 font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
            />
          </div>
          <div className="flex gap-2 w-full overflow-x-auto pb-1 scrollbar-hide">
             {['Tất cả', 'Ống nhựa', 'Van & Vòi', 'Phụ kiện nối', 'Dụng cụ'].map((c, i) => (
                <button key={i} className={`px-4 py-1.5 rounded-full text-sm font-bold whitespace-nowrap ${i === 0 ? 'bg-blue-600 text-white shadow-md' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                  {c}
                </button>
             ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-gray-50/30">
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {MOCK_PRODUCTS.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.sku.toLowerCase().includes(searchTerm.toLowerCase())).map((p) => (
              <div 
                key={p.id} 
                onClick={() => addToCart(p)}
                className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-gray-400">{p.sku}</span>
                    <span className="text-[10px] items-center px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-600 font-bold">
                       Tồn: {p.stock}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">
                    {p.name}
                  </h3>
                </div>
                <div className="mt-auto">
                  <span className="text-base font-extrabold text-blue-600">
                    {p.price.toLocaleString('vi-VN')}₫
                  </span>
                  <span className="text-xs font-medium text-gray-500 ml-1">/{p.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT COL: CURRENT TICKET */}
      <div className="w-[400px] shrink-0 bg-white rounded-[2rem] border border-gray-100 shadow-sm flex flex-col">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 rounded-t-[2rem]">
          <h2 className="text-lg font-bold text-gray-900">Giỏ Hàng</h2>
          <span className="bg-blue-100 text-blue-700 font-bold px-3 py-1 rounded-full text-sm">Sale-0912</span>
        </div>

        {/* Customer Select */}
        <div className="p-4 border-b border-gray-100">
           <div className="flex mb-2">
             <button className="flex-1 py-1.5 text-sm font-bold bg-gray-900 text-white rounded-l-lg border border-gray-900">Khách lẻ</button>
             <button className="flex-1 py-1.5 text-sm font-bold bg-white text-gray-500 rounded-r-lg border border-gray-200 border-l-0 hover:bg-gray-50">Khách quen</button>
           </div>
           <input type="text" placeholder="Nhập tên hoặc SĐT khách hàng..." className="w-full text-sm border-b border-gray-200 py-2 outline-none focus:border-blue-500" />
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50/20">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
               <ShoppingCart size={48} className="mb-4 opacity-50" />
               <p className="font-medium">Chưa có sản phẩm nào</p>
            </div>
          ) : cart.map((item) => (
            <div key={item.product.id} className="flex gap-3 bg-white p-3 border border-gray-100 rounded-xl shadow-sm">
              <div className="flex-1">
                <div className="flex justify-between items-start pr-1">
                   <h4 className="text-sm font-bold text-gray-900 line-clamp-1">{item.product.name}</h4>
                   <button onClick={() => remove(item.product.id)} className="text-gray-300 hover:text-red-500 p-1 -mr-2"><Trash2 size={14}/></button>
                </div>
                <div className="text-blue-600 font-bold text-sm mt-1">
                  {item.product.price.toLocaleString('vi-VN')}₫
                </div>
                <div className="flex items-center gap-3 mt-2">
                   <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                     <button onClick={() => updateQty(item.product.id, -1)} className="px-2 py-1 text-gray-500 hover:bg-gray-200"><Minus size={14}/></button>
                     <span className="px-2 py-1 text-sm font-bold w-8 text-center bg-white">{item.qty}</span>
                     <button onClick={() => updateQty(item.product.id, 1)} className="px-2 py-1 text-gray-500 hover:bg-gray-200"><Plus size={14}/></button>
                   </div>
                   <span className="text-sm font-bold text-gray-900">
                     {(item.product.price * item.qty).toLocaleString('vi-VN')}₫
                   </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Checkout Section */}
        <div className="p-6 border-t border-gray-100 bg-gray-50 rounded-b-[2rem] flex flex-col gap-3">
          <div className="flex justify-between text-sm font-medium text-gray-500">
            <span>Khách cần trả (Tạm tính)</span>
            <span className="text-gray-900 font-bold">{subtotal.toLocaleString('vi-VN')}₫</span>
          </div>
          <div className="flex justify-between text-sm font-medium text-gray-500 pb-2 border-b border-gray-200">
            <span>Thuế VAT (8%)</span>
            <span className="text-gray-900 font-bold">{tax.toLocaleString('vi-VN')}₫</span>
          </div>
          <div className="flex justify-between items-end mb-2">
            <span className="text-base font-bold text-gray-900">Tổng cộng</span>
            <span className="text-2xl font-extrabold text-blue-600">{total.toLocaleString('vi-VN')}₫</span>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mt-2">
             <button className="flex items-center justify-center gap-2 py-3 bg-white border border-gray-200 rounded-xl font-bold text-gray-700 hover:bg-gray-50">
               <Receipt size={18} /> In Tạm Tính
             </button>
             <button className="flex items-center justify-center gap-2 py-3 bg-white border border-gray-200 rounded-xl font-bold text-gray-700 hover:bg-gray-50">
               <CreditCard size={18} /> Chuyển khoản
             </button>
          </div>
          <button className="w-full flex items-center justify-center gap-2 py-4 bg-blue-600 rounded-xl font-bold text-white text-lg mt-2 shadow-lg shadow-blue-600/30 hover:bg-blue-700 transition-colors">
            <FileText size={20} /> THANH TOÁN TIỀN MẶT
          </button>
        </div>
      </div>
      
    </div>
  );
}
