import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

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
  phone?: string;
  description?: string;
  rating?: string;
  comment?: string;
}

function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <View style={sr.row}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity
          key={star}
          onPress={() => onChange(star)}
          accessibilityRole="button"
          accessibilityLabel={`${star} estrela${star > 1 ? 's' : ''}`}
        >
          <Text style={[sr.star, value >= star && sr.filled]}>★</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const sr = StyleSheet.create({
  row: { flexDirection: 'row', marginBottom: 8 },
  star: { fontSize: 32, color: '#d1d5db', marginRight: 4 },
  filled: { color: '#fbbf24' },
});

const initialForm: FormState = {
  providerName: '',
  category: '',
  phone: '',
  description: '',
  rating: 0,
  comment: '',
};

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.providerName.trim()) errors.providerName = 'Nome do prestador é obrigatório.';
  if (!form.category.trim()) errors.category = 'Categoria é obrigatória.';
  if (!form.phone.trim()) errors.phone = 'Telefone é obrigatório.';
  if (!form.description.trim()) errors.description = 'Descrição é obrigatória.';
  if (form.rating === 0) errors.rating = 'Selecione uma avaliação.';
  if (!form.comment.trim()) errors.comment = 'Comentário é obrigatório.';
  return errors;
}

export default function RecommendScreen() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  async function handleSubmit() {
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsSubmitting(true);
    try {
      // Simula envio assíncrono
      await new Promise<void>((resolve) => setTimeout(resolve, 1000));
      setSubmitted(true);
      setForm(initialForm);
      setErrors({});
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView style={s.container} contentContainerStyle={s.content}>
        <Text style={s.title}>Nova Recomendação</Text>
        <Text style={s.subtitle}>Compartilhe sua experiência com um prestador de serviço</Text>

        {submitted && (
          <View style={s.successBanner}>
            <Text style={s.successText}>✅ Recomendação enviada com sucesso!</Text>
          </View>
        )}

        <View style={s.form}>
          <Text style={s.label}>Nome do Prestador</Text>
          <TextInput
            placeholder="Ex: Limpeza Total"
            style={[s.input, errors.providerName ? s.inputError : null]}
            value={form.providerName}
            onChangeText={(v) => setField('providerName', v)}
          />
          {errors.providerName && <Text style={s.errorMsg}>{errors.providerName}</Text>}

          <Text style={s.label}>Categoria</Text>
          <TextInput
            placeholder="Ex: limpeza"
            style={[s.input, errors.category ? s.inputError : null]}
            value={form.category}
            onChangeText={(v) => setField('category', v)}
          />
          {errors.category && <Text style={s.errorMsg}>{errors.category}</Text>}

          <Text style={s.label}>Telefone</Text>
          <TextInput
            placeholder="Ex: (11) 99999-9999"
            style={[s.input, errors.phone ? s.inputError : null]}
            value={form.phone}
            onChangeText={(v) => setField('phone', v)}
            keyboardType="phone-pad"
          />
          {errors.phone && <Text style={s.errorMsg}>{errors.phone}</Text>}

          <Text style={s.label}>Descrição</Text>
          <TextInput
            placeholder="Descreva os serviços"
            style={[s.input, s.textarea, errors.description ? s.inputError : null]}
            value={form.description}
            onChangeText={(v) => setField('description', v)}
            multiline
          />
          {errors.description && <Text style={s.errorMsg}>{errors.description}</Text>}

          <Text style={s.label}>Avaliação</Text>
          <StarRating value={form.rating} onChange={(v) => setField('rating', v)} />
          {errors.rating && <Text style={s.errorMsg}>{errors.rating}</Text>}

          <Text style={s.label}>Comentário</Text>
          <TextInput
            placeholder="Conte sua experiência..."
            style={[s.input, s.textarea, errors.comment ? s.inputError : null]}
            value={form.comment}
            onChangeText={(v) => setField('comment', v)}
            multiline
          />
          {errors.comment && <Text style={s.errorMsg}>{errors.comment}</Text>}

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
              <Text style={s.submitBtnTxt}>Enviar Recomendação</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },
  content: { padding: 16, paddingBottom: 100 },
  title: { fontSize: 24, fontWeight: '700', color: '#1f2937', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#6b7280', marginBottom: 24 },
  successBanner: { backgroundColor: '#dcfce7', borderRadius: 8, padding: 12, marginBottom: 16 },
  successText: { color: '#166534', fontSize: 14, fontWeight: '600' },
  form: { gap: 12 },
  label: { fontSize: 14, fontWeight: '600', color: '#1f2937' },
  input: { backgroundColor: '#fff', borderRadius: 8, padding: 12, fontSize: 16, borderWidth: 1, borderColor: '#e5e7eb' },
  inputError: { borderColor: '#ef4444' },
  errorMsg: { fontSize: 12, color: '#ef4444', marginTop: -8 },
  textarea: { minHeight: 100, textAlignVertical: 'top' },
  submitBtn: { backgroundColor: '#3b82f6', borderRadius: 8, padding: 16, alignItems: 'center', marginTop: 8 },
  submitBtnDisabled: { opacity: 0.6 },
  submitBtnTxt: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
