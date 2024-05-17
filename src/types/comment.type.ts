import { Comment, CommentHasChildren, CommentHasMetadata } from '@/models/Comment'

export interface CreateCommentRequest {
  comment: {
    postId: string
    content: string
    parentCommentId?: string
    replyId?: string
    tagIds?: (string | null)[]
  }
}
export interface CreateCommentResponse {
  comment: Comment
}
export interface GetCommentsByPostIdResponse {
  comments: CommentHasChildren[]
}
export interface GetCommentsByCommentIdResponse {
  comments: CommentHasMetadata[]
}
