import { groupLikeIcons } from '@/constants/const'
import axios, { AxiosError } from 'axios'
import moment from 'moment'
import { useSearchParams } from 'react-router-dom'

export const useParamsString = () => {
  const [searchParams] = useSearchParams()
  const searchParamsObject = Object.fromEntries([...searchParams])
  return searchParamsObject
}
export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error)
}

export function capitalizeWord(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1)
}
export function getObjectIconByName(name: string) {
  const result = groupLikeIcons.find((icon) => icon.name === name)
  if (!result) return null
  return result
}
export function convertStatus(status: number | undefined):string | undefined {
  if(status === undefined) return undefined
  const statuses: Record<number, string> = {
    1: "public",
    2: "friends",
    3: "private",
  };
  return statuses[status];
}
export function convertStatusCreateGroup(status: string | number):number | string {
  const statuses: Record<string, number> = {
    "Public" : 1,
    "Private" : 2,
  };
  return statuses[status];
}

export function convertEmojiLike(nameEmoji: string):string {
  const emojis: Record<string, string> = {
    "like": "👍",
    "heart": "🧡",
    "haha": "😀",
    "smile": "🥰",
    "sad": "😂",
    "angry": "😡",
  };
  return emojis[nameEmoji];
}

export function getAttachmentTypeByTypeFeed(typeFeed:string){
  const types : Record<string,string> = {
    "default" : "User/Post",
    "group": "Group/Post",
    "profile" : "User/Post"
  }
  return types[typeFeed];
}

export function getAttachmentMimeType(type:string){
  const types : Record<string,string> = {
    "photo" : "image",
    "video": "video",
    "file" : "file",
  }
  return types[type];
}
export function getRoleGroupMember(type: number) {
  const types : Record<number,string> = {
    1 : "Owner",
    2: "Admin",
    3 : "Moderator",
    4 : ""
  }
  return types[type];
}
export const getName = (emoji: string | null) => {
  return getObjectIconByName(emoji ?? "")?.name ?? ""
}
export const getIcon = (emoji: string | null) => {
  return getObjectIconByName(emoji ?? "")?.icon ?? ""
}
