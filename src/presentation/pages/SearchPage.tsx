import React, { useState, useMemo, memo, useCallback } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Search } from 'lucide-react-native';
import { ServiceCategory, ServiceProvider, Recommendation } from '../../core/types';
import { ServiceCategoryConfig } from '../../data/repositories/providerRepository';
import { sharedRepository } from '../sharedRepository';
import { ServiceCategoryFilter } from '../components/ServiceCategoryFilter';
import { ProviderCard } from '../components/ProviderCard';
import { RecommendationCard } from '../components/RecommendationCard';
import { useAppStore } from '../store/useAppStore';
import { useHomeViewModel } from '../hooks/useHomeViewModel';

type Tab = 'providers' | 'recommendations';

interface TabButtonProps {
  label: string;
  active: boolean;
  onPress: () => void;
}
const TabButton = memo(({ label, active, onPress }: TabButtonProps) => (
  <TouchableOpacity
    style={[s.tab, active && s.activeTab]}
    onPress={onPress}
    accessibilityRole="tab"
    accessibilityState={{ selected: active }}
  >
    <Text style={[s.tabTxt, active && s.activeTabTxt]}>{label}</Text>
  </TouchableOpacity>
));
TabButton.displayName = 'TabButton';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState<ServiceCategory | null>(null);
  const [tab, setTab] = useState<Tab>('providers');

  // Reuse data loaded by HomeViewModel (or load it here via repository)
  const { providers, recommendations, categories } = useAppStore();

  // Also trigger a load if store is empty
  useHomeViewModel(sharedRepository);

  const categoryMap = useMemo(() => {
    const map = new Map<ServiceCategory, ServiceCategoryConfig>();
    categories.forEach((c) => map.set(c.value, c));
    return map;
  }, [categories]);

  const filteredProviders = useMemo(
    () =>
      providers.filter(
        (p) =>
          (query === '' || p.name.toLowerCase().includes(query.toLowerCase())) &&
          (cat === null || p.category === cat),
      ),
    [providers, query, cat],
  );

  const filteredRecs = useMemo(
    () =>
      recommendations.filter(
        (r) =>
          (query === '' ||
            r.provider.name.toLowerCase().includes(query.toLowerCase()) ||
            r.comment.toLowerCase().includes(query.toLowerCase())) &&
          (cat === null || r.provider.category === cat),
      ),
    [recommendations, query, cat],
  );

  const renderProvider = useCallback(
    ({ item }: { item: ServiceProvider }) => (
      <View style={s.itemWrap}>
        <ProviderCard provider={item} categoryConfig={categoryMap.get(item.category)} />
      </View>
    ),
    [categoryMap],
  );

  const renderRec = useCallback(
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
      <ServiceCategoryFilter selected={cat} onSelect={setCat} categories={categories} />
      <View style={s.tabs}>
        <TabButton
          label={`Prestadores (${filteredProviders.length})`}
          active={tab === 'providers'}
          onPress={() => setTab('providers')}
        />
        <TabButton
          label={`Recomendações (${filteredRecs.length})`}
          active={tab === 'recommendations'}
          onPress={() => setTab('recommendations')}
        />
      </View>
      {tab === 'providers' ? (
        <FlatList
          data={filteredProviders}
          keyExtractor={(p) => p.id}
          renderItem={renderProvider}
          contentContainerStyle={s.list}
          ListEmptyComponent={<Text style={s.empty}>Nenhum prestador encontrado.</Text>}
        />
      ) : (
        <FlatList
          data={filteredRecs}
          keyExtractor={(r) => r.id}
          renderItem={renderRec}
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
  itemWrap: { marginBottom: 12 },
  empty: { textAlign: 'center', color: '#6b7280', marginTop: 16 },
});
