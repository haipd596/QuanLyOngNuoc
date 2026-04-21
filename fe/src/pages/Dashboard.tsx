import { TrendingUp, DollarSign, Package, AlertCircle, RefreshCw, Layers } from 'lucide-react';

const MetricCard = ({ title, value, change, isPositive, icon: Icon, colorClass }: any) => (
  <div className={`relative p-6 rounded-[2rem] bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)] transition-all duration-400 group overflow-hidden`}>
    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${colorClass} opacity-[0.03] rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700 ease-out`} />
    <div className="flex justify-between items-start mb-6">
      <div className={`w-14 h-14 rounded-[1.25rem] flex items-center justify-center bg-gradient-to-br ${colorClass} shadow-sm border border-white`}>
        <Icon size={24} className="text-gray-700" />
      </div>
      <span className={`text-[13px] font-bold px-3 py-1.5 rounded-full ${isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
        {isPositive ? '+' : ''}{change}%
      </span>
    </div>
    <div>
      <h3 className="text-gray-500 font-semibold mb-1 tracking-wide text-sm">{title}</h3>
      <div className="flex items-baseline gap-1">
        <span className="text-[32px] font-bold tracking-tight text-gray-900">{value}</span>
      </div>
    </div>
  </div>
);

export function Dashboard() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      {/* Overview Cards */}
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Xin chào, Quản trị viên 👋</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard title="Doanh thu hôm nay" value="12,450,000₫" change={12.5} isPositive={true} icon={DollarSign} colorClass="from-emerald-100 to-teal-50" />
        <MetricCard title="Đơn hàng (POS)" value="48 đơn" change={5.2} isPositive={true} icon={TrendingUp} colorClass="from-blue-100 to-indigo-50" />
        <MetricCard title="AI CẢNH BÁO TỒN KHO" value="8 SKU" change={2.4} isPositive={false} icon={AlertCircle} colorClass="from-red-100 to-orange-50" />
        <MetricCard title="Phiếu nhập hàng" value="3 Phiếu" change={18.2} isPositive={true} icon={Package} colorClass="from-purple-100 to-pink-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart Area */}
        <div className="lg:col-span-2 rounded-[2.5rem] bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-xl font-bold tracking-tight text-gray-900">Doanh thu & Đơn hàng</h3>
              <p className="text-sm font-medium text-gray-500 mt-1">Biょu đồ thống kê doanh số linh kiện và vật tư nước</p>
            </div>
            <select className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-xl px-4 py-2 font-medium outline-none focus:border-blue-500">
              <option>7 Ngày qua</option>
              <option>Tháng này</option>
            </select>
          </div>
          
          <div className="h-[300px] w-full flex items-end justify-between gap-2">
             {/* Mock Bar Chart */}
             {[40, 25, 60, 45, 80, 55, 90, 70, 100].map((h, i) => (
                <div key={i} className="w-full relative group flex justify-center">
                   <div style={{height: `${h}%`}} className="w-full max-w-[40px] bg-blue-100 rounded-t-xl group-hover:bg-blue-500 transition-colors duration-300 relative">
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs font-bold py-1 px-2 rounded-lg whitespace-nowrap">
                        {h * 150}k ₫
                      </div>
                   </div>
                </div>
             ))}
          </div>
        </div>

        {/* AI Inventory Suggestion */}
        <div className="rounded-[2.5rem] bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] p-8 flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
              <Layers className="text-blue-500" size={24} /> AI Khuyến nghị
            </h3>
            <button className="text-gray-400 hover:text-gray-900 transition-colors">
               <RefreshCw size={18} />
            </button>
          </div>

          <div className="flex-1 space-y-6 overflow-y-auto pr-2">
            {[
              { name: 'Ống nhựa PVC Phi 27', stock: '5/100', avg: '12/ngày', type: 'critical' },
              { name: 'Khớp nối chữ T (Đồng)', stock: '12/50', avg: '8/ngày', type: 'warning' },
              { name: 'Băng tan chống thấm', stock: '20/200', avg: '40/ngày', type: 'warning' },
              { name: 'Van bi tay gạt rắc co', stock: '3/30', avg: '5/ngày', type: 'critical' }
            ].map((item, i) => (
              <div key={i} className="flex flex-col gap-2 p-4 rounded-2xl bg-gray-50 border border-gray-100 group hover:border-blue-200 transition-colors cursor-pointer">
                <div className="flex justify-between items-start">
                  <h4 className="text-[15px] font-bold text-gray-900 leading-tight">{item.name}</h4>
                  <span className={`px-2 py-1 text-xs font-bold rounded-lg ${item.type === 'critical' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'}`}>
                    {item.type === 'critical' ? 'Sắp hết' : 'Thấp'}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1 font-medium">
                  <span>Tồn kho: <span className="text-gray-900">{item.stock}</span></span>
                  <span>Bán TB: <span className="text-gray-900">{item.avg}</span></span>
                </div>
              </div>
            ))}
            
            <button className="w-full mt-2 py-3 border-2 border-dashed border-gray-300 text-blue-600 font-bold text-sm rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-colors">
              + Tạp Đơn Nhập Hàng (PO)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
