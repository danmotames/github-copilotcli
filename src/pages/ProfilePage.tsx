import React from 'react';
import { View, Text, ScrollView, StyleSheet, Button } from 'react-native';
import { mockUsers, mockRecommendations } from '../services/mockData';
import { colors, spacing, typography } from '../theme';
import { commonStyles } from '../theme/commonStyles';

export default function ProfileScreen() {
  const user = mockUsers[0];
  const myRecs = mockRecommendations.filter(r => r.userId === user.id);
  return (
    <ScrollView style={commonStyles.screen} contentContainerStyle={commonStyles.screenContent}>
      <View style={s.header}>
        <View style={s.avatar}><Text style={s.avatarText}>{user.name.split(' ').map(n => n[0]).join('').toUpperCase()}</Text></View>
        <Text style={s.name}>{user.name}</Text>
        <Text style={s.info}>{user.apartment} - {user.building}</Text>
        <Text style={s.email}>{user.email}</Text>
      </View>
      <View style={s.stats}>
        <View style={s.stat}><Text style={s.statValue}>{myRecs.length}</Text><Text style={s.statLabel}>Recomendações</Text></View>
        <View style={s.stat}><Text style={s.statValue}>12</Text><Text style={s.statLabel}>Favoritos</Text></View>
        <View style={s.stat}><Text style={s.statValue}>4.8</Text><Text style={s.statLabel}>Avaliação</Text></View>
      </View>
      <Text style={commonStyles.sectionTitle}>Minhas Recomendações</Text>
      {myRecs.length > 0
        ? myRecs.map(r => <View key={r.id} style={s.rec}><Text style={s.recProvider}>{r.provider.name}</Text><Text style={s.recComment}>{r.comment}</Text></View>)
        : <Text style={s.empty}>Nenhuma recomendação ainda</Text>}
      <Button title="Sair" onPress={() => {}} />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  header: { alignItems: 'center', marginBottom: spacing.xl },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center', marginBottom: spacing.md },
  avatarText: { color: colors.surface, fontSize: 24, fontWeight: '600' },
  name: { ...typography.subtitle, marginBottom: 0 },
  info: { ...typography.caption, marginBottom: spacing.xs },
  email: { fontSize: 12, color: colors.textPlaceholder },
  stats: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: spacing.xl },
  stat: { alignItems: 'center' },
  statValue: { ...typography.subtitle },
  statLabel: { ...typography.caption },
  rec: { backgroundColor: colors.surface, borderRadius: 8, padding: spacing.md, marginBottom: spacing.sm },
  recProvider: { ...typography.body, fontWeight: '600' },
  recComment: { ...typography.bodySmall },
  empty: { textAlign: 'center', color: colors.textMuted, marginTop: spacing.lg },
});
