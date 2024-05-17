import { Post } from '@/models/Post'

export interface CreatePostRequest {
  post: {
    content?: string
    bgContent?: string
    status: number
    groupId?: string
  }
}
export interface CreatePostResponse {
  post: Post
}
