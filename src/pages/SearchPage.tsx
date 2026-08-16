import React from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet } from 'react-native';
import { mockProviders, mockRecommendations } from '../services/mockData';
import { ProviderCard } from '../components/ProviderCard';
import { RecommendationCard } from '../components/RecommendationCard';
import { ServiceCategoryFilter } from '../components/ServiceCategoryFilter';
import { Search } from 'lucide-react-native';
import { colors, spacing, typography } from '../theme';
import { commonStyles } from '../theme/commonStyles';

export default function SearchScreen() {
  const [query, setQuery] = React.useState('');
  const [cat, setCat] = React.useState(null);
  const [tab, setTab] = React.useState('providers');
  const filteredProviders = mockProviders.filter(p => (query === '' || p.name.toLowerCase().includes(query.toLowerCase())) && (cat === null || p.category === cat));
  const filteredRecs = mockRecommendations.filter(r => (query === '' || r.provider.name.toLowerCase().includes(query.toLowerCase()) || r.comment.toLowerCase().includes(query.toLowerCase())) && (cat === null || r.provider.category === cat));
  return (
    <ScrollView style={commonStyles.screen} contentContainerStyle={commonStyles.screenContent}>
      <Text style={commonStyles.title}>Buscar</Text>
      <View style={commonStyles.searchBar}>
        <Search size={20} color={colors.textPlaceholder} style={commonStyles.searchIcon} />
        <TextInput placeholder="Buscar..." value={query} onChangeText={setQuery} style={commonStyles.searchInput} />
      </View>
      <ServiceCategoryFilter selected={cat} onSelect={setCat} />
      <View style={s.tabs}>
        <Text style={[s.tab, tab === 'providers' && s.activeTab]} onPress={() => setTab('providers')}>Prestadores ({filteredProviders.length})</Text>
        <Text style={[s.tab, tab === 'recommendations' && s.activeTab]} onPress={() => setTab('recommendations')}>Recomendações ({filteredRecs.length})</Text>
      </View>
      {tab === 'providers' && <View style={commonStyles.list}>{filteredProviders.map(p => <View key={p.id} style={s.gridItem}><ProviderCard provider={p} /></View>)}</View>}
      {tab === 'recommendations' && <View style={commonStyles.list}>{filteredRecs.map(r => <RecommendationCard key={r.id} rec={r} />)}</View>}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  tabs: { flexDirection: 'row', marginBottom: spacing.lg, gap: spacing.sm },
  tab: { flex: 1, textAlign: 'center', paddingVertical: spacing.md, paddingHorizontal: spacing.lg, borderRadius: 8, ...typography.bodySmall, fontWeight: '500', color: colors.textMuted, backgroundColor: colors.surface, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 },
  activeTab: { color: colors.surface, backgroundColor: colors.primary },
  gridItem: { width: '100%' },
});
