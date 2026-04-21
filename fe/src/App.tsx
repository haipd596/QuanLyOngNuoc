import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DynamicIsland } from './components/DynamicIsland';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';

import { Dashboard } from './pages/Dashboard';
import { Inventory } from './pages/Inventory';
import { BookingFlow } from './pages/BookingFlow';
import { Sales } from './pages/Sales';
import { Customers } from './pages/Customers';
import { Settings } from './pages/Settings';
import { Login } from './pages/Login';
import { Suppliers } from './pages/Suppliers';
import { PurchaseOrders } from './pages/PurchaseOrders';
import { Reports } from './pages/Reports';

const AdminLayout = ({ children, title }: { children: React.ReactNode, title: string }) => {
  return (
    <div className="min-h-screen bg-[#f4f5f9] font-sans selection:bg-blue-200 text-gray-900 flex">
      <DynamicIsland />
      <Sidebar />
      <div className="flex-1 ml-72 flex flex-col min-h-screen bg-[#f4f5f9]">
        <TopBar title={title} />
        <main className="flex-1 p-8 pb-12 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};

const UserLayout = ({ children, title }: { children: React.ReactNode, title: string }) => {
  const { logout } = useAuth();
  return (
    <div className="min-h-screen bg-[#f5f5f7] font-sans selection:bg-blue-200 text-gray-900 flex flex-col">
      <header className="sticky top-0 z-30 flex items-center justify-between px-8 py-4 bg-white/70 backdrop-blur-2xl border-b border-gray-100/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 shadow-lg shadow-blue-500/30 flex items-center justify-center shrink-0">
             <span className="text-white font-bold pb-0.5">WE</span>
          </div>
          <span className="font-bold text-lg tracking-tight text-gray-900">WaterERP Cửa Hàng</span>
        </div>
        <div>
          <h2 className="text-xl font-bold tracking-tight text-gray-900">{title}</h2>
        </div>
        <div className="flex items-center gap-4">
           <button onClick={logout} className="text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors">Đăng xuất</button>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
};

// Protected Route Guard
const PrivateRoute = ({ children, requireRole }: { children: React.ReactNode, requireRole?: 'ADMIN' | 'USER' }) => {
  const { user, token } = useAuth();

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (requireRole && user.role !== requireRole) {
    // If Admin trying to access restricted User area, could redirect.
    // Simplifying: just redirect to their main hub.
    return <Navigate to={user.role === 'ADMIN' ? '/admin' : '/'} replace />;
  }

  return <>{children}</>;
};

// Dummy page for unfurnished routes
const Placeholder = ({ title }: { title: string }) => (
  <div className="flex flex-col items-center justify-center h-[60vh] text-center animate-in fade-in duration-700">
    <div className="w-24 h-24 bg-gray-100 rounded-[2rem] flex items-center justify-center mb-6 shadow-inner">
      <span className="text-4xl">🏗️</span>
    </div>
    <h2 className="text-2xl font-bold tracking-tight text-gray-900">{title} Module</h2>
    <p className="text-gray-500 mt-2 font-medium max-w-sm">This module is under construction.</p>
  </div>
);

function AppRoutes() {
  const { token, user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={!token ? <Login /> : <Navigate to={user?.role === 'ADMIN' ? '/admin' : '/'} replace />} />
      
      {/* USER / NHÂN VIÊN BÁN HÀNG */}
      <Route path="/" element={<PrivateRoute requireRole="USER"><UserLayout title="Bán Hàng POS"><Sales /></UserLayout></PrivateRoute>} />
      
      {/* ADMIN ROUTES */}
      <Route path="/admin" element={<PrivateRoute requireRole="ADMIN"><AdminLayout title="Tổng Quan (Dashboard)"><Dashboard /></AdminLayout></PrivateRoute>} />
      <Route path="/admin/inventory" element={<PrivateRoute requireRole="ADMIN"><AdminLayout title="Quản Lý Sản Phẩm & Kho"><Inventory /></AdminLayout></PrivateRoute>} />
      <Route path="/admin/sales" element={<PrivateRoute requireRole="ADMIN"><AdminLayout title="Đơn Hàng (Sales)"><Sales /></AdminLayout></PrivateRoute>} />
      <Route path="/admin/purchase" element={<PrivateRoute requireRole="ADMIN"><AdminLayout title="Nhập Hàng (Purchase)"><PurchaseOrders /></AdminLayout></PrivateRoute>} />
      <Route path="/admin/customers" element={<PrivateRoute requireRole="ADMIN"><AdminLayout title="Khách Hàng"><Customers /></AdminLayout></PrivateRoute>} />
      <Route path="/admin/suppliers" element={<PrivateRoute requireRole="ADMIN"><AdminLayout title="Nhà Cung Cấp"><Suppliers /></AdminLayout></PrivateRoute>} />
      <Route path="/admin/reports" element={<PrivateRoute requireRole="ADMIN"><AdminLayout title="Báo Cáo & Thống Kê"><Reports /></AdminLayout></PrivateRoute>} />
      <Route path="/admin/settings" element={<PrivateRoute requireRole="ADMIN"><AdminLayout title="Cài Đặt Hệ Thống"><Settings /></AdminLayout></PrivateRoute>} />
      
      {/* Handle old routes / 404 */}
      <Route path="*" element={<Navigate to={user?.role === 'ADMIN' ? '/admin' : '/'} replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
