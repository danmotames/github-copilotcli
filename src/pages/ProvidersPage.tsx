import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { mockProviders } from '../services/mockData';
import { ProviderCard } from '../components/ProviderCard';
import { ServiceCategoryFilter } from '../components/ServiceCategoryFilter';
export default function ProvidersScreen() {
  const [cat, setCat] = React.useState(null);
  const filtered = mockProviders.filter(p => cat === null || p.category === cat);
  return (
    <ScrollView style={s.container} contentContainerStyle={s.content}>
      <Text style={s.title}>Prestadores</Text>
      <ServiceCategoryFilter selected={cat} onSelect={setCat} />
      <View style={s.grid}>{filtered.map(p => <View key={p.id} style={{width: '100%', marginBottom: 12}}><ProviderCard provider={p} /></View>)}</View>
    </ScrollView>
  );
}
const s = StyleSheet.create({ container: { flex: 1, backgroundColor: '#f9fafb' }, content: { padding: 16, paddingBottom: 100 }, title: { fontSize: 24, fontWeight: '700', color: '#1f2937', marginBottom: 16 }, grid: { gap: 12 } });
