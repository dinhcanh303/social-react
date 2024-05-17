export interface SearchResponse {
  searches: Search[]
}
export interface Search {
  id: string
  name: string
  email: string
  fullName: string
  nickName: string
  position: string
  avatarUrl: string
  profileUrl: string
}
