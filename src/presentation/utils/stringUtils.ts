export function getInitials(name: string): string {
  if (!name || name.trim().length === 0) return '?';
  return name
    .trim()
    .split(/\s+/)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}
