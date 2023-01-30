export function toMap<T extends { id: string }>(array: T[]): Record<string, Omit<T, 'id'>> {
  return array.reduce((map, elt) => {
    const { id, ...data } = elt;
    return { ...map, [elt.id]: data };
  }, {} as Record<string, Omit<T, 'id'>>);
}
