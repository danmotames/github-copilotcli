import React from 'react';
import { View, Text, ScrollView, StyleSheet, Button } from 'react-native';
import { mockUsers, mockRecommendations } from '../services/mockData';
export default function ProfileScreen() {
  const user = mockUsers[0];
  const myRecs = mockRecommendations.filter(r => r.userId === user.id);
  return (
    <ScrollView style={s.container} contentContainerStyle={s.content}>
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
      <Text style={s.sectionTitle}>Minhas Recomendações</Text>
      {myRecs.length > 0 ? myRecs.map(r => <View key={r.id} style={s.rec}><Text style={s.recProvider}>{r.provider.name}</Text><Text style={s.recComment}>{r.comment}</Text></View>) : <Text style={s.empty}>Nenhuma recomendação ainda</Text>}
      <Button title="Sair" onPress={() => {}} />
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
});
