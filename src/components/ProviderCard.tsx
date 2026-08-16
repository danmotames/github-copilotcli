import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ServiceProvider } from '../types';
import { serviceCategories } from '../services/mockData';
import { colors, radii, spacing, shadow, typography } from '../theme';
import { commonStyles } from '../theme/commonStyles';

export const ProviderCard = ({ provider }: { provider: ServiceProvider }) => {
  const cat = serviceCategories.find(c => c.value === provider.category);
  return (
    <TouchableOpacity style={commonStyles.card}>
      <View style={s.header}>
        <Text style={s.icon}>{cat?.icon}</Text>
        <View style={s.info}>
          <Text style={s.name}>{provider.name}</Text>
          <Text style={s.category}>{cat?.label}</Text>
        </View>
        <View style={s.rating}><Text style={s.ratingText}>{provider.rating.toFixed(1)}</Text></View>
      </View>
      <Text style={s.desc}>{provider.description}</Text>
      <Text style={s.phone}>{provider.phone}</Text>
    </TouchableOpacity>
  );
};

const s = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm },
  icon: { fontSize: 24, marginRight: spacing.sm },
  info: { flex: 1 },
  name: { ...typography.body, fontWeight: '600' },
  category: { ...typography.caption },
  rating: { backgroundColor: colors.primaryLight, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, borderRadius: radii.sm },
  ratingText: { ...typography.bodySmall, fontWeight: '600', color: colors.primaryDark },
  desc: { ...typography.bodySmall, marginBottom: spacing.sm },
  phone: { ...typography.caption },
});
