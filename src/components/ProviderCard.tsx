import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ServiceProvider } from '../types';
import { serviceCategories } from '../services/mockData';
export const ProviderCard = ({ provider }: { provider: ServiceProvider }) => {
  const cat = serviceCategories.find(c => c.value === provider.category);
  return (
    <TouchableOpacity style={s.card}>
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
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  icon: { fontSize: 24, marginRight: 8 },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: '600', color: '#1f2937' },
  category: { fontSize: 12, color: '#6b7280' },
  rating: { backgroundColor: '#dbeafe', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  ratingText: { fontSize: 14, fontWeight: '600', color: '#1d4ed8' },
  desc: { fontSize: 14, color: '#374151', marginBottom: 8 },
  phone: { fontSize: 12, color: '#6b7280' },
});
