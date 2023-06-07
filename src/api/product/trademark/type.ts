export interface responseData {
  code: number
  message: string
  ok: boolean
}

export interface tradmerk {
  id?: number
  tmName: string
  logoUrl: string
}

export type recordsData = tradmerk[]

export interface trademarkResponseData extends responseData {
  data: {
    current: number
    pages: number
    records: recordsData
    size: number
    searchCount: boolean
    total: number
  }
}
