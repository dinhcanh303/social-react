import { SearchResponse } from '@/types/search.type'
import { httpPrivate } from '@/utils/http'

export const search = (search?: string) => httpPrivate.get<SearchResponse>(`/search?q=${search}`)
