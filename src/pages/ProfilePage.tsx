import React from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { mockUsers, mockRecommendations } from '../services/mockData';
import { Header } from '../components/Header';
import { Navigation } from '../components/Navigation';
import { Avatar } from '../components/ui/Avatar';
import { RecommendationCard } from '../components/RecommendationCard';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { Settings, LogOut, UserPlus, Heart, Star } from 'lucide-react';

export const ProfilePage = () => {
  const { user, logout } = useAuthStore();
  const currentUser = user || mockUsers[0];
  const userRecommendations = mockRecommendations.filter(r => r.userId === currentUser.id);
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title="Perfil" />
      
      <main className="p-4">
        {/* Profile Header */}
        <div className="text-center mb-8">
          <Avatar src={currentUser.avatar} name={currentUser.name} size="xl" className="mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900">{currentUser.name}</h2>
          <p className="text-gray-500">{currentUser.apartment} - {currentUser.building}</p>
          <p className="text-sm text-gray-400 mt-1">{currentUser.email}</p>
        </div>
        
        {/* Stats */}
        <div className="flex justify-around mb-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{userRecommendations.length}</div>
            <div className="text-sm text-gray-500">Recomendações</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">12</div>
            <div className="text-sm text-gray-500">Favoritos</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">4.8</div>
            <div className="text-sm text-gray-500">Avaliação</div>
          </div>
        </div>
        
        {/* My Recommendations */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Minhas Recomendações</h3>
            <Link to="/recommend" className="text-sm text-primary-600 font-medium">Nova</Link>
          </div>
          {userRecommendations.length > 0 ? (
            <div className="space-y-4">
              {userRecommendations.slice(0, 3).map((rec) => (
                <RecommendationCard key={rec.id} recommendation={rec} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>Você ainda não fez nenhuma recomendação</p>
              <Link to="/recommend" className="text-primary-600 font-medium mt-2 inline-block">
                Recomendar um prestador
              </Link>
            </div>
          )}
        </div>
        
        {/* Actions */}
        <div className="space-y-3">
          <Link to="/settings" className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <Settings className="text-gray-500" size={20} />
            <span className="font-medium text-gray-700">Configurações</span>
          </Link>
          <Link to="/invite" className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <UserPlus className="text-gray-500" size={20} />
            <span className="font-medium text-gray-700">Convidar Vizinhos</span>
          </Link>
          <Button variant="outline" onClick={logout} className="w-full flex items-center justify-center gap-3">
            <LogOut className="text-red-500" size={20} />
            <span className="font-medium text-red-500">Sair</span>
          </Button>
        </div>
      </main>
      
      <Navigation />
    </div>
  );
};
