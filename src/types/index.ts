export interface FormatedAreaCodes {
  Localidad?: string
  Provincia: string
  Prefijo: string
}

export interface Search extends FormatedAreaCodes {
  code: string
}
