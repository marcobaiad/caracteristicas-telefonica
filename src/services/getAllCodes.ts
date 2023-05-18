export const getAllCodesService = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/area-codes`)
  const data = await res.json()
  if (!res.ok) throw data
  return data
}
