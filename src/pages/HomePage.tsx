import React, { useEffect } from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet } from 'react-native';
import { useAppStore } from '../store/useAppStore';
import { mockRecommendations, mockProviders } from '../services/mockData';
import { ProviderCard } from '../components/ProviderCard';
import { RecommendationCard } from '../components/RecommendationCard';
import { ServiceCategoryFilter } from '../components/ServiceCategoryFilter';
import { Search } from 'lucide-react-native';
export default function HomeScreen() {
  const { setRecommendations, setProviders, recommendations, providers } = useAppStore();
  const [cat, setCat] = React.useState(null);
  useEffect(() => { setRecommendations(mockRecommendations); setProviders(mockProviders); }, []);
  const filteredRecs = recommendations.filter(r => cat === null || r.provider.category === cat);
  const featured = [...providers].sort((a, b) => b.rating - a.rating).slice(0, 3);
  return (
    <ScrollView style={s.container} contentContainerStyle={s.content}>
      <Text style={s.title}>CondoServices</Text>
      <View style={s.search}>
        <Search size={20} color="#9ca3af" style={s.searchIcon} />
        <TextInput placeholder="Buscar..." style={s.searchInput} />
      </View>
      <ServiceCategoryFilter selected={cat} onSelect={setCat} />
      <Text style={s.sectionTitle}>🔥 Melhores Avaliados</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.row}>
        {featured.map(p => <View key={p.id} style={{ width: 280, marginRight: 12 }}><ProviderCard provider={p} /></View>)}</ScrollView>
      <Text style={s.sectionTitle}>✨ Recomendações Recentes</Text>
      <View style={s.list}>{filteredRecs.map(r => <RecommendationCard key={r.id} rec={r} />)}</View>
    </ScrollView>
  );
}
const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },
  content: { padding: 16, paddingBottom: 100 },
  title: { fontSize: 24, fontWeight: '700', color: '#1f2937', marginBottom: 16 },
  search: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 },
  searchIcon: { marginRight: 12 },
  searchInput: { flex: 1, fontSize: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#1f2937', marginBottom: 12 },
  row: { paddingRight: 16 },
  list: { gap: 12 },
});
