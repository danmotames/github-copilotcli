import React from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet, Button } from 'react-native';
export default function RecommendScreen() {
  return (
    <ScrollView style={s.container} contentContainerStyle={s.content}>
      <Text style={s.title}>Nova Recomendação</Text>
      <Text style={s.subtitle}>Compartilhe sua experiência com um prestador de serviço</Text>
      <View style={s.form}>
        <Text style={s.label}>Nome do Prestador</Text>
        <TextInput placeholder="Ex: Limpeza Total" style={s.input} />
        <Text style={s.label}>Categoria</Text>
        <TextInput placeholder="Selecione a categoria" style={s.input} />
        <Text style={s.label}>Telefone</Text>
        <TextInput placeholder="Ex: (11) 99999-9999" style={s.input} />
        <Text style={s.label}>Descrição</Text>
        <TextInput placeholder="Descreva os serviços" style={[s.input, s.textarea]} multiline />
        <Text style={s.label}>Avaliação</Text>
        <Text style={s.rating}>⭐⭐⭐⭐⭐</Text>
        <Text style={s.label}>Comentário</Text>
        <TextInput placeholder="Conte sua experiência..." style={[s.input, s.textarea]} multiline />
        <Button title="Enviar Recomendação" onPress={() => {}} />
      </View>
    </ScrollView>
  );
}
const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },
  content: { padding: 16, paddingBottom: 100 },
  title: { fontSize: 24, fontWeight: '700', color: '#1f2937', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#6b7280', marginBottom: 24 },
  form: { gap: 12 },
  label: { fontSize: 14, fontWeight: '600', color: '#1f2937' },
  input: { backgroundColor: '#fff', borderRadius: 8, padding: 12, fontSize: 16, borderWidth: 1, borderColor: '#e5e7eb' },
  textarea: { minHeight: 100 },
  rating: { fontSize: 24, color: '#fbbf24', marginBottom: 8 },
});
