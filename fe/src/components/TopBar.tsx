import { Bell, Search } from 'lucide-react';

export function TopBar({ title }: { title: string }) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-8 py-5 bg-white/70 backdrop-blur-2xl border-b border-gray-100/50">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">{title}</h2>
        <p className="text-sm font-medium text-gray-500">Welcome back, everything looks good today.</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative group hidden md:block">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search anything (⌘K)" 
            className="w-64 h-11 bg-gray-100/80 hover:bg-gray-100 focus:bg-white rounded-2xl pl-10 pr-4 text-[15px] outline-none border border-transparent focus:border-blue-500 shadow-sm focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)] transition-all font-medium text-gray-800 placeholder-gray-400"
          />
        </div>
        <button className="relative w-11 h-11 rounded-2xl bg-gray-100/80 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors">
          <Bell size={20} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-red-500 border border-white" />
        </button>
      </div>
    </header>
  );
}
