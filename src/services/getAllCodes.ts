export const getAllCodesService = async () => {
  const res = await fetch(`api/area-codes`)
  const data = await res.json()
  if (!res.ok) throw data
  return data
}
