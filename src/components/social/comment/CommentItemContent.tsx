import { ARRAY_VIDEO, END_POINT_MINIO, UUID_NULL } from '@/constants/const'
import AvatarComment from '@/components/social/avatar/AvatarComment'
import CommentInput from '@/components/social/comment/CommentInput'
import { useState } from 'react'
import { CommentHasMetadata } from '@/models/Comment'
import moment from 'moment'
import EmojiGroupLike from '../emoji/EmojiGroupLike'
import { CreateLikeRequest } from '@/types/like.type'
import { useMutation } from '@tanstack/react-query'
import { createLike } from '@/apis/like.api'
import { getIcon, getName } from '@/utils/utils'
import { isAxiosError } from 'axios'
import { ApiResponse } from '@/types/app'
import toast from 'react-hot-toast'
import EmojiImage from '../emoji/EmojiImage'

interface CommentItemContentProps {
  isChildren?: boolean
  className?: string
  comment?: CommentHasMetadata
  postId: string
}
export interface ReplyObject {
  id?: string
  value?: string
}

const CommentItemContent: React.FC<CommentItemContentProps> = ({ className, isChildren = false, comment, postId }) => {
  const likeInfo = comment?.likes
  const othersLikedEmojis = likeInfo?.othersLikedEmojis
  const totalLike = likeInfo?.yourLike ?? 0 + (likeInfo?.othersLikes ?? 0)
  const yourLikedEmoji = likeInfo?.yourLikedEmoji
  const [open, setOpen] = useState<boolean>(true)
  const [emoji, setEmoji] = useState<string | null>(yourLikedEmoji ? yourLikedEmoji : null)
  const commentId = comment?.id
  const likeableType = 'Like/Comment'
  const handleRenderLiked = () => {
    return (
      <div>
        {othersLikedEmojis &&
          othersLikedEmojis.map((emoji, index) => {
            const alt = getName(emoji)
            const src = getIcon(emoji)
            return <img key={`emoji-comment-${index}-${commentId}`} height={15} width={15} alt={alt} src={src} />
          })}
      </div>
    )
  }
  const createLikeMutation = useMutation({
    mutationFn: (body: CreateLikeRequest) => {
      return createLike(body)
    },
    mutationKey: ['createLike', likeableType, commentId]
  })
  const handleCreateLike = () => {
    const body: CreateLikeRequest = {
      like: {
        likeableId: commentId,
        likeableType: likeableType,
        emoji: emoji ?? 'like'
      }
    }
    setEmoji((prevEmoji) => {
      if (prevEmoji && emoji && prevEmoji == emoji) {
        return null
      }
      return 'like'
    })
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
  const userCreated = comment?.user
  const attachments = comment?.attachments
  const timeCreated = moment(new Date(comment?.createdAt ?? 0)).fromNow()
  const initialReplyObject = isChildren
    ? {
        id: userCreated?.id,
        value: '@' + userCreated?.fullName
      }
    : undefined
  let replyValue = null
  let tagValue = null
  if (comment?.replyId != UUID_NULL) {
    replyValue = (
      <a className='font-semibold text-base text-blue-500 hover:text-blue-600' href={`/profile?id=${comment?.replyId}`}>
        {'@' + comment?.replyName + ' '}
      </a>
    )
  }
  if (comment?.tagIds && comment.tagNames && comment?.tagIds.length > 0) {
    const tagNames = comment?.tagNames
    if (tagNames) {
      tagValue = comment.tagIds.map((tagId, index) => (
        <a
          className='font-semibold text-sm text-blue-500 hover:text-blue-600'
          key={index}
          href={`/profile?id=${tagId}`}
        >
          {'@' + tagNames[index] + ' '}
        </a>
      ))
    }
  }
  return (
    <>
      <div className={`flex justify-start ${className} ${isChildren ? 'ml-10' : ''}`}>
        <AvatarComment image={END_POINT_MINIO + userCreated?.avatarUrl ?? ''} />
        <div>
          <div className='relative rounded-lg bg-slate-100 p-2'>
            <span className='cursor-pointer font-semibold'>{userCreated?.fullName}</span>
            <p className='text-sm'>
              {replyValue && replyValue}
              {tagValue && tagValue}
              {comment?.content}
            </p>
            <div className='absolute -right-3 -bottom-2 flex items-center justify-center'>
              <span className='mr-1 flex'>{handleRenderLiked()}</span>
              <p className='text-xs'>{totalLike > 0 ? totalLike : ''}</p>
            </div>
          </div>
          <div className='flex text-xs mx-2 mt-1 items-center'>
            <span className='cursor-pointer '>{timeCreated}</span>
            <span
              className={`tooltip-like-btn-comment-${commentId} cursor-pointer hover:border-b hover:border-gray-500 mx-2 font-medium`}
              onClick={handleCreateLike}
            >
              {emoji == null ? (
                <p>Like</p>
              ) : (
                <EmojiImage
                  height={15}
                  width={15}
                  className={`${emoji ? '' : 'hidden'}`}
                  name={getName(emoji)}
                  src={getIcon(emoji)}
                />
              )}
            </span>
            <EmojiGroupLike
              entityId={commentId}
              likeableType={'Like/Comment'}
              target={`.tooltip-like-btn-comment-${commentId}`}
              setEmoji={setEmoji}
            />
            <span
              className='cursor-pointer hover:border-b hover:border-gray-500 font-medium'
              onClick={() => setOpen(!open)}
            >
              Reply
            </span>
          </div>
          {attachments &&
            attachments?.length > 0 &&
            attachments.map((attachment) => {
              return (
                <div key={attachment.id} className='w-24 h-24 bg-white rounded-lg p-2 relative'>
                  {/* <span className='absolute right-0 top-0 text-red-400 hover:text-red-700 text-sm'
                    onClick={() =>handleDeleteAttachment(attachment?.id)}
                    >
                      <i className='pi pi-times'></i>
                    </span> */}
                  {ARRAY_VIDEO.includes(attachment?.extension) ? (
                    <video className='w-full h-full object-cover' controls>
                      <source src={END_POINT_MINIO + attachment?.url} type={attachment?.mimeType} />
                    </video>
                  ) : (
                    <img
                      src={END_POINT_MINIO + attachment?.url}
                      alt={attachment.fileName}
                      className='w-full h-full object-cover'
                    />
                  )}
                </div>
              )
            })}
          <CommentInput
            key={commentId}
            replyObject={initialReplyObject}
            hidden={open}
            extra={true}
            postId={postId}
            comment={comment}
          />
        </div>
      </div>
    </>
  )
}

export default CommentItemContent
