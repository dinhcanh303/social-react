import { CreatePostRequest, CreatePostResponse } from '@/types/post.type'
import { httpPrivate } from '@/utils/http'

export const createPost = (post: CreatePostRequest) => httpPrivate.post<CreatePostResponse>('/posts', post)
export const deletePost = (id: number | string) => httpPrivate.delete<object>(`/posts/${id}`)
