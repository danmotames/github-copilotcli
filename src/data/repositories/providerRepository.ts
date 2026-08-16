import { ServiceCategory, ServiceProvider, Recommendation, User } from '../../core/types';

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

// ─── Static data ────────────────────────────────────────────────────────────

const mockUsers: User[] = [
  { id: '1', name: 'João Silva', email: 'joao@email.com', phone: '(11) 99999-9999', apartment: '101', building: 'Torre A' },
  { id: '2', name: 'Maria Santos', email: 'maria@email.com', phone: '(11) 88888-8888', apartment: '202', building: 'Torre B' },
];

const mockProviders: ServiceProvider[] = [
  { id: '1', name: 'Limpeza Total', category: 'limpeza', description: 'Serviço de limpeza residencial', phone: '(11) 1111-1111', rating: 4.8, reviewCount: 120 },
  { id: '2', name: 'Manutenção Rápida', category: 'manutencao', description: 'Serviços gerais de manutenção', phone: '(11) 2222-2222', rating: 4.5, reviewCount: 85 },
  { id: '3', name: 'Pintura & Acabamento', category: 'pintura', description: 'Pintura de paredes e acabamentos', phone: '(11) 3333-3333', rating: 4.9, reviewCount: 200 },
  { id: '4', name: 'Jardim Vivo', category: 'jardinagem', description: 'Jardinagem e paisagismo', phone: '(11) 4444-4444', rating: 4.6, reviewCount: 60 },
  { id: '5', name: 'Reforma Total', category: 'reforma', description: 'Reformas residenciais completas', phone: '(11) 5555-5555', rating: 4.7, reviewCount: 95 },
];

// Use past timestamps so formatDistanceToNow returns meaningful relative strings
const mockRecommendations: Recommendation[] = [
  {
    id: '1',
    providerId: '1',
    provider: mockProviders[0],
    userId: '1',
    user: mockUsers[0],
    comment: 'Excelente serviço! Muito cuidadoso e pontual.',
    rating: 5,
    tags: ['limpeza'],
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  },
  {
    id: '2',
    providerId: '2',
    provider: mockProviders[1],
    userId: '2',
    user: mockUsers[1],
    comment: 'Bom serviço, resolveu o problema rapidamente.',
    rating: 4,
    tags: ['manutencao'],
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
  },
  {
    id: '3',
    providerId: '3',
    provider: mockProviders[2],
    userId: '1',
    user: mockUsers[0],
    comment: 'Pintura impecável, recomendo muito!',
    rating: 5,
    tags: ['pintura'],
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
  },
];

const allCategories: ServiceCategoryConfig[] = [
  { value: 'limpeza', label: 'Limpeza', icon: '🧹' },
  { value: 'manutencao', label: 'Manutenção', icon: '🔧' },
  { value: 'reforma', label: 'Reforma', icon: '🏗️' },
  { value: 'jardinagem', label: 'Jardinagem', icon: '🌿' },
  { value: 'pintura', label: 'Pintura', icon: '🎨' },
  { value: 'eletrica', label: 'Elétrica', icon: '⚡' },
  { value: 'hidraulica', label: 'Hidráulica', icon: '🚿' },
  { value: 'seguranca', label: 'Segurança', icon: '🔐' },
  { value: 'entrega', label: 'Entrega', icon: '📦' },
  { value: 'outros', label: 'Outros', icon: '🛠️' },
];

// ─── Implementation ──────────────────────────────────────────────────────────

class InMemoryProviderRepository implements ProviderRepository {
  async getProviders(): Promise<ServiceProvider[]> {
    return [...mockProviders];
  }

  async getRecommendations(): Promise<Recommendation[]> {
    return [...mockRecommendations];
  }

  async getCategories(): Promise<ServiceCategoryConfig[]> {
    return [...allCategories];
  }
}

export function createProviderRepository(): ProviderRepository {
  return new InMemoryProviderRepository();
}

// Re-export mock users for stores that still need them
export { mockUsers };
