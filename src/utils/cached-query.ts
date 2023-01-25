export const cachedQuery = <T>(
  query: (...args: any[]) => T | Promise<T>,
  options: { name: string; getKey: (...args: any[]) => string }
) =>
  cachedFunction(query, {
    base: 'db',
    group: 'cache',
    swr: false,
    maxAge: 0,
    name: options.name,
    getKey: options.getKey,
  });
