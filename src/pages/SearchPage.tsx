import React from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet } from 'react-native';
import { mockProviders, mockRecommendations } from '../services/mockData';
import { ProviderCard } from '../components/ProviderCard';
import { RecommendationCard } from '../components/RecommendationCard';
import { ServiceCategoryFilter } from '../components/ServiceCategoryFilter';
import { Search } from 'lucide-react-native';
export default function SearchScreen() {
  const [query, setQuery] = React.useState('');
  const [cat, setCat] = React.useState(null);
  const [tab, setTab] = React.useState('providers');
  const filteredProviders = mockProviders.filter(p => (query === '' || p.name.toLowerCase().includes(query.toLowerCase())) && (cat === null || p.category === cat));
  const filteredRecs = mockRecommendations.filter(r => (query === '' || r.provider.name.toLowerCase().includes(query.toLowerCase()) || r.comment.toLowerCase().includes(query.toLowerCase())) && (cat === null || r.provider.category === cat));
  return (
    <ScrollView style={s.container} contentContainerStyle={s.content}>
      <Text style={s.title}>Buscar</Text>
      <View style={s.search}>
        <Search size={20} color="#9ca3af" style={s.searchIcon} />
        <TextInput placeholder="Buscar..." value={query} onChangeText={setQuery} style={s.searchInput} />
      </View>
      <ServiceCategoryFilter selected={cat} onSelect={setCat} />
      <View style={s.tabs}>
        <Text style={[s.tab, tab === 'providers' && s.activeTab]} onPress={() => setTab('providers')}>Prestadores ({filteredProviders.length})</Text>
        <Text style={[s.tab, tab === 'recommendations' && s.activeTab]} onPress={() => setTab('recommendations')}>Recomendações ({filteredRecs.length})</Text>
      </View>
      {tab === 'providers' && <View style={s.grid}>{filteredProviders.map(p => <View key={p.id} style={{width: '100%', marginBottom: 12}}><ProviderCard provider={p} /></View>)}</View>}
      {tab === 'recommendations' && <View style={s.list}>{filteredRecs.map(r => <RecommendationCard key={r.id} rec={r} />)}</View>}
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
  tabs: { flexDirection: 'row', marginBottom: 16, gap: 8 },
  tab: { flex: 1, textAlign: 'center', paddingVertical: 12, paddingHorizontal: 16, borderRadius: 8, fontSize: 14, fontWeight: '500', color: '#6b7280', backgroundColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 },
  activeTab: { color: '#fff', backgroundColor: '#3b82f6' },
  grid: { gap: 12 },
  list: { gap: 12 },
});
