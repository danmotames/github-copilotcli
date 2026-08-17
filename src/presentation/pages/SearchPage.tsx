import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Search } from 'lucide-react-native';
import { createProviderRepository, ServiceCategoryConfig } from '../../data/repositories/providerRepository';
import { useAppStore } from '../store/useAppStore';
import { useHomeViewModel } from '../hooks/useHomeViewModel';
import { ServiceCategoryFilter } from '../components/ServiceCategoryFilter';
import { ProviderCard } from '../components/ProviderCard';
import { RecommendationCard } from '../components/RecommendationCard';
import { ServiceCategory, ServiceProvider, Recommendation } from '../../core/types';

const repository = createProviderRepository();

const TabButton = React.memo(function TabButton({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={[s.tab, active && s.activeTab]}
      onPress={onPress}
      accessibilityRole="tab"
      accessibilityState={{ selected: active }}
    >
      <Text style={[s.tabTxt, active && s.activeTabTxt]}>{label}</Text>
    </TouchableOpacity>
  );
});

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(null);
  const [activeTab, setActiveTab] = useState<'providers' | 'recommendations'>('providers');

  const { categories } = useHomeViewModel(repository);
  const { providers, recommendations } = useAppStore();

  const categoryMap = useMemo(() => {
    const map = new Map<ServiceCategory, ServiceCategoryConfig>();
    categories.forEach((c) => map.set(c.value, c));
    return map;
  }, [categories]);

  const filteredProviders = useMemo<ServiceProvider[]>(
    () =>
      providers.filter(
        (p) =>
          (query === '' || p.name.toLowerCase().includes(query.toLowerCase())) &&
          (selectedCategory === null || p.category === selectedCategory),
      ),
    [providers, query, selectedCategory],
  );

  const filteredRecommendations = useMemo<Recommendation[]>(
    () =>
      recommendations.filter(
        (r) =>
          (query === '' ||
            r.provider.name.toLowerCase().includes(query.toLowerCase()) ||
            r.comment.toLowerCase().includes(query.toLowerCase())) &&
          (selectedCategory === null || r.provider.category === selectedCategory),
      ),
    [recommendations, query, selectedCategory],
  );

  const renderProvider = useCallback(
    ({ item }: { item: ServiceProvider }) => (
      <View style={s.itemWrapper}>
        <ProviderCard provider={item} categoryConfig={categoryMap.get(item.category)} />
      </View>
    ),
    [categoryMap],
  );

  const renderRecommendation = useCallback(
    ({ item }: { item: Recommendation }) => <RecommendationCard rec={item} />,
    [],
  );

  return (
    <View style={s.container}>
      <Text style={s.title}>Buscar</Text>
      <View style={s.search}>
        <Search size={20} color="#9ca3af" style={s.searchIcon} />
        <TextInput
          placeholder="Buscar..."
          value={query}
          onChangeText={setQuery}
          style={s.searchInput}
        />
      </View>
      <ServiceCategoryFilter
        selected={selectedCategory}
        onSelect={setSelectedCategory}
        categories={categories}
      />
      <View style={s.tabs}>
        <TabButton
          label={`Prestadores (${filteredProviders.length})`}
          active={activeTab === 'providers'}
          onPress={() => setActiveTab('providers')}
        />
        <TabButton
          label={`Recomendações (${filteredRecommendations.length})`}
          active={activeTab === 'recommendations'}
          onPress={() => setActiveTab('recommendations')}
        />
      </View>
      {activeTab === 'providers' ? (
        <FlatList
          data={filteredProviders}
          keyExtractor={(item) => item.id}
          renderItem={renderProvider}
          contentContainerStyle={s.list}
          ListEmptyComponent={<Text style={s.empty}>Nenhum prestador encontrado.</Text>}
        />
      ) : (
        <FlatList
          data={filteredRecommendations}
          keyExtractor={(item) => item.id}
          renderItem={renderRecommendation}
          contentContainerStyle={s.list}
          ListEmptyComponent={<Text style={s.empty}>Nenhuma recomendação encontrada.</Text>}
        />
      )}
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb', padding: 16, paddingBottom: 0 },
  title: { fontSize: 24, fontWeight: '700', color: '#1f2937', marginBottom: 16 },
  search: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 },
  searchIcon: { marginRight: 12 },
  searchInput: { flex: 1, fontSize: 16 },
  tabs: { flexDirection: 'row', marginBottom: 16, gap: 8 },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 12, paddingHorizontal: 16, borderRadius: 8, backgroundColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 },
  activeTab: { backgroundColor: '#3b82f6' },
  tabTxt: { fontSize: 14, fontWeight: '500', color: '#6b7280' },
  activeTabTxt: { color: '#fff' },
  list: { paddingBottom: 100 },
  itemWrapper: { width: '100%', marginBottom: 12 },
  empty: { textAlign: 'center', color: '#6b7280', marginTop: 16 },
});
