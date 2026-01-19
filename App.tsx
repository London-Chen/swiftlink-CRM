import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  Plus, 
  Search, 
  Bell, 
  Menu,
  MoreVertical,
  MapPin,
  Truck,
  CheckCircle,
  Clock,
  Package,
  FileText,
  CreditCard,
  BarChart3,
  ShieldCheck,
  Building2,
  Calendar
} from 'lucide-react';
import { Customer, ViewState } from './types';
import { INITIAL_CUSTOMERS, MOCK_DRIVERS } from './constants';
import { ManualEntryModal } from './components/ManualEntryModal';

const App = () => {
  const [activeTab, setActiveTab] = useState<ViewState>('customers');
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);

  // Derived State for Dashboard
  const totalCustomers = customers.length;
  const assignedCustomers = customers.filter(c => c.status === 'assigned').length;
  const pendingCustomers = customers.filter(c => c.status === 'pending').length;
  const completedCustomers = customers.filter(c => c.status === 'completed').length;

  const handleSaveManual = (newCustomer: Customer) => {
    setCustomers(prev => [newCustomer, ...prev]);
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      
      {/* Sidebar - Enhanced for Enterprise Look */}
      <aside className="w-64 bg-slate-900 text-white hidden md:flex flex-col overflow-y-auto">
        <div className="p-6 border-b border-slate-800 sticky top-0 bg-slate-900 z-10">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-900/50">
              <Truck className="w-5 h-5 text-white" />
            </div>
            SwiftLink
          </div>
          <div className="text-xs text-slate-500 mt-1 pl-10">Enterprise CRM v2.0</div>
        </div>

        <nav className="flex-1 p-4 space-y-8">
          {/* Main Module */}
          <div className="space-y-1">
            <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Overview</p>
            <SidebarItem 
              icon={<LayoutDashboard className="w-5 h-5" />} 
              label="Dashboard" 
              isActive={activeTab === 'dashboard'} 
              onClick={() => setActiveTab('dashboard')} 
            />
            <SidebarItem 
              icon={<BarChart3 className="w-5 h-5" />} 
              label="Analytics & Reports" 
            />
          </div>

          {/* Operations Module */}
          <div className="space-y-1">
            <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Operations Center</p>
            <SidebarItem 
              icon={<Package className="w-5 h-5" />} 
              label="Order Processing" 
            />
            <SidebarItem 
              icon={<Users className="w-5 h-5" />} 
              label="Customer Mgmt" 
              isActive={activeTab === 'customers'} 
              onClick={() => setActiveTab('customers')} 
            />
            <SidebarItem 
              icon={<Truck className="w-5 h-5" />} 
              label="Fleet Logistics" 
            />
             <SidebarItem 
              icon={<MapPin className="w-5 h-5" />} 
              label="Route Planning" 
            />
          </div>

          {/* Finance Module */}
          <div className="space-y-1">
            <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Finance</p>
            <SidebarItem 
              icon={<FileText className="w-5 h-5" />} 
              label="Invoices" 
            />
            <SidebarItem 
              icon={<CreditCard className="w-5 h-5" />} 
              label="Expenses" 
            />
          </div>

          {/* Organization Module */}
          <div className="space-y-1">
            <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Organization</p>
             <SidebarItem 
              icon={<Building2 className="w-5 h-5" />} 
              label="Departments" 
            />
            <SidebarItem 
              icon={<Calendar className="w-5 h-5" />} 
              label="Shift Schedule" 
            />
          </div>

          {/* System Module */}
          <div className="space-y-1">
            <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">System</p>
            <SidebarItem 
              icon={<Settings className="w-5 h-5" />} 
              label="Global Settings" 
              isActive={activeTab === 'settings'} 
              onClick={() => setActiveTab('settings')} 
            />
            <SidebarItem 
              icon={<ShieldCheck className="w-5 h-5" />} 
              label="Audit Logs" 
            />
          </div>
        </nav>

        <div className="p-4 border-t border-slate-800 bg-slate-900 sticky bottom-0">
          <div className="bg-slate-800 rounded-lg p-3 flex items-center gap-3 hover:bg-slate-700 transition-colors cursor-pointer">
            <img src="https://picsum.photos/seed/admin/40" alt="Admin" className="w-10 h-10 rounded-full border border-slate-600" />
            <div>
              <div className="text-sm font-medium">Admin User</div>
              <div className="text-xs text-slate-400">admin@swiftlink.com</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm z-10">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-gray-500"><Menu className="w-6 h-6" /></button>
            <h1 className="text-xl font-semibold text-gray-800 capitalize flex items-center gap-2">
              {activeTab === 'customers' ? (
                <>
                  <Users className="w-5 h-5 text-gray-400" />
                  Customer Management
                </>
              ) : activeTab === 'dashboard' ? (
                <>
                  <LayoutDashboard className="w-5 h-5 text-gray-400" />
                  Executive Dashboard
                </>
              ) : 'Settings'}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Global search..." 
                className="pl-9 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 transition-all"
              />
            </div>
            <div className="h-8 w-px bg-gray-200 mx-2"></div>
            <button className="relative p-2 text-gray-400 hover:text-gray-600">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6">
          
          {/* DASHBOARD VIEW */}
          {activeTab === 'dashboard' && (
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard title="Total Customers" value={totalCustomers} icon={<Users className="text-blue-600" />} trend="+12%" />
                <StatsCard title="Pending Assignment" value={pendingCustomers} icon={<Clock className="text-orange-600" />} trend="-5%" />
                <StatsCard title="Completed Jobs" value={completedCustomers} icon={<CheckCircle className="text-green-600" />} trend="+8%" />
                <StatsCard title="Avg. Delivery Time" value="1.2 Days" icon={<Truck className="text-indigo-600" />} trend="-2%" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Activity */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Customer Additions</h3>
                  <div className="space-y-4">
                    {customers.slice(0, 5).map(customer => (
                      <div key={customer.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-100">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-blue-100 text-blue-600`}>
                            <Users className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-800">{customer.name}</div>
                            <div className="text-xs text-gray-500">{customer.company}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-xs font-semibold px-2 py-1 rounded-full inline-block ${getStatusColor(customer.status)}`}>
                            {customer.status}
                          </div>
                          <div className="text-xs text-gray-400 mt-1">{new Date(customer.timestamp).toLocaleDateString()}</div>
                        </div>
                      </div>
                    ))}
                    {customers.length === 0 && (
                      <div className="text-center py-8 text-gray-400 text-sm">No activity recorded.</div>
                    )}
                  </div>
                </div>

                {/* Driver Status */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Driver Availability</h3>
                  <div className="space-y-4">
                    {MOCK_DRIVERS.map(driver => (
                      <div key={driver.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img src={driver.avatar} alt={driver.name} className="w-8 h-8 rounded-full" />
                          <span className="text-sm font-medium text-gray-700">{driver.name}</span>
                        </div>
                        <span className={`w-2 h-2 rounded-full ${driver.status === 'available' ? 'bg-green-500' : driver.status === 'busy' ? 'bg-orange-500' : 'bg-gray-300'}`}></span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CUSTOMERS VIEW */}
          {activeTab === 'customers' && (
            <div className="max-w-7xl mx-auto h-full flex flex-col">
              
              {/* Action Bar */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Customer Management</h2>
                  <p className="text-gray-500 text-sm">Manage customer locations and driver assignments.</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setIsManualModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md font-medium"
                  >
                    <Plus className="w-4 h-4" />
                    New Customer Entry
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex-1 flex flex-col">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        <th className="px-6 py-4">Customer</th>
                        <th className="px-6 py-4">Location</th>
                        <th className="px-6 py-4">Coordinates</th>
                        <th className="px-6 py-4">Assigned Driver</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {customers.map(customer => {
                        const driver = MOCK_DRIVERS.find(d => d.id === customer.assignedDriverId);
                        return (
                          <tr key={customer.id} className="hover:bg-blue-50/30 transition-colors group">
                            <td className="px-6 py-4">
                              <div>
                                <div className="font-medium text-gray-900">{customer.name}</div>
                                <div className="text-xs text-gray-500">{customer.company}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2 text-gray-600 text-sm">
                                <MapPin className="w-4 h-4 text-gray-400" />
                                {customer.addressName}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded w-fit">
                                {Math.round(customer.location.x)}, {Math.round(customer.location.y)}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              {driver ? (
                                <div className="flex items-center gap-2">
                                  <img src={driver.avatar} alt="" className="w-6 h-6 rounded-full" />
                                  <span className="text-sm text-gray-700">{driver.name}</span>
                                </div>
                              ) : (
                                <span className="text-sm text-gray-400 italic">Unassigned</span>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(customer.status)}`}>
                                {customer.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <button className="text-gray-400 hover:text-gray-600 p-1">
                                <MoreVertical className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                      {customers.length === 0 && (
                        <tr>
                          <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                            No customers found. Click "New Customer Entry" to add one.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* SETTINGS VIEW (Placeholder) */}
          {activeTab === 'settings' && (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <Settings className="w-16 h-16 mb-4 opacity-20" />
              <h3 className="text-lg font-medium">Settings Panel</h3>
              <p>Configuration options would go here.</p>
            </div>
          )}

        </div>
      </main>

      {/* Modals */}
      <ManualEntryModal 
        isOpen={isManualModalOpen} 
        onClose={() => setIsManualModalOpen(false)} 
        onSave={handleSaveManual}
      />
    </div>
  );
};

// Helper Components

const SidebarItem = ({ icon, label, isActive, onClick }: { icon: React.ReactNode, label: string, isActive?: boolean, onClick?: () => void }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 group ${isActive ? 'bg-blue-600 text-white shadow-md shadow-blue-900/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
  >
    <div className={`transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
      {icon}
    </div>
    <span className="font-medium text-sm">{label}</span>
  </button>
);

const StatsCard = ({ title, value, icon, trend }: { title: string, value: string | number, icon: React.ReactNode, trend: string }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div>
        <p className="text-gray-500 text-sm font-medium">{title}</p>
        <h3 className="text-3xl font-bold text-gray-800 mt-1">{value}</h3>
      </div>
      <div className="p-2 bg-gray-50 rounded-lg">
        {icon}
      </div>
    </div>
    <div className="flex items-center text-xs">
      <span className={`font-medium ${trend.includes('+') ? 'text-green-600' : trend.includes('-') ? 'text-red-600' : 'text-purple-600'}`}>
        {trend}
      </span>
      <span className="text-gray-400 ml-2">from last month</span>
    </div>
  </div>
);

const getStatusColor = (status: Customer['status']) => {
  switch(status) {
    case 'assigned': return 'bg-blue-100 text-blue-800';
    case 'completed': return 'bg-green-100 text-green-800';
    case 'pending': return 'bg-orange-100 text-orange-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export default App;