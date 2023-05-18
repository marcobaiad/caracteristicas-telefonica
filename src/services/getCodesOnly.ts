export const getCodesOnlyService = async (prefijo: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/area-codes/only?${prefijo}=""`
  )
  const data = await res.json()
  if (!res.ok) throw data
  return data
}
