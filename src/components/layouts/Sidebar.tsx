
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  BookOpen,
  LayoutDashboard,
  GraduationCap,
  FileQuestion,
  Video,
  MessageSquare,
  Bell,
  Settings,
  Users,
  BookOpenText,
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  isActive: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  href,
  isActive
}) => {
  return (
    <Link
      to={href}
      className={cn(
        'flex items-center p-3 rounded-lg text-sm font-medium transition-colors',
        isActive
          ? 'bg-edu-blue text-white'
          : 'text-gray-700 hover:bg-edu-blue/10 hover:text-edu-blue'
      )}
    >
      <span className="mr-3">{icon}</span>
      {label}
    </Link>
  );
};

const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = React.useState(false);

  const role = user?.role || 'student';

  const studentLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { href: '/courses', label: 'Courses', icon: <BookOpenText size={20} /> },
    { href: '/quizzes', label: 'Quizzes', icon: <FileQuestion size={20} /> },
    { href: '/videos', label: 'Videos', icon: <Video size={20} /> },
    { href: '/forum', label: 'Forum', icon: <MessageSquare size={20} /> },
    { href: '/notifications', label: 'Notifications', icon: <Bell size={20} /> },
    { href: '/profile', label: 'Profile', icon: <User size={20} /> },
  ];

  const teacherLinks = [
    { href: '/teacher', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { href: '/teacher/students', label: 'Students', icon: <Users size={20} /> },
    { href: '/teacher/quizzes', label: 'Quizzes', icon: <FileQuestion size={20} /> },
    { href: '/teacher/videos', label: 'Videos', icon: <Video size={20} /> },
    { href: '/teacher/forum', label: 'Forum', icon: <MessageSquare size={20} /> },
    { href: '/profile', label: 'Profile', icon: <User size={20} /> },
  ];

  const adminLinks = [
    { href: '/admin', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { href: '/admin/users', label: 'Users', icon: <Users size={20} /> },
    { href: '/admin/courses', label: 'Courses', icon: <BookOpenText size={20} /> },
    { href: '/admin/quizzes', label: 'Quizzes', icon: <FileQuestion size={20} /> },
    { href: '/admin/videos', label: 'Videos', icon: <Video size={20} /> },
    { href: '/admin/settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  const links = role === 'student' ? studentLinks : role === 'teacher' ? teacherLinks : adminLinks;

  return (
    <div className={cn(
      'h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-300',
      collapsed ? 'w-16' : 'w-64'
    )}>
      <div className="flex items-center p-4 border-b border-gray-200">
        <BookOpen className="h-8 w-8 text-edu-blue flex-shrink-0" />
        {!collapsed && (
          <span className="ml-2 text-xl font-bold text-gray-900">EduTrack</span>
        )}
        <button 
          className="ml-auto text-gray-500 hover:text-edu-blue"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? '→' : '←'}
        </button>
      </div>
      
      <div className="p-4 flex-grow overflow-y-auto">
        <nav className="space-y-1">
          {links.map((link) => (
            <SidebarItem
              key={link.href}
              icon={link.icon}
              label={collapsed ? '' : link.label}
              href={link.href}
              isActive={location.pathname === link.href}
            />
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t border-gray-200">
        {!collapsed && user && (
          <div className="flex items-center mb-4">
            <img
              src={user.avatar || 'https://i.pravatar.cc/150?img=1'}
              alt="Profile"
              className="h-10 w-10 rounded-full"
            />
            <div className="ml-3">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user.role}</p>
            </div>
          </div>
        )}
        
        <Link
          to="/settings"
          className={cn(
            'flex items-center p-3 rounded-lg text-sm font-medium transition-colors',
            location.pathname === '/settings'
              ? 'bg-edu-blue text-white'
              : 'text-gray-700 hover:bg-edu-blue/10 hover:text-edu-blue'
          )}
        >
          <span className="mr-3"><Settings size={20} /></span>
          {!collapsed && 'Settings'}
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
