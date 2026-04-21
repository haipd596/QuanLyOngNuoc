import { useState } from 'react';
import { Search, Plus, Filter, AlertTriangle, ArrowUpDown, MoreHorizontal, Edit, Trash2 } from 'lucide-react';

const MOCK_INVENTORY = [
  { id: 1, sku: 'PVC-027', name: 'Ống nhựa Bình Minh Phi 27', category: 'Ống nước', price: 45000, cost: 38000, stock: 15, minStock: 20, status: 'LOW' },
  { id: 2, sku: 'VAN-D21', name: 'Van bi tay gạt rắc co 21', category: 'Van & Vòi', price: 65000, cost: 50000, stock: 8, minStock: 10, status: 'LOW' },
  { id: 3, sku: 'KNT-PVC', name: 'Khớp nối chữ T phi 21', category: 'Phụ kiện', price: 5000, cost: 3500, stock: 500, minStock: 100, status: 'OK' },
  { id: 4, sku: 'KEO-BM', name: 'Keo dán nhựa Tiền Phong', category: 'Hóa chất', price: 25000, cost: 18000, stock: 45, minStock: 20, status: 'OK' },
  { id: 5, sku: 'BT-001', name: 'Băng tan chống thấm', category: 'Phụ kiện', price: 8000, cost: 4500, stock: 120, minStock: 50, status: 'OK' },
  { id: 6, sku: 'ONG-K34', name: 'Ống kẽm ren 2 đầu Phi 34', category: 'Ống kim loại', price: 85000, cost: 72000, stock: 0, minStock: 15, status: 'OUT' },
];

export function Inventory() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="animate-in fade-in duration-500">
      
      {/* Header Area */}
      <div className="flex justify-between items-end mb-6">
         <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Quản Lý Tồn Kho</h1>
            <p className="text-sm font-medium text-gray-500 mt-1">Quản lý mặt hàng, cấu hình định mức kho và cảnh báo cạn kiệt.</p>
         </div>
         <div className="flex gap-3">
             <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
                <Filter size={18} /> Bộ lọc
             </button>
             <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all">
                <Plus size={18} /> Thêm Sản Phẩm Mới
             </button>
         </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
           { title: 'Tổng loại vật tư', val: '1,248', color: 'text-gray-900', bg: 'bg-white' },
           { title: 'Đang hết hàng (OUT)', val: '12', color: 'text-red-600', bg: 'bg-red-50' },
           { title: 'Sắp hết (LOW Tồn)', val: '45', color: 'text-orange-600', bg: 'bg-orange-50' },
           { title: 'Giá trị Tồn Kho', val: '840tr ₫', color: 'text-emerald-700', bg: 'bg-emerald-50' },
        ].map((s, i) => (
           <div key={i} className={`${s.bg} p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-center`}>
              <span className="text-[13px] font-bold text-gray-500 uppercase tracking-wider mb-1">{s.title}</span>
              <span className={`text-2xl font-black tracking-tight ${s.color}`}>{s.val}</span>
           </div>
        ))}
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          {/* Table Toolbar */}
          <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
             <div className="relative w-96">
                <Search className="absolute left-4 top-2.5 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Tìm kiếm theo mã SKU, tên vật tư..." 
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl py-2 pl-11 pr-4 text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                />
             </div>
             
             <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-500">Hiển thị</span>
                <select className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm font-bold outline-none">
                  <option>10</option>
                  <option>50</option>
                  <option>100</option>
                </select>
                <span className="text-sm font-medium text-gray-500">hàng hóa</span>
             </div>
          </div>

          {/* Data Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white border-b border-gray-100 text-[13px] text-gray-400 font-bold uppercase tracking-wider">
                  <th className="p-4 pl-6 w-12"><input type="checkbox" className="rounded border-gray-300" /></th>
                  <th className="p-4 font-bold max-w-[100px] cursor-pointer hover:text-gray-900 group">Mã SKU <ArrowUpDown size={14} className="inline opacity-0 group-hover:opacity-100 transition-opacity ml-1"/></th>
                  <th className="p-4 font-bold cursor-pointer hover:text-gray-900">Tên Hàng Hóa</th>
                  <th className="p-4 font-bold">Danh Mục</th>
                  <th className="p-4 font-bold text-right cursor-pointer hover:text-gray-900">Giá Nhập</th>
                  <th className="p-4 font-bold text-right cursor-pointer hover:text-gray-900">Giá Bán</th>
                  <th className="p-4 font-bold text-center">Tồn / Định Mức</th>
                  <th className="p-4 font-bold text-center pr-6">Thao tác</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {MOCK_INVENTORY.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.sku.toLowerCase().includes(searchTerm.toLowerCase())).map((item) => (
                  <tr key={item.id} className="border-b border-gray-50 hover:bg-blue-50/30 transition-colors group">
                    <td className="p-4 pl-6"><input type="checkbox" className="rounded border-gray-300" /></td>
                    <td className="p-4 font-bold text-blue-600">{item.sku}</td>
                    <td className="p-4 font-bold text-gray-900 min-w-[250px]">{item.name}</td>
                    <td className="p-4 text-gray-500 font-medium">
                       <span className="px-2 py-1 bg-gray-100 rounded-md text-xs">{item.category}</span>
                    </td>
                    <td className="p-4 font-semibold text-gray-600 text-right">{item.cost.toLocaleString('vi-VN')}₫</td>
                    <td className="p-4 font-bold text-gray-900 text-right">{item.price.toLocaleString('vi-VN')}₫</td>
                    
                    <td className="p-4 text-center">
                       <div className="flex flex-col items-center">
                          <span className={`font-black text-lg ${item.status === 'OUT' ? 'text-red-600' : item.status === 'LOW' ? 'text-orange-500' : 'text-emerald-600'}`}>
                            {item.stock}
                          </span>
                          <span className="text-[11px] text-gray-400 font-bold uppercase">Min: {item.minStock}</span>
                       </div>
                       {(item.status === 'OUT' || item.status === 'LOW') && (
                          <div className={`mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1 ${item.status === 'OUT' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>
                             <AlertTriangle size={10} /> {item.status === 'OUT' ? 'HẾT HÀNG' : 'SẮP HẾT'}
                          </div>
                       )}
                    </td>
                    
                    <td className="p-4 pr-6 text-center">
                       <div className="flex justify-center items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Chỉnh sửa"><Edit size={16}/></button>
                          <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Xóa"><Trash2 size={16}/></button>
                          <button className="p-1.5 text-gray-400 hover:text-gray-900 bg-gray-50 rounded-lg transition-colors"><MoreHorizontal size={16}/></button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500 font-medium">
             <span>Đang hiển thị 1-6 trong tổng số 1,248 mặt hàng</span>
             <div className="flex gap-1 border border-gray-200 rounded-lg overflow-hidden font-bold">
               <button className="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 transition-colors">Trước</button>
               <button className="px-3 py-1.5 bg-blue-600 text-white">1</button>
               <button className="px-3 py-1.5 bg-white hover:bg-gray-50 transition-colors">2</button>
               <button className="px-3 py-1.5 bg-white hover:bg-gray-50 transition-colors">3</button>
               <span className="px-3 py-1.5 bg-white">...</span>
               <button className="px-3 py-1.5 bg-white hover:bg-gray-50 transition-colors">Tiếp</button>
             </div>
          </div>
      </div>

    </div>
  );
}
