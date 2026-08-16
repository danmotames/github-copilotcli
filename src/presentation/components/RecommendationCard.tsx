import React, { memo, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Recommendation } from '../../core/types';

interface Props {
  rec: Recommendation;
  onPress?: () => void;
}

function getInitials(name: string): string {
  if (!name || name.trim().length === 0) return '?';
  return name
    .trim()
    .split(/\s+/)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export const RecommendationCard = memo(({ rec, onPress }: Props) => {
  const timeAgo = useMemo(
    () => formatDistanceToNow(rec.createdAt, { locale: ptBR, addSuffix: true }),
    [rec.createdAt],
  );
  const initials = useMemo(() => getInitials(rec.user.name), [rec.user.name]);

  return (
    <TouchableOpacity
      style={s.card}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Recomendação de ${rec.user.name} para ${rec.provider.name}, avaliação ${rec.rating.toFixed(1)}`}
    >
      <View style={s.header}>
        <View style={s.avatar}>
          <Text style={s.avatarText}>{initials}</Text>
        </View>
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
});

RecommendationCard.displayName = 'RecommendationCard';

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
