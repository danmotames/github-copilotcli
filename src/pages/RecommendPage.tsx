import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Navigation } from '../components/Navigation';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Textarea } from '../components/ui/Textarea';
import { StarRating } from '../components/ui/StarRating';
import { serviceCategories } from '../services/mockData';
import { mockUsers, mockProviders } from '../services/mockData';
import { useAuthStore } from '../store/useAuthStore';
import { ChevronLeft, Search } from 'lucide-react';

export const RecommendPage = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [step, setStep] = useState(1);
  const [provider, setProvider] = useState<string>('');
  const [newProvider, setNewProvider] = useState({
    name: '',
    category: 'limpeza',
    phone: '',
    description: '',
  });
  const [recommendation, setRecommendation] = useState({
    rating: 5,
    comment: '',
    tags: '',
  });
  
  const handleSubmit = () => {
    console.log('Recomendação enviada:', { provider, newProvider, recommendation });
    navigate('/success');
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header 
        title={step === 1 ? 'Nova Recomendação' : 'Detalhes da Recomendação'} 
        onMenuClick={() => navigate(-1)}
      />
      
      <main className="p-4">
        {/* Progress */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <button onClick={() => setStep(step - 1)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors" disabled={step === 1}>
              <ChevronLeft size={20} />
            </button>
            <span className="text-sm text-gray-500">Passo {step} de 2</span>
          </div>
        </div>
        
        {/* Step 1: Select Provider */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Selecione o prestador de serviço
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                Escolha um prestador existente ou cadastre um novo
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <select 
                  value={provider} 
                  onChange={(e) => setProvider(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all appearance-none bg-white"
                >
                  <option value="">Buscar prestador existente...</option>
                  {mockProviders.map((p) => (
                    <option key={p.id} value={p.id}>{p.name} - {p.category}</option>
                  ))}
                </select>
              </div>
              
              <div className="text-center py-4">
                <span className="text-gray-400 text-sm">ou</span>
              </div>
              
              <Button 
                variant="outline" 
                onClick={() => setStep(2)}
                className="w-full"
              >
                Cadastrar novo prestador
              </Button>
            </div>
            
            {provider && (
              <div className="mt-6">
                <Button onClick={() => setStep(2)} className="w-full">
                  Continuar
                </Button>
              </div>
            )}
          </div>
        )}
        
        {/* Step 2: Recommendation Details */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                {provider ? 'Detalhes da Recomendação' : 'Cadastre o Prestador'}
              </h2>
              <p className="text-sm text-gray-500">
                {provider ? 'Compartilhe sua experiência' : 'Informe os dados do novo prestador'}
              </p>
            </div>
            
            {!provider && (
              <div className="space-y-4">
                <Input
                  label="Nome do Prestador"
                  value={newProvider.name}
                  onChange={(e) => setNewProvider({ ...newProvider, name: e.target.value })}
                  placeholder="Ex: Limpeza Total"
                />
                <Select
                  label="Categoria"
                  value={newProvider.category}
                  onChange={(e) => setNewProvider({ ...newProvider, category: e.target.value as any })}
                  options={serviceCategories.map(c => ({ value: c.value, label: c.label }))}
                />
                <Input
                  label="Telefone"
                  value={newProvider.phone}
                  onChange={(e) => setNewProvider({ ...newProvider, phone: e.target.value })}
                  placeholder="Ex: (11) 99999-9999"
                />
                <Textarea
                  label="Descrição"
                  value={newProvider.description}
                  onChange={(e) => setNewProvider({ ...newProvider, description: e.target.value })}
                  placeholder="Descreva os serviços oferecidos"
                />
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Avaliação
                </label>
                <StarRating 
                  rating={recommendation.rating} 
                  size="lg" 
                  interactive 
                  onChange={(rating) => setRecommendation({ ...recommendation, rating })}
                />
              </div>
              
              <Textarea
                label="Comentário"
                value={recommendation.comment}
                onChange={(e) => setRecommendation({ ...recommendation, comment: e.target.value })}
                placeholder="Conte sua experiência com este prestador..."
                rows={4}
              />
              
              <Input
                label="Tags (opcional)"
                value={recommendation.tags}
                onChange={(e) => setRecommendation({ ...recommendation, tags: e.target.value })}
                placeholder="Ex: rápido, barato, profissional"
                hint="Separe as tags por vírgulas"
              />
            </div>
            
            <div className="space-y-3">
              <Button onClick={handleSubmit} className="w-full">
                Enviar Recomendação
              </Button>
              <Button variant="outline" onClick={() => setStep(1)} className="w-full">
                Voltar
              </Button>
            </div>
          </div>
        )}
      </main>
      
      <Navigation />
    </div>
  );
};
