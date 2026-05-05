import React from 'react';
import { 
  Monitor, Users, Map, FileText, Clock, AlertTriangle, 
  FileInput, Box, BarChart2, Bell, Activity, Settings 
} from 'lucide-react';
import SidebarMenu from './SidebarMenu';
import TargetWidget from './TargetWidget';

const menuItems = [
  { label: 'Dashboard', icon: Monitor, path: '/dashboard' },
  { 
    label: 'CRM', 
    icon: Users, 
    path: '/crm',
    subMenu: [
      { label: 'Customers', path: '/crm/customers' },
      { label: 'Leads', path: '/crm/leads' }
    ]
  },
  { label: 'Pipeline', icon: Map, path: '/pipeline' },
  { label: 'Quotation', icon: FileText, path: '/quotation' },
  { label: 'Presentation', icon: Monitor, path: '/presentation' },
  { label: 'Timeline (Instalasi)', icon: Clock, path: '/timeline' },
  { label: 'Trouble Ticket', icon: AlertTriangle, path: '/tickets' },
  { label: 'Invoices', icon: FileInput, path: '/invoices' },
  { label: 'Products & Services', icon: Box, path: '/products' },
  { 
    label: 'Reports', 
    icon: BarChart2, 
    path: '/reports',
    subMenu: [
      { label: 'Overview', path: '/reports/overview' },
      { label: 'Sales Performance', path: '/reports/sales' },
      { label: 'Product Performance', path: '/reports/products' },
      { label: 'Pipeline Report', path: '/reports/pipeline' },
      { label: 'Conversion Report', path: '/reports/conversion' }
    ]
  },
  { label: 'Notifications', icon: Bell, path: '/notifications' },
  { label: 'Activity Logs', icon: Activity, path: '/activities' },
  { 
    label: 'Settings', 
    icon: Settings, 
    path: '/settings',
    subMenu: [
      { label: 'General', path: '/settings/general' },
      { label: 'Users', path: '/settings/users' },
      { label: 'Roles', path: '/settings/roles' }
    ]
  }
];

const Sidebar = ({ isCollapsed }) => {
  return (
    <aside className={`bg-white border-r border-gray-200 flex flex-col justify-between overflow-y-auto transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div>
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8 shrink-0">
              <div className="absolute top-0 left-0 w-6 h-6 bg-orange-500 rounded-tl-lg rounded-br-lg transform rotate-45 shadow-sm"></div>
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-blue-900 rounded-tl-lg rounded-br-lg transform rotate-45 shadow-sm"></div>
            </div>
            {!isCollapsed && (
              <span className="text-xl font-bold text-gray-800 tracking-tight ml-1">
                Mark<span className="text-orange-500">.</span>
              </span>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {menuItems.map((item, index) => (
            <SidebarMenu key={index} item={item} isCollapsed={isCollapsed} />
          ))}
        </nav>
      </div>

      {/* Target Widget */}
      <TargetWidget isCollapsed={isCollapsed} />
    </aside>
  );
};

export default Sidebar;
