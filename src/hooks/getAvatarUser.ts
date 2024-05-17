import { END_POINT_MINIO } from "@/constants/const"
import { Group } from "@/models/Group"
import { User } from '@/models/User'
export const getAvatarUser = (user: User | null) => {
    if(!user)return ""
    return END_POINT_MINIO + user?.avatarUrl
}
export const getProfileGroup= (group: Group | undefined) => {
    if(!group)return ""
    return END_POINT_MINIO + group?.profileUrl
}