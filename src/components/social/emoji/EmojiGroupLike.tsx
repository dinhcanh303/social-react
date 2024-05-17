import { Tooltip } from 'primereact/tooltip'
import EmojiImage from './EmojiImage'
import { groupLikeIcons } from '@/constants/const'
import { ApiResponse } from '@/types/app'
import { isAxiosError } from 'axios'
import toast from 'react-hot-toast'
import { CreateLikeRequest } from '@/types/like.type'
import { createLike } from '@/apis/like.api'
import { useMutation } from '@tanstack/react-query'

interface EmojiGroupLikeProps {
  setEmoji?: any
  entityId?: string
  target?:string
  likeableType?:string
}

const EmojiGroupLike: React.FC<EmojiGroupLikeProps> = ({ entityId, setEmoji,target,likeableType = "Like/Post" }) => {
  const createLikeMutation = useMutation({
    mutationFn: (body: CreateLikeRequest) => {
      return createLike(body)
    },
    mutationKey: ['createLike',likeableType,entityId]
  })
  const handleCreateLike = (emoji:string) => {
    const body : CreateLikeRequest = {
      like: {
        likeableId: entityId,
        likeableType: likeableType,
        emoji: emoji
      }
    }
    setEmoji(emoji)
    createLikeMutation.mutate(body, {
      onError: (error) => {
        if (isAxiosError<ApiResponse>(error)) {
          if (error?.response?.data?.message) {
            toast.error(error?.response?.data?.message)
          } else {
            toast.error(error.message)
          }
        }
      }
    })
  }
  return (
    <>
      <Tooltip className='rounded-xl' target={target} autoHide={false} position='top'>
        <div className='flex gap-2'>
          {groupLikeIcons &&
            groupLikeIcons.map((value, index) => {
              return <EmojiImage key={`tool-tip-${entityId ?? ""}-${index}-${likeableType}`} name={value.name} src={value.icon} onClick={() => handleCreateLike(value.name)} />
            })}
        </div>
      </Tooltip>
    </>
  )
}
export default EmojiGroupLike
