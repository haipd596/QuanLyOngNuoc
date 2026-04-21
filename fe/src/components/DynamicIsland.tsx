import { useState, useEffect } from 'react';
import { Bell, AlertTriangle, Package, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';

export function DynamicIsland() {
  const [state, setState] = useState<'idle' | 'notification' | 'live' | 'success'>('idle');

  useEffect(() => {
    let timer: any;
    
    // Simulate complex app states
    const sequence = async () => {
      setState('notification');
      await new Promise(r => setTimeout(r, 4000));
      setState('live');
      await new Promise(r => setTimeout(r, 5000));
      setState('success');
      await new Promise(r => setTimeout(r, 3000));
      setState('idle');
    };

    // Run sequence every 30s
    timer = setInterval(sequence, 30000);
    // Initial run
    setTimeout(sequence, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed top-3 left-1/2 -translate-x-1/2 z-[100] flex justify-center w-full max-w-xl px-4 pointer-events-none">
      <div 
        className={cn(
          "pointer-events-auto bg-black text-white rounded-[40px] shadow-2xl overflow-hidden transition-all duration-[600ms] ease-[cubic-bezier(0.175,0.885,0.32,1.275)] backdrop-blur-3xl",
          state === 'idle' ? 'w-[140px] h-[38px]' : 
          state === 'notification' ? 'w-[360px] h-[76px]' : 
          state === 'live' ? 'w-[280px] h-[54px]' :
          'w-[200px] h-[48px]' // success
        )}
      >
        <div className="relative w-full h-full p-2 flex items-center justify-between">
          
          {/* Idle State */}
          <div className={cn("absolute inset-0 flex items-center justify-between px-4 transition-opacity duration-300", state === 'idle' ? 'opacity-100 delay-200' : 'opacity-0 pointer-events-none')}>
             <div className="flex items-center gap-2">
               <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
               <span className="text-xs font-semibold tracking-wider text-gray-300">SYS_OK</span>
             </div>
             <Bell size={14} className="text-gray-400" />
          </div>

          {/* Notification State */}
          <div className={cn("absolute inset-0 flex items-center px-4 gap-4 transition-opacity duration-300", state === 'notification' ? 'opacity-100 delay-200' : 'opacity-0 pointer-events-none')}>
             <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shrink-0 shadow-inner">
               <AlertTriangle size={22} className="text-white" />
             </div>
             <div className="flex flex-col overflow-hidden">
               <span className="text-[15px] font-semibold whitespace-nowrap text-white leading-tight">Low Stock Alert</span>
               <span className="text-[13px] text-gray-400 whitespace-nowrap truncate leading-tight mt-0.5">PVC Pipe 20mm (10 items left)</span>
             </div>
          </div>

          {/* Live State (Processing) */}
          <div className={cn("absolute inset-0 flex items-center px-4 gap-3 justify-between transition-opacity duration-300", state === 'live' ? 'opacity-100 delay-200' : 'opacity-0 pointer-events-none')}>
             <div className="flex items-center gap-2.5">
               <Package size={18} className="text-blue-400" />
               <span className="text-[14px] font-semibold text-gray-200">Processing PO-294</span>
             </div>
             <div className="flex gap-1 items-center">
                <span className="w-1.5 h-3 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0ms'}} />
                <span className="w-1.5 h-4 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '100ms'}} />
                <span className="w-1.5 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '200ms'}} />
             </div>
          </div>

          {/* Success State */}
          <div className={cn("absolute inset-0 flex items-center justify-center gap-2 transition-opacity duration-300", state === 'success' ? 'opacity-100 delay-200' : 'opacity-0 pointer-events-none')}>
             <CheckCircle2 size={20} className="text-emerald-400" />
             <span className="text-[14px] font-semibold text-emerald-50">Task Completed</span>
          </div>

        </div>
      </div>
    </div>
  );
}
