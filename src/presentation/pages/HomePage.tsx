import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { Search } from 'lucide-react-native';
import { useHomeViewModel } from '../hooks/useHomeViewModel';
import { createProviderRepository } from '../../data/repositories/providerRepository';
import { ServiceCategoryFilter } from '../components/ServiceCategoryFilter';
import { ProviderCard } from '../components/ProviderCard';
import { RecommendationCard } from '../components/RecommendationCard';
import { ServiceCategory, ServiceProvider, Recommendation } from '../../core/types';
import { ServiceCategoryConfig } from '../../data/repositories/providerRepository';

// singleton repository — criado fora do componente para não recriar a cada render
const repository = createProviderRepository();

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(null);
  const [query, setQuery] = useState('');

  const {
    isLoading,
    error,
    categories,
    featuredProviders,
    getRecommendationsByCategory,
  } = useHomeViewModel(repository);

  const filteredRecommendations = useMemo(
    () =>
      getRecommendationsByCategory(selectedCategory).filter(
        (r) =>
          query === '' ||
          r.provider.name.toLowerCase().includes(query.toLowerCase()) ||
          r.comment.toLowerCase().includes(query.toLowerCase()),
      ),
    [getRecommendationsByCategory, selectedCategory, query],
  );

  const categoryMap = useMemo(() => {
    const map = new Map<ServiceCategory, ServiceCategoryConfig>();
    categories.forEach((c) => map.set(c.value, c));
    return map;
  }, [categories]);

  const renderFeaturedProvider = useCallback(
    ({ item }: { item: ServiceProvider }) => (
      <View style={s.featuredItem}>
        <ProviderCard provider={item} categoryConfig={categoryMap.get(item.category)} />
      </View>
    ),
    [categoryMap],
  );

  const renderRecommendation = useCallback(
    ({ item }: { item: Recommendation }) => <RecommendationCard rec={item} />,
    [],
  );

  const ListHeader = useMemo(
    () => (
      <View>
        <Text style={s.title}>CondoServices</Text>
        <View style={s.search}>
          <Search size={20} color="#9ca3af" style={s.searchIcon} />
          <TextInput placeholder="Buscar..." value={query} onChangeText={setQuery} style={s.searchInput} />
        </View>
        <ServiceCategoryFilter
          selected={selectedCategory}
          onSelect={setSelectedCategory}
          categories={categories}
        />
        <Text style={s.sectionTitle}>🔥 Melhores Avaliados</Text>
        <FlatList
          horizontal
          data={featuredProviders}
          keyExtractor={(item) => item.id}
          renderItem={renderFeaturedProvider}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={s.row}
        />
        <Text style={s.sectionTitle}>✨ Recomendações Recentes</Text>
      </View>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedCategory, query, categories, featuredProviders, renderFeaturedProvider],
  );

  if (isLoading) {
    return (
      <View style={s.center}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={s.center}>
        <Text style={s.errorText}>⚠️ {error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={s.container}
      contentContainerStyle={s.content}
      data={filteredRecommendations}
      keyExtractor={(item) => item.id}
      renderItem={renderRecommendation}
      ListHeaderComponent={ListHeader}
      ListEmptyComponent={<Text style={s.empty}>Nenhuma recomendação encontrada.</Text>}
    />
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },
  content: { padding: 16, paddingBottom: 100 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f9fafb' },
  errorText: { fontSize: 16, color: '#ef4444', textAlign: 'center', paddingHorizontal: 24 },
  title: { fontSize: 24, fontWeight: '700', color: '#1f2937', marginBottom: 16 },
  search: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 },
  searchIcon: { marginRight: 12 },
  searchInput: { flex: 1, fontSize: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#1f2937', marginBottom: 12 },
  row: { paddingRight: 16 },
  featuredItem: { width: 280, marginRight: 12 },
  empty: { textAlign: 'center', color: '#6b7280', marginTop: 16 },
});
