import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { mockProviders } from '../services/mockData';
import { ProviderCard } from '../components/ProviderCard';
import { ServiceCategoryFilter } from '../components/ServiceCategoryFilter';
import { commonStyles } from '../theme/commonStyles';
import { spacing } from '../theme';

export default function ProvidersScreen() {
  const [cat, setCat] = React.useState(null);
  const filtered = mockProviders.filter(p => cat === null || p.category === cat);
  return (
    <ScrollView style={commonStyles.screen} contentContainerStyle={commonStyles.screenContent}>
      <Text style={commonStyles.title}>Prestadores</Text>
      <ServiceCategoryFilter selected={cat} onSelect={setCat} />
      <View style={s.grid}>{filtered.map(p => <View key={p.id} style={s.item}><ProviderCard provider={p} /></View>)}</View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  grid: { gap: spacing.md },
  item: { width: '100%' },
});
