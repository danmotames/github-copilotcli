import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, Plus, Heart, User } from 'lucide-react';

export const Navigation = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around items-center py-2 px-4 safe-area-inset-bottom">
        <NavLink 
          to="/" 
          className={({ isActive }) => `flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition-colors ${isActive ? 'text-primary-600 bg-primary-50' : 'text-gray-500 hover:text-gray-700'}`}
        >
          <Home size={22} />
          <span className="text-xs">Início</span>
        </NavLink>
        
        <NavLink 
          to="/search" 
          className={({ isActive }) => `flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition-colors ${isActive ? 'text-primary-600 bg-primary-50' : 'text-gray-500 hover:text-gray-700'}`}
        >
          <Search size={22} />
          <span className="text-xs">Buscar</span>
        </NavLink>
        
        <NavLink 
          to="/recommend" 
          className={({ isActive }) => `flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition-colors ${isActive ? 'text-primary-600 bg-primary-50' : 'text-gray-500 hover:text-gray-700'}`}
        >
          <Plus size={22} />
          <span className="text-xs">Recomendar</span>
        </NavLink>
        
        <NavLink 
          to="/favorites" 
          className={({ isActive }) => `flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition-colors ${isActive ? 'text-primary-600 bg-primary-50' : 'text-gray-500 hover:text-gray-700'}`}
        >
          <Heart size={22} />
          <span className="text-xs">Favoritos</span>
        </NavLink>
        
        <NavLink 
          to="/profile" 
          className={({ isActive }) => `flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition-colors ${isActive ? 'text-primary-600 bg-primary-50' : 'text-gray-500 hover:text-gray-700'}`}
        >
          <User size={22} />
          <span className="text-xs">Perfil</span>
        </NavLink>
      </div>
    </nav>
  );
};
