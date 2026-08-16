import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { serviceCategories } from '../services/mockData';
import { colors, spacing, radii, typography } from '../theme';

export const ServiceCategoryFilter = ({ selected, onSelect }: { selected: string | null; onSelect: (c: string | null) => void }) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.container}>
      <TouchableOpacity onPress={() => onSelect(null)} style={[s.btn, selected === null && s.active]}>
        <Text style={[s.txt, selected === null && s.activeTxt]}>Todos</Text>
      </TouchableOpacity>
      {serviceCategories.map(c => (
        <TouchableOpacity key={c.value} onPress={() => onSelect(c.value)} style={[s.btn, selected === c.value && s.active]}>
          <Text style={[s.txt, selected === c.value && s.activeTxt]}>{c.icon} {c.label}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const s = StyleSheet.create({
  container: { paddingHorizontal: spacing.lg, paddingVertical: spacing.sm },
  btn: { paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, borderRadius: 20, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, marginRight: spacing.sm },
  active: { backgroundColor: colors.primary, borderWidth: 0 },
  txt: { ...typography.bodySmall, fontWeight: '600', color: colors.textSecondary },
  activeTxt: { color: colors.surface },
});
