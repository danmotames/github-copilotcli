import React, { useEffect } from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet } from 'react-native';
import { useAppStore } from '../store/useAppStore';
import { mockRecommendations, mockProviders } from '../services/mockData';
import { ProviderCard } from '../components/ProviderCard';
import { RecommendationCard } from '../components/RecommendationCard';
import { ServiceCategoryFilter } from '../components/ServiceCategoryFilter';
import { Search } from 'lucide-react-native';
import { colors, spacing, typography } from '../theme';
import { commonStyles } from '../theme/commonStyles';

export default function HomeScreen() {
  const { setRecommendations, setProviders, recommendations, providers } = useAppStore();
  const [cat, setCat] = React.useState(null);
  useEffect(() => { setRecommendations(mockRecommendations); setProviders(mockProviders); }, []);
  const filteredRecs = recommendations.filter(r => cat === null || r.provider.category === cat);
  const featured = [...providers].sort((a, b) => b.rating - a.rating).slice(0, 3);
  return (
    <ScrollView style={commonStyles.screen} contentContainerStyle={commonStyles.screenContent}>
      <Text style={commonStyles.title}>CondoServices</Text>
      <View style={commonStyles.searchBar}>
        <Search size={20} color={colors.textPlaceholder} style={commonStyles.searchIcon} />
        <TextInput placeholder="Buscar..." style={commonStyles.searchInput} />
      </View>
      <ServiceCategoryFilter selected={cat} onSelect={setCat} />
      <Text style={[commonStyles.sectionTitle, s.topSpacing]}>🔥 Melhores Avaliados</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={commonStyles.row}>
        {featured.map(p => <View key={p.id} style={s.featuredItem}><ProviderCard provider={p} /></View>)}
      </ScrollView>
      <Text style={[commonStyles.sectionTitle, s.topSpacing]}>✨ Recomendações Recentes</Text>
      <View style={commonStyles.list}>{filteredRecs.map(r => <RecommendationCard key={r.id} rec={r} />)}</View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  topSpacing: { marginTop: spacing.lg },
  featuredItem: { width: 280, marginRight: spacing.md },
});
