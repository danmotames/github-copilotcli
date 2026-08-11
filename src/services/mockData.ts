import { User, ServiceProvider, Recommendation } from '../types';
export const mockUsers: User[] = [
  { id: '1', name: 'João Silva', email: 'joao@email.com', phone: '(11) 99999-9999', apartment: '101', building: 'Torre A' },
  { id: '2', name: 'Maria Santos', email: 'maria@email.com', phone: '(11) 88888-8888', apartment: '202', building: 'Torre B' },
];
export const mockProviders: ServiceProvider[] = [
  { id: '1', name: 'Limpeza Total', category: 'limpeza', description: 'Serviço de limpeza residencial', phone: '(11) 1111-1111', rating: 4.8, reviewCount: 120 },
  { id: '2', name: 'Manutenção Rápida', category: 'manutencao', description: 'Serviços gerais de manutenção', phone: '(11) 2222-2222', rating: 4.5, reviewCount: 85 },
  { id: '3', name: 'Pintura & Acabamento', category: 'pintura', description: 'Pintura de paredes', phone: '(11) 3333-3333', rating: 4.9, reviewCount: 200 },
];
export const mockRecommendations: Recommendation[] = [
  { id: '1', providerId: '1', provider: mockProviders[0], userId: '1', user: mockUsers[0], comment: 'Excelente serviço!', rating: 5, tags: ['limpeza'], createdAt: new Date() },
  { id: '2', providerId: '2', provider: mockProviders[1], userId: '2', user: mockUsers[1], comment: 'Bom serviço!', rating: 4, tags: ['manutencao'], createdAt: new Date() },
];
export const serviceCategories = [
  { value: 'limpeza' as const, label: 'Limpeza', icon: '🧹' },
  { value: 'manutencao' as const, label: 'Manutenção', icon: '🔧' },
  { value: 'pintura' as const, label: 'Pintura', icon: '🎨' },
];
