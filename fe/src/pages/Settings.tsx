import { useState } from 'react';
import { User, Shield, Bell, Lock, Globe, Database, Smartphone, Webhook, ChevronRight, Settings as SettingsIcon } from 'lucide-react';
import { cn } from '../lib/utils';

const SETTINGS_SECTIONS = [
  {
    title: 'General',
    items: [
      { id: 'profile', icon: User, label: 'Profile Information', desc: 'Update your account details', color: 'bg-blue-500' },
      { id: 'security', icon: Lock, label: 'Password & Security', desc: 'Manage 2FA and passwords', color: 'bg-gray-500' },
      { id: 'notifications', icon: Bell, label: 'Notifications', desc: 'Email and push alerts', color: 'bg-red-500' },
    ]
  },
  {
    title: 'System Preferences',
    items: [
      { id: 'localization', icon: Globe, label: 'Language & Region', desc: 'English (US), USD ($)', color: 'bg-indigo-500' },
      { id: 'mobile', icon: Smartphone, label: 'Mobile Devices', desc: 'Manage connected apps', color: 'bg-emerald-500' },
    ]
  },
  {
    title: 'Advanced',
    items: [
      { id: 'api', icon: Webhook, label: 'API Keys', desc: 'Developer integrations', color: 'bg-purple-500' },
      { id: 'backup', icon: Database, label: 'Data Backups', desc: 'Last backup: 2 hours ago', color: 'bg-teal-500' },
      { id: 'roles', icon: Shield, label: 'Roles & Permissions', desc: 'Manage team access', color: 'bg-amber-500' },
    ]
  }
];

export function Settings() {
  const [activeTab, setActiveTab] = useState('profile');

  // iOS Style Toggle Component
  const Toggle = ({ defaultChecked }: { defaultChecked?: boolean }) => {
    const [isOn, setIsOn] = useState(defaultChecked || false);
    return (
      <button 
        onClick={() => setIsOn(!isOn)}
        className={cn(
          "w-12 h-6 rounded-full transition-colors duration-300 relative",
          isOn ? "bg-emerald-500" : "bg-gray-300"
        )}
      >
        <span className={cn(
          "absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-300 shadow-sm",
          isOn ? "translate-x-6" : "translate-x-0"
        )} />
      </button>
    );
  };

  return (
    <div className="flex gap-8 max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Settings Navigation */}
      <div className="w-80 shrink-0 space-y-8 h-[calc(100vh-140px)] overflow-y-auto pr-4 scrollbar-hide">
        {SETTINGS_SECTIONS.map(section => (
          <div key={section.title}>
            <h3 className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">{section.title}</h3>
            <div className="bg-white rounded-[1.5rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden">
              {section.items.map((item, i) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={cn(
                    "w-full flex items-center gap-4 p-4 text-left transition-colors relative",
                    activeTab === item.id ? "bg-gray-50/80" : "hover:bg-gray-50/50",
                    i !== section.items.length - 1 && "border-b border-gray-100"
                  )}
                >
                  <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-sm text-white", item.color)}>
                    <item.icon size={16} />
                  </div>
                  <div className="flex-1">
                    <h4 className={cn("text-sm font-bold", activeTab === item.id ? "text-gray-900" : "text-gray-700")}>{item.label}</h4>
                  </div>
                  <ChevronRight size={16} className="text-gray-300" />
                  
                  {/* Highlight indicator */}
                  {activeTab === item.id && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-r-full" />
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Settings Content Area */}
      <div className="flex-1 bg-white rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] p-10 h-[calc(100vh-140px)] overflow-y-auto scrollbar-hide">
        
        {/* Profile Settings Content (Mock) */}
        {activeTab === 'profile' && (
          <div className="animate-in fade-in duration-500 space-y-8">
            <div className="border-b border-gray-100 pb-6 mb-8">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">Profile Information</h2>
              <p className="text-sm font-medium text-gray-500 mt-1">Manage your public information and avatar.</p>
            </div>

            <div className="flex gap-6 items-center">
              <img src="https://i.pravatar.cc/150?img=11" alt="avatar" className="w-24 h-24 rounded-full ring-4 ring-gray-50 shadow-md" />
              <div>
                <button className="px-5 py-2 bg-gray-900 text-white font-bold text-sm rounded-xl mr-3 hover:bg-gray-800 transition-colors">Change Photo</button>
                <button className="px-5 py-2 bg-gray-100 text-gray-700 font-bold text-sm rounded-xl hover:bg-gray-200 transition-colors">Remove</button>
              </div>
            </div>

            <div className="space-y-5 max-w-lg">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-blue-500 transition-colors focus:bg-white" defaultValue="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                <input type="email" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-blue-500 transition-colors focus:bg-white" defaultValue="john.doe@aquaflow.com" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Job Title</label>
                <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-blue-500 transition-colors focus:bg-white" defaultValue="System Administrator" />
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100">
               <button className="px-8 py-3 bg-blue-600 text-white font-bold text-sm rounded-xl shadow-md shadow-blue-500/20 hover:bg-blue-700 transition-colors">Save Changes</button>
            </div>
          </div>
        )}

        {/* Notifications Content (Mock) */}
        {activeTab === 'notifications' && (
          <div className="animate-in fade-in duration-500 space-y-8">
            <div className="border-b border-gray-100 pb-6 mb-8">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">Notifications</h2>
              <p className="text-sm font-medium text-gray-500 mt-1">Control how you receive alerts and emails.</p>
            </div>

            <div className="space-y-6 max-w-xl">
              <div className="flex items-center justify-between p-5 bg-gray-50/50 border border-gray-100 rounded-2xl">
                <div>
                  <h4 className="font-bold text-gray-900">System Alerts</h4>
                  <p className="text-sm font-medium text-gray-500 mt-1">Receive alerts for critical system failures</p>
                </div>
                <Toggle defaultChecked={true} />
              </div>

              <div className="flex items-center justify-between p-5 bg-gray-50/50 border border-gray-100 rounded-2xl">
                <div>
                  <h4 className="font-bold text-gray-900">New Orders</h4>
                  <p className="text-sm font-medium text-gray-500 mt-1">Notify me when a new sales order is created</p>
                </div>
                <Toggle defaultChecked={true} />
              </div>

              <div className="flex items-center justify-between p-5 bg-gray-50/50 border border-gray-100 rounded-2xl">
                <div>
                  <h4 className="font-bold text-gray-900">Marketing & News</h4>
                  <p className="text-sm font-medium text-gray-500 mt-1">Product updates and promotional materials</p>
                </div>
                <Toggle defaultChecked={false} />
              </div>
            </div>
          </div>
        )}

        {/* Catch-all for other tabs */}
        {activeTab !== 'profile' && activeTab !== 'notifications' && (
          <div className="animate-in fade-in duration-500 flex flex-col items-center justify-center h-full text-center pb-20">
            <div className="w-20 h-20 bg-gray-50 rounded-[2rem] flex items-center justify-center mb-4 border border-gray-100">
               <SettingsIcon size={32} className="text-gray-400 rotate-45" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">Coming Soon</h3>
            <p className="text-sm font-medium text-gray-500">This settings module is being configured.</p>
          </div>
        )}
      </div>

    </div>
  );
}
