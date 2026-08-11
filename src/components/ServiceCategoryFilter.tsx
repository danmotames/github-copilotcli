import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { serviceCategories } from '../services/mockData';
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
  container: { paddingHorizontal: 16, paddingVertical: 8 },
  btn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#fff', borderWidth: 1, borderColor: '#e5e7eb', marginRight: 8 },
  active: { backgroundColor: '#3b82f6', borderWidth: 0 },
  txt: { fontSize: 14, fontWeight: '600', color: '#374151' },
  activeTxt: { color: '#fff' },
});
