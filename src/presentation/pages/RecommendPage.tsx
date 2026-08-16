import React, { useState, useCallback, memo } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from 'react-native';

// ─── StarRating ──────────────────────────────────────────────────────────────

interface StarRatingProps {
  value: number;
  onChange: (rating: number) => void;
}

const StarRating = memo(({ value, onChange }: StarRatingProps) => (
  <View style={s.stars} accessibilityRole="adjustable" accessibilityLabel={`Avaliação: ${value} estrelas`}>
    {[1, 2, 3, 4, 5].map((star) => (
      <TouchableOpacity key={star} onPress={() => onChange(star)}>
        <Text style={[s.star, star <= value && s.starActive]}>★</Text>
      </TouchableOpacity>
    ))}
  </View>
));
StarRating.displayName = 'StarRating';

// ─── Form state & validation ─────────────────────────────────────────────────

interface FormState {
  providerName: string;
  category: string;
  phone: string;
  description: string;
  rating: number;
  comment: string;
}

interface FormErrors {
  providerName?: string;
  category?: string;
  comment?: string;
  rating?: string;
}

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.providerName.trim()) errors.providerName = 'Nome do prestador é obrigatório.';
  if (!form.category.trim()) errors.category = 'Categoria é obrigatória.';
  if (!form.comment.trim()) errors.comment = 'Comentário é obrigatório.';
  if (form.rating === 0) errors.rating = 'Selecione uma avaliação.';
  return errors;
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function RecommendScreen() {
  const [form, setForm] = useState<FormState>({
    providerName: '',
    category: '',
    phone: '',
    description: '',
    rating: 0,
    comment: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setField = useCallback(
    <K extends keyof FormState>(field: K, value: FormState[K]) => {
      setForm((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    },
    [],
  );

  const handleSubmit = useCallback(async () => {
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsSubmitting(true);
    try {
      // TODO: persist via repository
      await new Promise((resolve) => setTimeout(resolve, 800));
      Alert.alert('Sucesso', 'Recomendação enviada com sucesso!');
      setForm({ providerName: '', category: '', phone: '', description: '', rating: 0, comment: '' });
    } finally {
      setIsSubmitting(false);
    }
  }, [form]);

  return (
    <KeyboardAvoidingView
      style={s.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView style={s.container} contentContainerStyle={s.content} keyboardShouldPersistTaps="handled">
        <Text style={s.title}>Nova Recomendação</Text>
        <Text style={s.subtitle}>Compartilhe sua experiência com um prestador de serviço</Text>

        <View style={s.form}>
          {/* Provider name */}
          <Text style={s.label}>Nome do Prestador</Text>
          <TextInput
            placeholder="Ex: Limpeza Total"
            style={[s.input, errors.providerName && s.inputError]}
            value={form.providerName}
            onChangeText={(v) => setField('providerName', v)}
          />
          {errors.providerName && <Text style={s.errorMsg}>{errors.providerName}</Text>}

          {/* Category */}
          <Text style={s.label}>Categoria</Text>
          <TextInput
            placeholder="Selecione a categoria"
            style={[s.input, errors.category && s.inputError]}
            value={form.category}
            onChangeText={(v) => setField('category', v)}
          />
          {errors.category && <Text style={s.errorMsg}>{errors.category}</Text>}

          {/* Phone */}
          <Text style={s.label}>Telefone</Text>
          <TextInput
            placeholder="Ex: (11) 99999-9999"
            style={s.input}
            value={form.phone}
            onChangeText={(v) => setField('phone', v)}
            keyboardType="phone-pad"
          />

          {/* Description */}
          <Text style={s.label}>Descrição</Text>
          <TextInput
            placeholder="Descreva os serviços"
            style={[s.input, s.textarea]}
            value={form.description}
            onChangeText={(v) => setField('description', v)}
            multiline
          />

          {/* Rating */}
          <Text style={s.label}>Avaliação</Text>
          <StarRating value={form.rating} onChange={(r) => setField('rating', r)} />
          {errors.rating && <Text style={s.errorMsg}>{errors.rating}</Text>}

          {/* Comment */}
          <Text style={s.label}>Comentário</Text>
          <TextInput
            placeholder="Conte sua experiência..."
            style={[s.input, s.textarea, errors.comment && s.inputError]}
            value={form.comment}
            onChangeText={(v) => setField('comment', v)}
            multiline
          />
          {errors.comment && <Text style={s.errorMsg}>{errors.comment}</Text>}

          {/* Submit */}
          <TouchableOpacity
            style={[s.submitBtn, isSubmitting && s.submitBtnDisabled]}
            onPress={handleSubmit}
            disabled={isSubmitting}
            accessibilityRole="button"
            accessibilityLabel="Enviar recomendação"
          >
            {isSubmitting ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={s.submitTxt}>Enviar Recomendação</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  flex: { flex: 1 },
  container: { flex: 1, backgroundColor: '#f9fafb' },
  content: { padding: 16, paddingBottom: 100 },
  title: { fontSize: 24, fontWeight: '700', color: '#1f2937', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#6b7280', marginBottom: 24 },
  form: { gap: 12 },
  label: { fontSize: 14, fontWeight: '600', color: '#1f2937' },
  input: { backgroundColor: '#fff', borderRadius: 8, padding: 12, fontSize: 16, borderWidth: 1, borderColor: '#e5e7eb' },
  inputError: { borderColor: '#ef4444' },
  textarea: { minHeight: 100, textAlignVertical: 'top' },
  errorMsg: { fontSize: 12, color: '#ef4444', marginTop: -8 },
  stars: { flexDirection: 'row', gap: 8, marginBottom: 4 },
  star: { fontSize: 32, color: '#d1d5db' },
  starActive: { color: '#fbbf24' },
  submitBtn: { backgroundColor: '#3b82f6', borderRadius: 8, paddingVertical: 14, alignItems: 'center', marginTop: 8 },
  submitBtnDisabled: { opacity: 0.7 },
  submitTxt: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
