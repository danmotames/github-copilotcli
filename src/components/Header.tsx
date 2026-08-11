import React from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Avatar } from './ui/Avatar';
import { Bell, Menu } from 'lucide-react';

export const Header = ({ title, onMenuClick }: { title: string; onMenuClick?: () => void }) => {
  const { user } = useAuthStore();
  
  return (
    <header className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
      <div className="flex items-center gap-3">
        {onMenuClick && (
          <button onClick={onMenuClick} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Menu size={24} />
          </button>
        )}
        <h1 className="text-xl font-bold text-gray-900">{title}</h1>
      </div>
      <div className="flex items-center gap-3">
        <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
          <Bell size={24} />
          <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full"></span>
        </button>
        {user && (
          <Avatar src={user.avatar} name={user.name} size="md" />
        )}
      </div>
    </header>
  );
};
