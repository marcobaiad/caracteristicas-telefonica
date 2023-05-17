export const getCodesByPrefijoService = async (areaCode: string) => {
  const res = await fetch(
    `${process.env.API_URL}/area-codes/by?Prefijo=${areaCode}`
  )
  const data = await res.json()
  if (!res.ok) throw data
  return data
}
