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

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  apartment: string;
  building?: string;
}

export interface ServiceProvider {
  id: string;
  name: string;
  category: ServiceCategory;
  description: string;
  phone: string;
  rating: number;
  reviewCount: number;
}

export interface Recommendation {
  id: string;
  providerId: string;
  provider: ServiceProvider;
  userId: string;
  user: User;
  comment: string;
  rating: number;
  tags: string[];
  createdAt: Date;
}
