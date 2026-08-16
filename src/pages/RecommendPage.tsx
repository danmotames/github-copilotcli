import React from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet, Button } from 'react-native';
import { colors, spacing, typography } from '../theme';
import { commonStyles } from '../theme/commonStyles';

export default function RecommendScreen() {
  return (
    <ScrollView style={commonStyles.screen} contentContainerStyle={commonStyles.screenContent}>
      <Text style={commonStyles.title}>Nova Recomendação</Text>
      <Text style={s.subtitle}>Compartilhe sua experiência com um prestador de serviço</Text>
      <View style={s.form}>
        <Text style={s.label}>Nome do Prestador</Text>
        <TextInput placeholder="Ex: Limpeza Total" style={commonStyles.formInput} />
        <Text style={s.label}>Categoria</Text>
        <TextInput placeholder="Selecione a categoria" style={commonStyles.formInput} />
        <Text style={s.label}>Telefone</Text>
        <TextInput placeholder="Ex: (11) 99999-9999" style={commonStyles.formInput} />
        <Text style={s.label}>Descrição</Text>
        <TextInput placeholder="Descreva os serviços" style={[commonStyles.formInput, commonStyles.formTextarea]} multiline />
        <Text style={s.label}>Avaliação</Text>
        <Text style={s.rating}>⭐⭐⭐⭐⭐</Text>
        <Text style={s.label}>Comentário</Text>
        <TextInput placeholder="Conte sua experiência..." style={[commonStyles.formInput, commonStyles.formTextarea]} multiline />
        <Button title="Enviar Recomendação" onPress={() => {}} />
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  subtitle: { ...typography.body, color: colors.textMuted, marginBottom: spacing.xl },
  form: { gap: spacing.md },
  label: { ...typography.label },
  rating: { fontSize: 24, color: colors.warning, marginBottom: spacing.sm },
});
