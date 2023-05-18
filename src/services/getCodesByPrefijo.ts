export const getCodesByPrefijoService = async (areaCode: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/area-codes/by?Prefijo=${areaCode}`
  )
  const data = await res.json()
  if (!res.ok) throw data
  return data
}
