import { Plus, Search, Filter, ShoppingCart, Clock, CheckCircle, FileText } from 'lucide-react';

const PURCHASE_ORDERS = [
  { id: 'PO-2026-001', supplier: 'AquaTrek Logistics', total: 45000, date: 'Oct 12, 2026', items: 12, status: 'Draft' },
  { id: 'PO-2026-002', supplier: 'Oceanic Goods', total: 12500, date: 'Oct 11, 2026', items: 3, status: 'Pending' },
  { id: 'PO-2026-003', supplier: 'Hooli Waterways', total: 89000, date: 'Oct 10, 2026', items: 45, status: 'Completed' },
  { id: 'PO-2026-004', supplier: 'Pied Piper Pipes', total: 3200, date: 'Oct 08, 2026', items: 8, status: 'Completed' },
];

export function PurchaseOrders() {
  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'Draft': return <FileText size={16} className="text-gray-500" />;
      case 'Pending': return <Clock size={16} className="text-amber-500" />;
      case 'Completed': return <CheckCircle size={16} className="text-emerald-500" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Draft': return 'bg-gray-100 text-gray-700';
      case 'Pending': return 'bg-amber-100 text-amber-700';
      case 'Completed': return 'bg-emerald-100 text-emerald-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 h-full flex flex-col">
      <div className="flex justify-between items-end mb-8">
        <div className="relative group">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search purchase orders..." 
            className="w-80 h-11 bg-white border border-gray-200 rounded-2xl pl-10 pr-4 text-[14px] outline-none focus:border-indigo-500 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all font-medium text-gray-900"
          />
        </div>
        
        <div className="flex gap-3">
          <button className="px-4 py-2.5 rounded-2xl bg-white border border-gray-200 text-gray-700 font-bold text-sm shadow-sm hover:bg-gray-50 flex items-center gap-2 transition-colors">
            <Filter size={18} /> Filters
          </button>
          <button className="px-5 py-2.5 rounded-2xl bg-indigo-600 text-white font-bold text-sm shadow-md shadow-indigo-500/20 hover:bg-indigo-700 flex items-center gap-2 transition-colors">
            <Plus size={18} /> Create PO
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">PO Number</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Supplier</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Date</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Items</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Total Amount</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {PURCHASE_ORDERS.map((po) => (
                <tr key={po.id} className="hover:bg-gray-50/50 transition-colors group cursor-pointer">
                  <td className="py-4 px-6">
                    <span className="font-mono font-bold text-gray-900 bg-gray-100 px-2 py-1 rounded-lg text-sm">{po.id}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{po.supplier}</span>
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-500">
                    {po.date}
                  </td>
                  <td className="py-4 px-6 text-sm font-bold text-gray-700 text-right">
                    {po.items}
                  </td>
                  <td className="py-4 px-6 text-right font-bold text-gray-900">
                    ${po.total.toLocaleString()}
                  </td>
                  <td className="py-4 px-6">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold ${getStatusColor(po.status)}`}>
                      {getStatusIcon(po.status)}
                      {po.status}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
