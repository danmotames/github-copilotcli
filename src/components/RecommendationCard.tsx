import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Recommendation } from '../types';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
export const RecommendationCard = ({ rec }: { rec: Recommendation }) => {
  const timeAgo = formatDistanceToNow(rec.createdAt, { locale: ptBR, addSuffix: true });
  return (
    <TouchableOpacity style={s.card}>
      <View style={s.header}>
        <View style={s.avatar}><Text style={s.avatarText}>{rec.user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}</Text></View>
        <View style={s.info}>
          <View style={s.userRow}>
            <Text style={s.name}>{rec.user.name}</Text>
            <Text style={s.time}>• {timeAgo}</Text>
          </View>
          <Text style={s.rating}>⭐ {rec.rating.toFixed(1)}</Text>
          <Text style={s.provider}>{rec.provider.name}</Text>
          <Text style={s.comment}>{rec.comment}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const s = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 },
  header: { flexDirection: 'row', gap: 12 },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#3b82f6', justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: '#fff', fontWeight: '600' },
  info: { flex: 1 },
  userRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  name: { fontSize: 16, fontWeight: '600', color: '#1f2937', marginRight: 4 },
  time: { fontSize: 12, color: '#6b7280' },
  rating: { fontSize: 14, color: '#fbbf24', marginBottom: 4 },
  provider: { fontSize: 16, fontWeight: '600', color: '#1f2937', marginBottom: 4 },
  comment: { fontSize: 14, color: '#374151' },
});
