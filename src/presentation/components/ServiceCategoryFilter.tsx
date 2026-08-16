import React, { memo } from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { ServiceCategory } from '../../core/types';
import { ServiceCategoryConfig } from '../../data/repositories/providerRepository';

interface Props {
  selected: ServiceCategory | null;
  onSelect: (category: ServiceCategory | null) => void;
  categories: ServiceCategoryConfig[];
}

export const ServiceCategoryFilter = memo(({ selected, onSelect, categories }: Props) => (
  <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.container}>
    <TouchableOpacity
      onPress={() => onSelect(null)}
      style={[s.btn, selected === null && s.active]}
      accessibilityRole="radio"
      accessibilityState={{ checked: selected === null }}
      accessibilityLabel="Todos"
    >
      <Text style={[s.txt, selected === null && s.activeTxt]}>Todos</Text>
    </TouchableOpacity>
    {categories.map((c) => (
      <TouchableOpacity
        key={c.value}
        onPress={() => onSelect(c.value)}
        style={[s.btn, selected === c.value && s.active]}
        accessibilityRole="radio"
        accessibilityState={{ checked: selected === c.value }}
        accessibilityLabel={c.label}
      >
        <Text style={[s.txt, selected === c.value && s.activeTxt]}>{c.icon} {c.label}</Text>
      </TouchableOpacity>
    ))}
  </ScrollView>
));

ServiceCategoryFilter.displayName = 'ServiceCategoryFilter';

const s = StyleSheet.create({
  container: { paddingHorizontal: 16, paddingVertical: 8 },
  btn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#fff', borderWidth: 1, borderColor: '#e5e7eb', marginRight: 8 },
  active: { backgroundColor: '#3b82f6', borderWidth: 0 },
  txt: { fontSize: 14, fontWeight: '600', color: '#374151' },
  activeTxt: { color: '#fff' },
});
