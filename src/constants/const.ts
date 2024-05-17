import icons from '@/assets/emotion-icon/index'
import { Group } from '@/models/Group'

export const image = 'https://i.pinimg.com/564x/bd/9e/ec/bd9eec0b67c0bb04f13d1a2c3d90e26d.jpg'
export const imageC =
  'https://media.licdn.com/dms/image/C5603AQFfO6uSUF_WMw/profile-displayphoto-shrink_200_200/0/1648873576841?e=1707955200&v=beta&t=BAC94HuRINOh4NXDpcMsgv7hQDwQjA7M7UX4eqLDjmk'

export const user = {
  id: '123235555',
  email: 'dinhcanhng303@gmail.com',
  avatar:
    'https://media.licdn.com/dms/image/C5603AQFfO6uSUF_WMw/profile-displayphoto-shrink_200_200/0/1648873576841?e=1707955200&v=beta&t=BAC94HuRINOh4NXDpcMsgv7hQDwQjA7M7UX4eqLDjmk',
  firstName: 'Ngo',
  lastName: 'Foden',
  fullName: 'Foden Ngo'
}
export const END_POINT_MINIO = 'https://minio.tlcmodular.com'
export const groupLikeIcons = [
  {
    name: 'like',
    icon: icons.LikeIcon
  },
  {
    name: 'heart',
    icon: icons.HeartIcon
  },
  {
    name: 'haha',
    icon: icons.HahaIcon
  },
  {
    name: 'smile',
    icon: icons.SmileIcon
  },
  {
    name: 'sad',
    icon: icons.SadIcon
  },
  {
    name: 'angry',
    icon: icons.AngryIcon
  }
]
export const ARRAY_VIDEO = ['mp4', 'webm', 'MOV', 'MP4']
export const ARRAY_IMAGE = ['png', 'jpg', 'jpeg', 'webp', 'svg']
export const ARRAY_IMAGE_VIDEO = [...ARRAY_IMAGE, ...ARRAY_VIDEO]
export const LIMIT_GROUP = 10
export const LIMIT_POST = 10
export const LIMIT_COMMENT = 10
export const LIMIT_NOTI = 10
export const GROUP_PREVIEW: Group = {
  id: 'id_example_123',
  name: 'Group Name',
  description: '',
  status: 2,
  userId: 'user_example',
  createdAt: 'created_at',
  updatedAt: 'updated_at'
}
export const ROLE_OWNER_GROUP_MEMBER = 'owner'
export const ROLE_ADMIN_GROUP_MEMBER = 'admin'
export const ROLE_MODERATOR_GROUP_MEMBER = 'moderator'
export const ROLE_USER_GROUP_MEMBER = 'moderator'
export const ATTACHMENT_POST = 'Post'
export const ATTACHMENT_COMMENT = 'Comment'
export const ATTACHMENT_AVATAR = 'Avatar'
export const ATTACHMENT_PROFILE = 'Profile'
export const UUID_NULL = '00000000-0000-0000-0000-000000000000'
export const BG_CONTENT = [
  'bg-gradient-to-tr from-cyan-600 via-red-200 to-teal-300',
  'bg-gradient-to-b from-rose-900 via-yellow-500 to-fuchsia-400',
  'bg-gradient-to-bl from-stone-400 via-fuchsia-500 to-lime-800',
  'bg-gradient-to-tr from-sky-300 via-slate-300 to-purple-100',
  'bg-gradient-to-br from-white via-stone-100 to-red-300'
]
