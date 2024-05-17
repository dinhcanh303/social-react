import { User } from '@/models/User'

export interface SignInResponse {
  user: User
  accessToken: string
  refreshToken: string
}
export interface SignUpResponse {
  user: User
  accessToken: string
  refreshToken: string
}
export interface ProfileResponse {
  user: User
}
export interface GetUsersResponse {
  users: User[]
}
export interface SignInRequest {
  email: string
  password: string
}
export interface SignUpRequest {
  firstName: string
  lastName: string
  email: string
  password: string
}
export interface UpdateUserRequest {
  user: User
}
export interface UpdateUserResponse {
  user: User
}
