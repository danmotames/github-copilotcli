import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { ServiceCategory, ServiceProvider } from '../../core/types';
import { ServiceCategoryConfig } from '../../data/repositories/providerRepository';
import { sharedRepository } from '../sharedRepository';
import { ServiceCategoryFilter } from '../components/ServiceCategoryFilter';
import { ProviderCard } from '../components/ProviderCard';
import { useAppStore } from '../store/useAppStore';
import { useHomeViewModel } from '../hooks/useHomeViewModel';



export default function ProvidersScreen() {
  const [cat, setCat] = useState<ServiceCategory | null>(null);
  const { providers, categories } = useAppStore();
  useHomeViewModel(sharedRepository);
  const categoryMap = useMemo(() => {
    const map = new Map<ServiceCategory, ServiceCategoryConfig>();
    categories.forEach((c) => map.set(c.value, c));
    return map;
  }, [categories]);

  const filtered = useMemo(
    () => (cat === null ? providers : providers.filter((p) => p.category === cat)),
    [providers, cat],
  );

  const renderItem = useCallback(
    ({ item }: { item: ServiceProvider }) => (
      <View style={s.itemWrap}>
        <ProviderCard provider={item} categoryConfig={categoryMap.get(item.category)} />
      </View>
    ),
    [categoryMap],
  );

  return (
    <View style={s.container}>
      <Text style={s.title}>Prestadores</Text>
      <ServiceCategoryFilter selected={cat} onSelect={setCat} categories={categories} />
      <FlatList
        data={filtered}
        keyExtractor={(p) => p.id}
        renderItem={renderItem}
        contentContainerStyle={s.list}
        ListEmptyComponent={<Text style={s.empty}>Nenhum prestador encontrado.</Text>}
      />
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb', padding: 16, paddingBottom: 0 },
  title: { fontSize: 24, fontWeight: '700', color: '#1f2937', marginBottom: 16 },
  list: { paddingBottom: 100 },
  itemWrap: { marginBottom: 12 },
  empty: { textAlign: 'center', color: '#6b7280', marginTop: 16 },
});
