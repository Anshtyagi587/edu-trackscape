
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Bell, Search, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuGroup, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

const DashboardHeader = () => {
  const { user, logout } = useAuth();
  
  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center px-4 sticky top-0 z-30">
      <div className="flex items-center w-full justify-between">
        <div className="relative flex items-center md:w-64">
          <Search className="absolute left-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-edu-blue focus:border-edu-blue"
          />
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" className="rounded-full relative">
            <Bell size={20} />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500" />
          </Button>
          
          <Button variant="ghost" size="icon" className="rounded-full relative">
            <MessageSquare size={20} />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="p-0 h-auto bg-transparent">
                <div className="flex items-center">
                  <img
                    src={user?.avatar || 'https://i.pravatar.cc/150?img=1'}
                    alt="Profile"
                    className="h-8 w-8 rounded-full"
                  />
                  <span className="hidden md:block ml-2 text-sm font-medium">
                    {user?.name || 'User'}
                  </span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Help & Support
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
