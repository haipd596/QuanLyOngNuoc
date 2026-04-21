import { Mail, Phone, MapPin, MoreHorizontal, Truck, Search, ShieldCheck } from 'lucide-react';

const SUPPLIERS = [
  { id: 1, name: 'AquaTrek Logistics', contact: 'Richard Hendricks', email: 'rich@aquatrek.com', phone: '+1 234 567 890', compliance: 'Verified', type: 'Primary', location: 'San Francisco, US', logo: 'https://i.pravatar.cc/150?img=52' },
  { id: 2, name: 'Oceanic Goods', contact: 'Jared Dunn', email: 'jpd@oceanic.net', phone: '+1 987 654 321', compliance: 'Pending', type: 'Secondary', location: 'Seattle, US', logo: 'https://i.pravatar.cc/150?img=53' },
  { id: 3, name: 'Hooli Waterways', contact: 'Gavin Belson', email: 'gb@hooli.com', phone: '+1 555 123 456', compliance: 'Verified', type: 'Enterprise', location: 'Palo Alto, US', logo: 'https://i.pravatar.cc/150?img=54' },
  { id: 4, name: 'Pied Piper Pipes', contact: 'Dinesh Chugtai', email: 'dinesh@ppp.io', phone: '+1 444 888 999', compliance: 'Verified', type: 'Standard', location: 'San Jose, US', logo: 'https://i.pravatar.cc/150?img=55' },
];

export function Suppliers() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      <div className="flex justify-between items-center mb-8">
        <div className="relative group">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search suppliers..." 
            className="w-80 h-12 bg-white border border-gray-200 rounded-full pl-11 pr-4 text-[14px] outline-none focus:border-indigo-500 shadow-sm transition-all font-medium text-gray-900"
          />
        </div>
        
        <button className="px-6 py-2.5 rounded-full bg-gray-900 text-white font-bold text-sm shadow-md hover:bg-indigo-600 hover:shadow-indigo-500/20 flex items-center gap-2 transition-all">
          <Truck size={18} /> Add Supplier
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {SUPPLIERS.map(s => (
          <div key={s.id} className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_15px_40px_rgb(0,0,0,0.08)] transition-all group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-indigo-50/50 to-transparent" />
            
            <div className="relative flex justify-between items-start mb-6">
              <div className="flex gap-4 items-center">
                <img src={s.logo} alt={s.name} className="w-16 h-16 rounded-full ring-4 ring-white shadow-md object-cover" />
                <div>
                  <h3 className="text-lg font-bold text-gray-900 leading-tight">{s.name}</h3>
                  <p className="text-sm font-medium text-gray-500">{s.contact}</p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-900 transition-colors"><MoreHorizontal size={20} /></button>
            </div>

            <div className="relative space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm font-medium text-gray-600">
                <Mail size={16} className="text-gray-400" /> {s.email}
              </div>
              <div className="flex items-center gap-3 text-sm font-medium text-gray-600">
                <Phone size={16} className="text-gray-400" /> {s.phone}
              </div>
              <div className="flex items-center gap-3 text-sm font-medium text-gray-600">
                <MapPin size={16} className="text-gray-400" /> {s.location}
              </div>
            </div>

            <div className="relative pt-6 border-t border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Status</p>
                <div className="flex items-center gap-1.5 text-sm font-bold tracking-tight text-gray-900">
                  {s.compliance === 'Verified' ? <ShieldCheck size={16} className="text-emerald-500" /> : null}
                  {s.compliance}
                </div>
              </div>
              <div className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs font-bold ${
                s.type === 'Enterprise' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-700'
              }`}>
                {s.type}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
