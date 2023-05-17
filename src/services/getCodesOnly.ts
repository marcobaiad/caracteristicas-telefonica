export const getCodesOnlyService = async (prefijo: string) => {
  const res = await fetch(
    `${process.env.API_URL}/area-codes/only?${prefijo}=""`
  )
  const data = await res.json()
  if (!res.ok) throw data
  return data
}
