export interface LikeInfo {
  yourLike: number
  yourLikedEmoji: string
  othersLikes: number
  othersLikedEmojis: string[]
}

export interface CreateLikeRequest {
  like: {
    emoji: string
    likeableType: string
    likeableId?: string
  }
}
export interface CreateLikeResponse {
  like: {
    id: string
    emoji: string
    likeableType: string
    likeableId: string
    userId: string
    createdAt: string
    updatedAt: string
  }
}
