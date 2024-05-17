import { Notification } from '@/models/Notification'

export interface GetNotificationsResponse {
  notifications: Notification[]
}
export interface GetNotificationRequest {
  limit: string | number
  offset: string | number
  options: boolean
}
