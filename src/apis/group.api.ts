import {
  CreateGroupRequest,
  CreateGroupResponse,
  GetGroupMembersResponse,
  GetGroupResponse,
  GetGroupsResponse,
  UpdateGroupRequest,
  UpdateGroupResponse
} from '@/types/group.type'
import { httpPrivate } from '@/utils/http'

export const getGroups = (userId: string, limit: number | string, offset: number | string, signal?: AbortSignal) =>
  httpPrivate.get<GetGroupsResponse>(`/users/${userId}/groups`, {
    params: {
      limit: limit,
      offset: offset
    },
    signal
  })
export const getGroup = (groupId?: string) => httpPrivate.get<GetGroupResponse>(`/groups/${groupId}`)
export const createGroup = (group: CreateGroupRequest) => httpPrivate.post<CreateGroupResponse>(`/groups`, group)
export const updateGroup = (group: UpdateGroupRequest) =>
  httpPrivate.put<UpdateGroupResponse>(`/groups/${group.group.id}`, group)
export const getGroupMembers = (groupId?: string) =>
  httpPrivate.get<GetGroupMembersResponse>(`/group-members/${groupId}`)
