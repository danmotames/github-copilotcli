import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { createProviderRepository, ServiceCategoryConfig } from '../../data/repositories/providerRepository';
import { useHomeViewModel } from '../hooks/useHomeViewModel';
import { useAppStore } from '../store/useAppStore';
import { ServiceCategoryFilter } from '../components/ServiceCategoryFilter';
import { ProviderCard } from '../components/ProviderCard';
import { ServiceCategory, ServiceProvider } from '../../core/types';

const repository = createProviderRepository();

export default function ProvidersScreen() {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(null);
  const { categories, isLoading } = useHomeViewModel(repository);
  const { providers } = useAppStore();

  const categoryMap = useMemo(() => {
    const map = new Map<ServiceCategory, ServiceCategoryConfig>();
    categories.forEach((c) => map.set(c.value, c));
    return map;
  }, [categories]);

  const filtered = useMemo<ServiceProvider[]>(
    () => (selectedCategory === null ? providers : providers.filter((p) => p.category === selectedCategory)),
    [providers, selectedCategory],
  );

  const renderItem = useCallback(
    ({ item }: { item: ServiceProvider }) => (
      <View style={s.itemWrapper}>
        <ProviderCard provider={item} categoryConfig={categoryMap.get(item.category)} />
      </View>
    ),
    [categoryMap],
  );

  return (
    <View style={s.container}>
      <Text style={s.title}>Prestadores</Text>
      <ServiceCategoryFilter
        selected={selectedCategory}
        onSelect={setSelectedCategory}
        categories={categories}
      />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={s.list}
        ListEmptyComponent={
          <Text style={s.empty}>
            {isLoading ? 'Carregando...' : 'Nenhum prestador encontrado.'}
          </Text>
        }
      />
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb', padding: 16, paddingBottom: 0 },
  title: { fontSize: 24, fontWeight: '700', color: '#1f2937', marginBottom: 16 },
  list: { paddingBottom: 100 },
  itemWrapper: { width: '100%', marginBottom: 12 },
  empty: { textAlign: 'center', color: '#6b7280', marginTop: 16 },
});
