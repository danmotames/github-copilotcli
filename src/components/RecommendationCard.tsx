import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Recommendation } from '../types';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { colors, spacing, radii, typography } from '../theme';
import { commonStyles } from '../theme/commonStyles';

export const RecommendationCard = ({ rec }: { rec: Recommendation }) => {
  const timeAgo = formatDistanceToNow(rec.createdAt, { locale: ptBR, addSuffix: true });
  return (
    <TouchableOpacity style={commonStyles.card}>
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
  header: { flexDirection: 'row', gap: spacing.md },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: colors.surface, fontWeight: '600' },
  info: { flex: 1 },
  userRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.xs },
  name: { ...typography.body, fontWeight: '600', marginRight: spacing.xs },
  time: { ...typography.caption },
  rating: { ...typography.bodySmall, color: colors.warning, marginBottom: spacing.xs },
  provider: { ...typography.body, fontWeight: '600', marginBottom: spacing.xs },
  comment: { ...typography.bodySmall },
});
