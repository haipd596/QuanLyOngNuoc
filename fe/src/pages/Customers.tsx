import { Mail, Phone, MapPin, MoreHorizontal, UserPlus, Search, Star } from 'lucide-react';

const CUSTOMERS = [
  { id: 1, name: 'Acme Corporation', contact: 'Emma Watson', email: 'emma@acme.com', phone: '+1 234 567 890', spent: 125400, type: 'VIP', location: 'New York, US', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: 2, name: 'Stark Industries', contact: 'Tony Stark', email: 'tony@stark.com', phone: '+1 987 654 321', spent: 89000, type: 'Premium', location: 'California, US', avatar: 'https://i.pravatar.cc/150?img=11' },
  { id: 3, name: 'Wayne Enterprises', contact: 'Bruce Wayne', email: 'bruce@wayne.com', phone: '+1 555 123 456', spent: 45000, type: 'Standard', location: 'Gotham, US', avatar: 'https://i.pravatar.cc/150?img=12' },
  { id: 4, name: 'Globex Corp', contact: 'Hank Scorpio', email: 'hank@globex.com', phone: '+1 444 888 999', spent: 12000, type: 'Standard', location: 'Cyprus, EU', avatar: 'https://i.pravatar.cc/150?img=33' },
];

export function Customers() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      <div className="flex justify-between items-center mb-8">
        <div className="relative group">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search customers..." 
            className="w-80 h-12 bg-white border border-gray-200 rounded-full pl-11 pr-4 text-[14px] outline-none focus:border-blue-500 shadow-sm transition-all font-medium text-gray-900"
          />
        </div>
        
        <button className="px-6 py-2.5 rounded-full bg-gray-900 text-white font-bold text-sm shadow-md hover:bg-blue-600 hover:shadow-blue-500/20 flex items-center gap-2 transition-all">
          <UserPlus size={18} /> Add Customer
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {CUSTOMERS.map(c => (
          <div key={c.id} className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_15px_40px_rgb(0,0,0,0.08)] transition-all group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-blue-50/50 to-transparent" />
            
            <div className="relative flex justify-between items-start mb-6">
              <div className="flex gap-4 items-center">
                <img src={c.avatar} alt={c.name} className="w-16 h-16 rounded-full ring-4 ring-white shadow-md object-cover" />
                <div>
                  <h3 className="text-lg font-bold text-gray-900 leading-tight">{c.name}</h3>
                  <p className="text-sm font-medium text-gray-500">{c.contact}</p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-900 transition-colors"><MoreHorizontal size={20} /></button>
            </div>

            <div className="relative space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm font-medium text-gray-600">
                <Mail size={16} className="text-gray-400" /> {c.email}
              </div>
              <div className="flex items-center gap-3 text-sm font-medium text-gray-600">
                <Phone size={16} className="text-gray-400" /> {c.phone}
              </div>
              <div className="flex items-center gap-3 text-sm font-medium text-gray-600">
                <MapPin size={16} className="text-gray-400" /> {c.location}
              </div>
            </div>

            <div className="relative pt-6 border-t border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Total Spent</p>
                <p className="text-xl font-bold tracking-tight text-gray-900">${c.spent.toLocaleString()}</p>
              </div>
              <div className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs font-bold ${
                c.type === 'VIP' ? 'bg-amber-100 text-amber-700' : 'bg-blue-50 text-blue-600'
              }`}>
                {c.type === 'VIP' && <Star size={12} className="fill-amber-700" />}
                {c.type}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
