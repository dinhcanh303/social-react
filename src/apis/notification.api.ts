import { GetNotificationRequest, GetNotificationsResponse } from '@/types/noti.type'
import { httpPrivate } from '@/utils/http'

export const getNotifications = (input: GetNotificationRequest, signal?: AbortSignal) =>
  httpPrivate.get<GetNotificationsResponse>(`/notifications`, {
    params: input,
    signal
  })

export const readNotification = (id: string | number) => httpPrivate.put<object>(`/notifications/${id}`)
