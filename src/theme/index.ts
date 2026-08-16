export const colors = {
  // Brand
  primary: '#3b82f6',
  primaryDark: '#1d4ed8',
  primaryLight: '#dbeafe',

  // Neutrals
  background: '#f9fafb',
  surface: '#ffffff',
  border: '#e5e7eb',

  // Text
  textPrimary: '#1f2937',
  textSecondary: '#374151',
  textMuted: '#6b7280',
  textPlaceholder: '#9ca3af',

  // Accent
  warning: '#fbbf24',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  tabBarHeight: 100,
};

export const radii = {
  sm: 6,
  md: 8,
  lg: 12,
  full: 9999,
};

export const typography = {
  title: { fontSize: 24, fontWeight: '700' as const, color: colors.textPrimary },
  subtitle: { fontSize: 20, fontWeight: '700' as const, color: colors.textPrimary },
  sectionTitle: { fontSize: 18, fontWeight: '600' as const, color: colors.textPrimary },
  body: { fontSize: 16, color: colors.textSecondary },
  bodySmall: { fontSize: 14, color: colors.textSecondary },
  caption: { fontSize: 12, color: colors.textMuted },
  label: { fontSize: 14, fontWeight: '600' as const, color: colors.textPrimary },
};

export const shadow = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
};
