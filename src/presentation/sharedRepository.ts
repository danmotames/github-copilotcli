import { createProviderRepository, ProviderRepository } from '../data/repositories/providerRepository';

// Shared singleton repository instance used across all pages
export const sharedRepository: ProviderRepository = createProviderRepository();
