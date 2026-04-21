import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, PackageSearch, Users, Briefcase, 
  Settings, LineChart, FileText, Activity, LogOut 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/utils';

const navGroups = [
  {
    title: 'Tổng quan (Overview)',
    items: [
      { name: 'Bảng Điều Khiển (Dashboard)', path: '/admin', icon: LayoutDashboard },
      { name: 'Báo Cáo & Thống Kê', path: '/admin/reports', icon: LineChart },
    ]
  },
  {
    title: 'Nghiệp Vụ (Operations)',
    items: [
      { name: 'Bán Hàng (POS)', path: '/admin/sales', icon: FileText },
      { name: 'Quản Lý Kho Vật Tư', path: '/admin/inventory', icon: PackageSearch },
      { name: 'Phiếu Nhập Hàng', path: '/admin/purchase', icon: Briefcase },
    ]
  },
  {
    title: 'Đối Tác (Partners)',
    items: [
      { name: 'Khách Hàng', path: '/admin/customers', icon: Users },
      { name: 'Nhà Cung Cấp', path: '/admin/suppliers', icon: Users },
    ]
  }
];

export function Sidebar() {
  const { user, logout } = useAuth();

  return (
    <aside className="w-72 shrink-0 bg-white/70 backdrop-blur-2xl border-r border-[#e5e5ea] flex flex-col h-screen fixed left-0 top-0 pt-6 pb-8 transition-transform z-40">
      <div className="flex items-center gap-3 px-8 mb-8 pb-4 border-b border-gray-100">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 shadow-lg shadow-blue-500/30 flex items-center justify-center shrink-0">
          <Activity className="text-white" size={20} />
        </div>
        <div>
          <h1 className="font-bold text-lg tracking-tight text-gray-900 leading-none">WaterERP</h1>
          <p className="text-xs text-blue-500 font-bold mt-1 uppercase tracking-wider">Hệ Thống Phân Phối</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 space-y-8 scrollbar-hide">
        {navGroups.map((group, idx) => (
          <div key={idx}>
            <h3 className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">
              {group.title}
            </h3>
            <div className="space-y-1">
              {group.items.map((item, i) => (
                <NavLink
                  key={i}
                  to={item.path}
                  className={({ isActive }) => cn(
                    "flex items-center gap-3.5 px-4 py-2.5 rounded-2xl text-[15px] font-medium transition-all group",
                    isActive 
                      ? "bg-blue-600 shadow-md shadow-blue-600/20 text-white" 
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  )}
                >
                  {({ isActive }) => (
                    <>
                      <item.icon size={20} className={cn("transition-colors", isActive ? "text-white" : "text-gray-400 group-hover:text-gray-600")} strokeWidth={isActive ? 2.5 : 2} />
                      {item.name}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="px-4 mt-auto pt-6 border-t border-gray-100">
        <NavLink to="/admin/settings" className={({ isActive }) => cn(
            "flex items-center gap-3 px-4 py-3 rounded-2xl text-[15px] font-medium transition-all group",
            isActive ? "bg-blue-600 text-white shadow-md shadow-blue-600/20" : "text-gray-600 hover:bg-gray-100"
          )}>
          <Settings size={20} className="text-gray-400 group-hover:text-gray-600" />
          Settings & Admin
        </NavLink>
        
        <div className="mt-4 px-4 py-3 bg-gray-50 rounded-2xl flex items-center justify-between cursor-pointer border border-gray-100 hover:border-gray-200 transition-colors group">
           <div className="flex items-center gap-3">
             <img src={user?.avatar || "https://i.pravatar.cc/150?img=11"} alt="avatar" className="w-10 h-10 rounded-full ring-2 ring-white shadow-sm" />
             <div className="flex flex-col">
               <span className="text-sm font-bold text-gray-900">{user?.name || 'User'}</span>
               <span className="text-xs text-gray-500 font-medium">{user?.role === 'ADMIN' ? 'System Admin' : 'User'}</span>
             </div>
           </div>
           <button 
             onClick={logout} 
             title="Log Out"
             className="w-8 h-8 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-red-500 hover:bg-red-50 hover:border-red-100 transition-colors shrink-0"
           >
             <LogOut size={16} />
           </button>
        </div>
      </div>
    </aside>
  );
}
