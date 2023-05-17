export const normalizeString = (prov: string) =>
  prov.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
