import React, { useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppStore } from '../store/useAppStore';
import { getInitials } from '../utils/stringUtils';

// Dados do usuário atual virão de um repositório de autenticação no futuro.
// Por ora, usamos o primeiro usuário do store ou um placeholder.
const PLACEHOLDER_USER = {
  id: '1',
  name: 'João Silva',
  email: 'joao@email.com',
  apartment: '101',
  building: 'Torre A',
};

export default function ProfileScreen() {
  const { recommendations, reset } = useAppStore();
  const user = PLACEHOLDER_USER;

  const myRecs = useMemo(
    () => recommendations.filter((r) => r.userId === user.id),
    [recommendations, user.id],
  );

  const initials = useMemo(() => getInitials(user.name), [user.name]);

  return (
    <ScrollView style={s.container} contentContainerStyle={s.content}>
      <View style={s.header}>
        <View style={s.avatar}>
          <Text style={s.avatarText}>{initials}</Text>
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
        {/* Os valores abaixo serão obtidos do repositório de usuários em versão futura */}
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
      {myRecs.length > 0 ? (
        myRecs.map((r) => (
          <View key={r.id} style={s.rec}>
            <Text style={s.recProvider}>{r.provider.name}</Text>
            <Text style={s.recComment}>{r.comment}</Text>
          </View>
        ))
      ) : (
        <Text style={s.empty}>Nenhuma recomendação ainda</Text>
      )}

      <TouchableOpacity
        style={s.logoutBtn}
        onPress={reset}
        accessibilityRole="button"
        accessibilityLabel="Sair da conta"
      >
        <Text style={s.logoutBtnTxt}>Sair</Text>
      </TouchableOpacity>
    </ScrollView>
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
  logoutBtn: { marginTop: 24, backgroundColor: '#ef4444', borderRadius: 8, padding: 16, alignItems: 'center' },
  logoutBtnTxt: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
