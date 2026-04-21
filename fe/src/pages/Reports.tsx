import { TrendingUp, DollarSign, Package, Users, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export function Reports() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-6">
      
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Analytics Overview</h2>
          <p className="text-sm font-medium text-gray-500 mt-1">Track your business performance</p>
        </div>
        <select className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-700 outline-none hover:border-gray-300 transition-colors cursor-pointer shadow-sm">
          <option>Last 30 Days</option>
          <option>Last 7 Days</option>
          <option>This Year</option>
        </select>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-lg hover:-translate-y-1 transition-all group">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
              <DollarSign size={24} />
            </div>
            <div className="flex items-center gap-1 text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg text-xs font-bold">
              <ArrowUpRight size={14} /> +12.5%
            </div>
          </div>
          <div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Total Revenue</p>
            <h3 className="text-3xl font-black tracking-tight text-gray-900">$124,500</h3>
          </div>
        </div>

        <div className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-lg hover:-translate-y-1 transition-all group">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all">
              <Package size={24} />
            </div>
            <div className="flex items-center gap-1 text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg text-xs font-bold">
              <ArrowUpRight size={14} /> +8.2%
            </div>
          </div>
          <div>
             <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Total Orders</p>
             <h3 className="text-3xl font-black tracking-tight text-gray-900">842</h3>
          </div>
        </div>

        <div className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-lg hover:-translate-y-1 transition-all group">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 group-hover:scale-110 group-hover:bg-amber-600 group-hover:text-white transition-all">
               <TrendingUp size={24} />
            </div>
            <div className="flex items-center gap-1 text-rose-500 bg-rose-50 px-2 py-1 rounded-lg text-xs font-bold">
              <ArrowDownRight size={14} /> -2.4%
            </div>
          </div>
          <div>
             <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Conversion Rate</p>
             <h3 className="text-3xl font-black tracking-tight text-gray-900">3.2%</h3>
          </div>
        </div>

        <div className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-lg hover:-translate-y-1 transition-all group">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all">
              <Users size={24} />
            </div>
            <div className="flex items-center gap-1 text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg text-xs font-bold">
               <ArrowUpRight size={14} /> +18.7%
            </div>
          </div>
          <div>
             <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">New Customers</p>
             <h3 className="text-3xl font-black tracking-tight text-gray-900">1,249</h3>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)]">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-bold text-gray-900">Revenue Overview</h3>
          </div>
          <div className="h-64 flex items-end gap-3 justify-between">
             {/* Mock CSS Bar Chart */}
             {[40, 60, 45, 80, 50, 90, 75, 100, 60, 85, 70, 95].map((height, i) => (
                <div key={i} className="w-full bg-blue-50 rounded-t-lg relative group">
                   <div 
                     className="absolute bottom-0 w-full bg-gradient-to-t from-blue-600 to-cyan-400 rounded-t-lg transition-all duration-500 group-hover:opacity-80"
                     style={{ height: `${height}%` }}
                   />
                   {/* Tooltip */}
                   <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs font-bold py-1 px-2 rounded-lg pointer-events-none transition-opacity">
                     ${height * 100}
                   </div>
                </div>
             ))}
          </div>
          <div className="flex justify-between mt-4 text-xs font-bold text-gray-400 uppercase">
             <span>Jan</span>
             <span>Feb</span>
             <span>Mar</span>
             <span>Apr</span>
             <span>May</span>
             <span>Jun</span>
             <span>Jul</span>
             <span>Aug</span>
             <span>Sep</span>
             <span>Oct</span>
             <span>Nov</span>
             <span>Dec</span>
          </div>
        </div>

        <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)]">
           <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-900">Top Categories</h3>
           </div>
           <div className="space-y-6 flex-1 mt-4">
              {/* Mock horizontal bars */}
              {[
                { name: 'Pipes & Fittings', value: 75, color: 'from-blue-500 to-cyan-400' },
                { name: 'Water Pumps', value: 45, color: 'from-indigo-500 to-purple-400' },
                { name: 'Valves & Controls', value: 30, color: 'from-emerald-500 to-teal-400' },
                { name: 'Filtration Systems', value: 60, color: 'from-amber-500 to-orange-400' },
              ].map((cat, i) => (
                 <div key={i}>
                    <div className="flex justify-between text-sm font-bold text-gray-700 mb-2">
                       <span>{cat.name}</span>
                       <span className="text-gray-900">{cat.value}%</span>
                    </div>
                    <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                       <div 
                         className={`h-full bg-gradient-to-r ${cat.color} rounded-full`}
                         style={{ width: `${cat.value}%` }}
                       />
                    </div>
                 </div>
              ))}
           </div>
        </div>
      </div>
      
    </div>
  );
}
