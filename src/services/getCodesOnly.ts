export const getCodesOnlyService = async (prefijo: string) => {
  const res = await fetch(`api/area-codes/only?${prefijo}=""`)
  const data = await res.json()
  if (!res.ok) throw data
  return data
}
