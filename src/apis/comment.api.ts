import {
  CreateCommentRequest,
  CreateCommentResponse,
  GetCommentsByCommentIdResponse,
  GetCommentsByPostIdResponse
} from '@/types/comment.type'
import { httpPrivate } from '@/utils/http'

export const createComment = (comment: CreateCommentRequest) =>
  httpPrivate.post<CreateCommentResponse>('/comments', comment)
export const getCommentsByPostId = (
  postId: string,
  limit: number | string,
  offset: number | string,
  signal?: AbortSignal
) =>
  httpPrivate.get<GetCommentsByPostIdResponse>(`/posts/${postId}/comments`, {
    params: {
      limit: limit,
      offset: offset
    },
    signal
  })
export const getCommentsByCommentId = (
  commentId: string,
  limit: number | string,
  offset: number | string,
  signal?: AbortSignal
) =>
  httpPrivate.get<GetCommentsByCommentIdResponse>(`/comments/${commentId}/comments`, {
    params: {
      limit: limit,
      offset: offset
    },
    signal
  })
