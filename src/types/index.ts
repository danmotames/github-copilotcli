export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  apartment: string;
  building?: string;
  avatar?: string;
  createdAt: Date;
}

export interface Condominium {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  adminId: string;
  createdAt: Date;
  members: User[];
}

export type ServiceCategory = 
  | 'limpeza'
  | 'manutencao'
  | 'reforma'
  | 'jardinagem'
  | 'pintura'
  | 'eletrica'
  | 'hidraulica'
  | 'seguranca'
  | 'entrega'
  | 'outros';

export interface ServiceProvider {
  id: string;
  name: string;
  category: ServiceCategory;
  description: string;
  phone: string;
  email?: string;
  website?: string;
  address?: string;
  rating: number;
  reviewCount: number;
  recommendedBy: User[];
  createdAt: Date;
  updatedAt: Date;
  images?: string[];
}

export interface Recommendation {
  id: string;
  providerId: string;
  provider: ServiceProvider;
  userId: string;
  user: User;
  condominiumId: string;
  comment: string;
  rating: number;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Review {
  id: string;
  recommendationId: string;
  userId: string;
  user: User;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface Message {
  id: string;
  senderId: string;
  sender: User;
  content: string;
  createdAt: Date;
  read: boolean;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'recommendation' | 'message' | 'system';
  data?: any;
  read: boolean;
  createdAt: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface AppState {
  currentCondominium: Condominium | null;
  condominiums: Condominium[];
  recommendations: Recommendation[];
  providers: ServiceProvider[];
  notifications: Notification[];
  searchQuery: string;
  selectedCategory: ServiceCategory | null;
}
