import { CreateLikeRequest, CreateLikeResponse } from '@/types/like.type'
import { httpPrivate } from '@/utils/http'

export const createLike = (like: CreateLikeRequest) => httpPrivate.post<CreateLikeResponse>('/likes', like)
