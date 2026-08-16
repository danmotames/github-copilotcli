import React, { useMemo, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { mockUsers } from '../../data/repositories/providerRepository';
import { useAppStore } from '../store/useAppStore';
import { Recommendation } from '../../core/types';

const user = mockUsers[0];

export default function ProfileScreen() {
  const { recommendations } = useAppStore();

  const myRecs = useMemo(
    () => recommendations.filter((r) => r.userId === user.id),
    [recommendations],
  );

  const renderRec = useCallback(({ item }: { item: Recommendation }) => (
    <View style={s.rec}>
      <Text style={s.recProvider}>{item.provider.name}</Text>
      <Text style={s.recComment}>{item.comment}</Text>
    </View>
  ), []);

  return (
    <FlatList
      style={s.container}
      contentContainerStyle={s.content}
      data={myRecs}
      keyExtractor={(r) => r.id}
      ListHeaderComponent={
        <View>
          <View style={s.header}>
            <View style={s.avatar}>
              <Text style={s.avatarText}>
                {user.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .toUpperCase()
                  .slice(0, 2)}
              </Text>
            </View>
            <Text style={s.name}>{user.name}</Text>
            <Text style={s.info}>{user.apartment} - {user.building}</Text>
            <Text style={s.email}>{user.email}</Text>
          </View>
          <View style={s.stats}>
            <View style={s.stat}>
              <Text style={s.statValue}>{myRecs.length}</Text>
              <Text style={s.statLabel}>Recomendações</Text>
            </View>
            {/* TODO: Favoritos e Avaliação virão de repositório futuro */}
            <View style={s.stat}>
              <Text style={s.statValue}>—</Text>
              <Text style={s.statLabel}>Favoritos</Text>
            </View>
            <View style={s.stat}>
              <Text style={s.statValue}>—</Text>
              <Text style={s.statLabel}>Avaliação</Text>
            </View>
          </View>
          <Text style={s.sectionTitle}>Minhas Recomendações</Text>
        </View>
      }
      ListEmptyComponent={<Text style={s.empty}>Nenhuma recomendação ainda</Text>}
      renderItem={renderRec}
      ListFooterComponent={
        <TouchableOpacity
          style={s.logoutBtn}
          accessibilityRole="button"
          accessibilityLabel="Sair"
        >
          <Text style={s.logoutTxt}>Sair</Text>
        </TouchableOpacity>
      }
    />
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },
  content: { padding: 16, paddingBottom: 100 },
  header: { alignItems: 'center', marginBottom: 24 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#3b82f6', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  avatarText: { color: '#fff', fontSize: 24, fontWeight: '600' },
  name: { fontSize: 20, fontWeight: '700', color: '#1f2937' },
  info: { fontSize: 14, color: '#6b7280', marginBottom: 4 },
  email: { fontSize: 12, color: '#9ca3af' },
  stats: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 24 },
  stat: { alignItems: 'center' },
  statValue: { fontSize: 20, fontWeight: '700', color: '#1f2937' },
  statLabel: { fontSize: 12, color: '#6b7280' },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#1f2937', marginBottom: 12 },
  rec: { backgroundColor: '#fff', borderRadius: 8, padding: 12, marginBottom: 8 },
  recProvider: { fontSize: 16, fontWeight: '600', color: '#1f2937' },
  recComment: { fontSize: 14, color: '#374151' },
  empty: { textAlign: 'center', color: '#6b7280', marginTop: 16 },
  logoutBtn: { marginTop: 24, backgroundColor: '#ef4444', borderRadius: 8, paddingVertical: 14, alignItems: 'center' },
  logoutTxt: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
