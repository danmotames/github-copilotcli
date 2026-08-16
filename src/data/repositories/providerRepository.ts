import { ServiceCategory, ServiceProvider, Recommendation } from '../../core/types';

export interface ServiceCategoryConfig {
  value: ServiceCategory;
  label: string;
  icon: string;
}

export interface ProviderRepository {
  getProviders(): Promise<ServiceProvider[]>;
  getRecommendations(): Promise<Recommendation[]>;
  getCategories(): Promise<ServiceCategoryConfig[]>;
}

const mockUsers = [
  { id: '1', name: 'João Silva', email: 'joao@email.com', phone: '(11) 99999-9999', apartment: '101', building: 'Torre A' },
  { id: '2', name: 'Maria Santos', email: 'maria@email.com', phone: '(11) 88888-8888', apartment: '202', building: 'Torre B' },
];

const mockProviders: ServiceProvider[] = [
  { id: '1', name: 'Limpeza Total', category: 'limpeza', description: 'Serviço de limpeza residencial', phone: '(11) 1111-1111', rating: 4.8, reviewCount: 120 },
  { id: '2', name: 'Manutenção Rápida', category: 'manutencao', description: 'Serviços gerais de manutenção', phone: '(11) 2222-2222', rating: 4.5, reviewCount: 85 },
  { id: '3', name: 'Pintura & Acabamento', category: 'pintura', description: 'Pintura de paredes e acabamento', phone: '(11) 3333-3333', rating: 4.9, reviewCount: 200 },
  { id: '4', name: 'Reforma Express', category: 'reforma', description: 'Reformas rápidas e eficientes', phone: '(11) 4444-4444', rating: 4.3, reviewCount: 60 },
  { id: '5', name: 'Verde Jardins', category: 'jardinagem', description: 'Cuidado e paisagismo de jardins', phone: '(11) 5555-5555', rating: 4.6, reviewCount: 45 },
  { id: '6', name: 'Elétrica Segura', category: 'eletrica', description: 'Instalações elétricas residenciais', phone: '(11) 6666-6666', rating: 4.7, reviewCount: 90 },
  { id: '7', name: 'Hidro Fix', category: 'hidraulica', description: 'Serviços hidráulicos e encanamento', phone: '(11) 7777-7777', rating: 4.4, reviewCount: 70 },
  { id: '8', name: 'Segurança Total', category: 'seguranca', description: 'Sistemas de segurança e câmeras', phone: '(11) 8888-8888', rating: 4.2, reviewCount: 35 },
  { id: '9', name: 'Entrega Rápida', category: 'entrega', description: 'Entregas e mudanças residenciais', phone: '(11) 9999-9999', rating: 4.1, reviewCount: 25 },
  { id: '10', name: 'Serviços Gerais', category: 'outros', description: 'Serviços diversos para o condomínio', phone: '(11) 1010-1010', rating: 4.0, reviewCount: 15 },
];

const now = Date.now();
const mockRecommendations: Recommendation[] = [
  {
    id: '1',
    providerId: '1',
    provider: mockProviders[0],
    userId: '1',
    user: mockUsers[0],
    comment: 'Excelente serviço! Chegou no horário e fez um trabalho impecável.',
    rating: 5,
    tags: ['limpeza', 'pontualidade'],
    // 2 horas atrás para evitar "agora mesmo" no formatDistanceToNow
    createdAt: new Date(now - 2 * 60 * 60 * 1000),
  },
  {
    id: '2',
    providerId: '2',
    provider: mockProviders[1],
    userId: '2',
    user: mockUsers[1],
    comment: 'Bom serviço, resolveu o problema rapidamente.',
    rating: 4,
    tags: ['manutencao', 'agilidade'],
    // 1 dia atrás
    createdAt: new Date(now - 24 * 60 * 60 * 1000),
  },
];

const mockCategories: ServiceCategoryConfig[] = [
  { value: 'limpeza', label: 'Limpeza', icon: '🧹' },
  { value: 'manutencao', label: 'Manutenção', icon: '🔧' },
  { value: 'reforma', label: 'Reforma', icon: '🏗️' },
  { value: 'jardinagem', label: 'Jardinagem', icon: '🌿' },
  { value: 'pintura', label: 'Pintura', icon: '🎨' },
  { value: 'eletrica', label: 'Elétrica', icon: '⚡' },
  { value: 'hidraulica', label: 'Hidráulica', icon: '🚿' },
  { value: 'seguranca', label: 'Segurança', icon: '🔒' },
  { value: 'entrega', label: 'Entrega', icon: '📦' },
  { value: 'outros', label: 'Outros', icon: '🛠️' },
];

export class InMemoryProviderRepository implements ProviderRepository {
  async getProviders(): Promise<ServiceProvider[]> {
    return Promise.resolve([...mockProviders]);
  }

  async getRecommendations(): Promise<Recommendation[]> {
    return Promise.resolve([...mockRecommendations]);
  }

  async getCategories(): Promise<ServiceCategoryConfig[]> {
    return Promise.resolve([...mockCategories]);
  }
}

export function createProviderRepository(): ProviderRepository {
  return new InMemoryProviderRepository();
}
