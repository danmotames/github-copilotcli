import React, { memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ServiceProvider } from '../../core/types';
import { ServiceCategoryConfig } from '../../data/repositories/providerRepository';

interface Props {
  provider: ServiceProvider;
  categoryConfig?: ServiceCategoryConfig;
  onPress?: () => void;
}

export const ProviderCard = memo(({ provider, categoryConfig, onPress }: Props) => {
  const icon = categoryConfig?.icon ?? '🛠️';
  const label = categoryConfig?.label ?? provider.category;

  return (
    <TouchableOpacity
      style={s.card}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${provider.name}, ${label}, avaliação ${provider.rating.toFixed(1)}`}
    >
      <View style={s.header}>
        <Text style={s.icon}>{icon}</Text>
        <View style={s.info}>
          <Text style={s.name}>{provider.name}</Text>
          <Text style={s.category}>{label}</Text>
        </View>
        <View style={s.ratingBadge}>
          <Text style={s.ratingText}>{provider.rating.toFixed(1)}</Text>
        </View>
      </View>
      <Text style={s.desc}>{provider.description}</Text>
      <Text style={s.phone}>{provider.phone}</Text>
    </TouchableOpacity>
  );
});

ProviderCard.displayName = 'ProviderCard';

const s = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  icon: { fontSize: 24, marginRight: 8 },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: '600', color: '#1f2937' },
  category: { fontSize: 12, color: '#6b7280' },
  ratingBadge: { backgroundColor: '#dbeafe', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  ratingText: { fontSize: 14, fontWeight: '600', color: '#1d4ed8' },
  desc: { fontSize: 14, color: '#374151', marginBottom: 8 },
  phone: { fontSize: 12, color: '#6b7280' },
});
