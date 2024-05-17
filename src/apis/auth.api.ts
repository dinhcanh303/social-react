import {
  GetUsersResponse,
  ProfileResponse,
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  UpdateUserRequest
} from '@/types/auth.type'
import { http, httpPrivate } from '@/utils/http'

export const signIn = (signIn: SignInRequest) => http.post<SignInResponse>('/auth/signin', signIn)
export const signUp = (signUp: SignUpRequest) => http.post<SignInRequest>('/auth/signup', signUp)
export const getProfile = (id?: string) => httpPrivate.get<ProfileResponse>(`/profile?id=${id ?? ''}`)
export const updateUser = (user: UpdateUserRequest) =>
  httpPrivate.put<ProfileResponse>(`/users/${user?.user?.id}`, user)
export const getUsers = (search?: string, limit?: number | string, offset?: number | string, signal?: AbortSignal) =>
  httpPrivate.get<GetUsersResponse>('/users', {
    params: {
      search: search,
      limit: limit,
      offset: offset
    },
    signal
  })
export const getUsersInviteGroup = (
  groupId?: string,
  limit?: number | string,
  offset?: number | string,
  signal?: AbortSignal
) =>
  httpPrivate.get<GetUsersResponse>(`/users/${groupId}/invite`, {
    params: {
      limit: limit ?? 500,
      offset: offset
    },
    signal
  })
export const getUsersBirthdayByCurrentMonth = () => httpPrivate.get<GetUsersResponse>('/users/current-month/birthdays')

export const getUsersBirthdayByCurrentDay = () => httpPrivate.get<GetUsersResponse>('/users/current-day/birthdays')
