import { Group } from '@/models/Group'
import { GroupMemberMetadata } from '@/models/GroupMember'

export interface GetGroupsResponse {
  groups: Group[]
}
export interface GetGroupResponse {
  group: Group
  countGroupMembers: number
  roleGroupMember: string
}

export interface CreateGroupRequest {
  group: {
    name: string
    description?: string
    status: number | string
    userIds?: string[]
  }
}
export interface UpdateGroupRequest {
  group: Group
}
export interface UpdateGroupResponse {
  group: Group
}
export interface CreateGroupResponse {
  group: Group
}

export interface GetGroupMembersResponse {
  groupMembers: GroupMemberMetadata[]
}
