import { FeedResponse } from '@/types/feed.type'
import { httpPrivate } from '@/utils/http'

export const getFeed = (limit: number | string, offset: number | string, signal?: AbortSignal) =>
  httpPrivate.get<FeedResponse>('/feed', {
    params: {
      limit: limit,
      offset: offset
    },
    signal
  })
export const getFeedProfile = (
  userId?: string,
  limit?: number | string,
  offset?: number | string,
  signal?: AbortSignal
) =>
  httpPrivate.get<FeedResponse>(`/users/${userId}/feed`, {
    params: {
      limit: limit,
      offset: offset
    },
    signal
  })
export const getFeedGroup = (
  groupId?: string,
  limit?: number | string,
  offset?: number | string,
  signal?: AbortSignal
) =>
  httpPrivate.get<FeedResponse>(`/groups/${groupId}/feed`, {
    params: {
      limit: limit,
      offset: offset
    },
    signal
  })
export const getFeedGroups = (limit: number | string, offset: number | string, signal?: AbortSignal) =>
  httpPrivate.get<FeedResponse>(`/groups/feed`, {
    params: {
      limit: limit,
      offset: offset
    },
    signal
  })
