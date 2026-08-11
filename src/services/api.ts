import { 
  User, 
  Condominium, 
  ServiceProvider, 
  Recommendation,
  ServiceCategory,
  Review 
} from '../types';
import { 
  mockUsers, 
  mockCondominiums, 
  mockProviders, 
  mockRecommendations 
} from './mockData';

// Simula delay de API
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Serviço de Autenticação
export const authService = {
  async login(email: string, password: string): Promise<User> {
    await delay(500);
    const user = mockUsers.find(u => u.email === email);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    return user;
  },
  
  async register(userData: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    await delay(500);
    const newUser: User = {
      ...userData,
      id: (mockUsers.length + 1).toString(),
      createdAt: new Date(),
    };
    mockUsers.push(newUser);
    return newUser;
  },
  
  async logout(): Promise<void> {
    await delay(300);
  },
  
  async getCurrentUser(): Promise<User | null> {
    await delay(300);
    return mockUsers[0]; // Retorna o primeiro usuário como exemplo
  },
};

// Serviço de Condomínios
export const condominiumService = {
  async getAll(): Promise<Condominium[]> {
    await delay(500);
    return mockCondominiums;
  },
  
  async getById(id: string): Promise<Condominium | null> {
    await delay(300);
    return mockCondominiums.find(c => c.id === id) || null;
  },
  
  async getByUser(userId: string): Promise<Condominium[]> {
    await delay(300);
    return mockCondominiums.filter(c => c.members.some(m => m.id === userId));
  },
  
  async create(condominium: Omit<Condominium, 'id' | 'createdAt' | 'members'>): Promise<Condominium> {
    await delay(500);
    const newCondominium: Condominium = {
      ...condominium,
      id: (mockCondominiums.length + 1).toString(),
      createdAt: new Date(),
      members: [],
    };
    mockCondominiums.push(newCondominium);
    return newCondominium;
  },
  
  async join(condominiumId: string, user: User): Promise<Condominium> {
    await delay(500);
    const condominium = mockCondominiums.find(c => c.id === condominiumId);
    if (!condominium) {
      throw new Error('Condomínio não encontrado');
    }
    
    if (!condominium.members.some(m => m.id === user.id)) {
      condominium.members.push(user);
    }
    
    return condominium;
  },
};

// Serviço de Prestadores
export const providerService = {
  async getAll(): Promise<ServiceProvider[]> {
    await delay(500);
    return mockProviders;
  },
  
  async getById(id: string): Promise<ServiceProvider | null> {
    await delay(300);
    return mockProviders.find(p => p.id === id) || null;
  },
  
  async getByCategory(category: ServiceCategory): Promise<ServiceProvider[]> {
    await delay(300);
    return mockProviders.filter(p => p.category === category);
  },
  
  async search(query: string): Promise<ServiceProvider[]> {
    await delay(300);
    const lowerQuery = query.toLowerCase();
    return mockProviders.filter(p => 
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery)
    );
  },
  
  async create(provider: Omit<ServiceProvider, 'id' | 'createdAt' | 'updatedAt' | 'rating' | 'reviewCount' | 'recommendedBy'>): Promise<ServiceProvider> {
    await delay(500);
    const newProvider: ServiceProvider = {
      ...provider,
      id: (mockProviders.length + 1).toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
      rating: 0,
      reviewCount: 0,
      recommendedBy: [],
    };
    mockProviders.push(newProvider);
    return newProvider;
  },
  
  async update(id: string, updates: Partial<ServiceProvider>): Promise<ServiceProvider> {
    await delay(500);
    const index = mockProviders.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Prestador não encontrado');
    }
    
    mockProviders[index] = {
      ...mockProviders[index],
      ...updates,
      updatedAt: new Date(),
    };
    
    return mockProviders[index];
  },
  
  async delete(id: string): Promise<void> {
    await delay(500);
    const index = mockProviders.findIndex(p => p.id === id);
    if (index !== -1) {
      mockProviders.splice(index, 1);
    }
  },
};

// Serviço de Recomendações
export const recommendationService = {
  async getAll(condominiumId?: string): Promise<Recommendation[]> {
    await delay(500);
    if (condominiumId) {
      return mockRecommendations.filter(r => r.condominiumId === condominiumId);
    }
    return mockRecommendations;
  },
  
  async getById(id: string): Promise<Recommendation | null> {
    await delay(300);
    return mockRecommendations.find(r => r.id === id) || null;
  },
  
  async getByUser(userId: string): Promise<Recommendation[]> {
    await delay(300);
    return mockRecommendations.filter(r => r.userId === userId);
  },
  
  async getByProvider(providerId: string): Promise<Recommendation[]> {
    await delay(300);
    return mockRecommendations.filter(r => r.providerId === providerId);
  },
  
  async create(recommendation: Omit<Recommendation, 'id' | 'createdAt' | 'updatedAt'>): Promise<Recommendation> {
    await delay(500);
    const newRecommendation: Recommendation = {
      ...recommendation,
      id: (mockRecommendations.length + 1).toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockRecommendations.push(newRecommendation);
    
    // Atualiza o rating do prestador
    const provider = mockProviders.find(p => p.id === recommendation.providerId);
    if (provider) {
      const providerRecommendations = mockRecommendations.filter(r => r.providerId === provider.id);
      const totalRating = providerRecommendations.reduce((sum, r) => sum + r.rating, 0);
      provider.rating = totalRating / providerRecommendations.length;
      provider.reviewCount = providerRecommendations.length;
    }
    
    return newRecommendation;
  },
  
  async update(id: string, updates: Partial<Recommendation>): Promise<Recommendation> {
    await delay(500);
    const index = mockRecommendations.findIndex(r => r.id === id);
    if (index === -1) {
      throw new Error('Recomendação não encontrada');
    }
    
    mockRecommendations[index] = {
      ...mockRecommendations[index],
      ...updates,
      updatedAt: new Date(),
    };
    
    return mockRecommendations[index];
  },
  
  async delete(id: string): Promise<void> {
    await delay(500);
    const index = mockRecommendations.findIndex(r => r.id === id);
    if (index !== -1) {
      mockRecommendations.splice(index, 1);
    }
  },
  
  async like(recommendationId: string, userId: string): Promise<Recommendation> {
    await delay(300);
    const recommendation = mockRecommendations.find(r => r.id === recommendationId);
    if (!recommendation) {
      throw new Error('Recomendação não encontrada');
    }
    
    // Adiciona o usuário aos que recomendam o prestador
    const provider = mockProviders.find(p => p.id === recommendation.providerId);
    if (provider && !provider.recommendedBy.some(u => u.id === userId)) {
      const user = mockUsers.find(u => u.id === userId);
      if (user) {
        provider.recommendedBy.push(user);
      }
    }
    
    return recommendation;
  },
};

// Serviço de Reviews
export const reviewService = {
  async getByRecommendation(recommendationId: string): Promise<Review[]> {
    await delay(300);
    // Mock de reviews
    const mockReviews: Review[] = [
      {
        id: '1',
        recommendationId: '1',
        userId: '2',
        user: mockUsers[1],
        rating: 5,
        comment: 'Concordo totalmente com a recomendação!',
        createdAt: new Date('2024-01-26'),
      },
      {
        id: '2',
        recommendationId: '1',
        userId: '3',
        user: mockUsers[2],
        rating: 4,
        comment: 'Bom serviço, mas o preço poderia ser melhor.',
        createdAt: new Date('2024-01-27'),
      },
    ];
    
    return mockReviews.filter(r => r.recommendationId === recommendationId);
  },
  
  async create(review: Omit<Review, 'id' | 'createdAt'>): Promise<Review> {
    await delay(500);
    const newReview: Review = {
      ...review,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    return newReview;
  },
};

// Serviço de Notificações
export const notificationService = {
  async getByUser(userId: string): Promise<any[]> {
    await delay(300);
    // Mock de notificações
    return [
      {
        id: '1',
        userId: '1',
        title: 'Nova Recomendação',
        message: 'João Silva recomendou um novo prestador de limpeza',
        type: 'recommendation' as const,
        data: { recommendationId: '1' },
        read: false,
        createdAt: new Date('2024-01-28'),
      },
      {
        id: '2',
        userId: '1',
        title: 'Mensagem Recebida',
        message: 'Você recebeu uma nova mensagem de Maria Santos',
        type: 'message' as const,
        data: { messageId: '1' },
        read: false,
        createdAt: new Date('2024-01-27'),
      },
    ];
  },
  
  async markAsRead(id: string): Promise<void> {
    await delay(300);
  },
  
  async markAllAsRead(userId: string): Promise<void> {
    await delay(300);
  },
};

// Exporta todos os serviços
export default {
  auth: authService,
  condominium: condominiumService,
  provider: providerService,
  recommendation: recommendationService,
  review: reviewService,
  notification: notificationService,
};
