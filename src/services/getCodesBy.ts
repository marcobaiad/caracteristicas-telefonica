type Args = {
  [key: string]: string
}

export const getCodesByService = async (args: Args) => {
  const urlParams = new URLSearchParams(args as Record<string, string>)
  const res = await fetch(`api/area-codes/by?${urlParams}`)
  const data = await res.json()
  if (!res.ok) throw data
  return data
}
