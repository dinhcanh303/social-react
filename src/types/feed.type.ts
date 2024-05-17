import { Attachment } from '@/models/Attachment'
import { Post } from '@/models/Post'
import { LikeInfo } from './like.type'
import { User } from '@/models/User'
import { Group } from '@/models/Group'

export interface FeedResponse {
  posts: PostMetadata[]
}
export interface PostMetadata {
  post: Post
  group?: Group
  user: User
  attachments: Attachment[]
  likes: LikeInfo
  countComments: number
}
