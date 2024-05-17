import { useEffect, useState } from 'react'
import AvatarComment from '@/components/social/avatar/AvatarComment'
import { ARRAY_VIDEO, ATTACHMENT_COMMENT, END_POINT_MINIO, imageC } from '@/constants/const'
import { Tooltip } from 'primereact/tooltip'
import MentionUser from '@/components/social/MentionUser'
import { IoMdSend } from 'react-icons/io'
import EmojiPicker from '@/components/social/emoji/EmojiPicker'
import FileUploadIcon from '@/components/file/FileUploadIcon'
import { CreateCommentRequest } from '@/types/comment.type'
import { createComment } from '@/apis/comment.api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CommentHasMetadata } from '@/models/Comment'
import { isAxiosError } from 'axios'
import { ApiResponse } from '@/types/app'
import toast from 'react-hot-toast'
import { useAuth } from '@/hooks/useAuth'
import { getAvatarUser } from '@/hooks/getAvatarUser'
import FileUpload from '@/components/file/FileUpload'
import { Attachment } from '@/models/Attachment'
import { deleteAttachment, updateAttachmentsByIds } from '@/apis/upload.api'
import { UpdateAttachmentByIdsRequest } from '@/types/upload.type'
import { useStateFeedStore } from '@/store/state-feed'

interface CommentInputProps {
  hidden?: boolean
  extra?: boolean
  className?: string
  comment?: CommentHasMetadata
  postId: string
  replyObject?: {
    id?: string
    value?: string
  }
}
export interface CommentInput {
  tagIds?: string[]
  content: string
}

const CommentInput: React.FC<CommentInputProps> = ({replyObject, hidden = false, extra = false, className,postId, comment }) => {
  const {typeFeed} = useStateFeedStore()
  const {user} = useAuth()
  const [attachments,setAttachments] = useState<Attachment[] | null>(null)
  const avatarUser = getAvatarUser(user)
  const [open, setOpen] = useState<boolean>(extra)
  const [emoji, setEmoji] = useState<any>(null)
  const [tagIds,setTagIds] = useState<(string|null)[]>([])
  const [valueComment,setValueComment] = useState<string>(replyObject?.value ?? "")
  const queryClient = useQueryClient()
  useEffect(() => {
    if (emoji) {
      setValueComment((prevValue) => prevValue + emoji as string) // Append valueEmoji to the existing value
      setEmoji(null) //Reset emoji 
    }
  }, [emoji]);
  const createCommentMutation = useMutation({
    mutationFn: (body: CreateCommentRequest) => {
      return createComment(body)
    },
    mutationKey: ['createComment',postId]
  })
  const handleCreateComment = () => {
    let contentList = valueComment.split(" ")
    contentList = contentList?.filter(cmt => !cmt.includes("@"))
    const content = contentList.join(" ")
    let tagIdsReq = tagIds
    if(replyObject?.id){
      if(tagIds.includes(replyObject.id)){
        tagIdsReq = tagIdsReq.filter(tagId => tagId != replyObject.id)
      }
    }
    const body : CreateCommentRequest = {
      comment: {
        postId : postId,
        replyId: replyObject?.id,
        content: content,
        parentCommentId: replyObject === undefined ? comment?.id : comment?.parentCommentId,
        tagIds: tagIdsReq,
      }
    }
    createCommentMutation.mutate(body, {
      onSuccess:async (res) => {
        if (res?.status === 200) {
          const comment = res?.data?.comment
          toast.success('Create Comment Successfully!')
          setValueComment("")
          setEmoji(null);
          if(comment?.id){
            if(attachments) {
              const attachmentIds = attachments?.map(atm => atm?.id)
              const attachmentsInput : UpdateAttachmentByIdsRequest = {
                attachableId: comment?.id,
                attachableType: ATTACHMENT_COMMENT,
                attachmentIds: attachmentIds,
                entityUploadId: (typeFeed == 'group') ? 'group' : undefined,
              }
              try {
                const resUpdatedAttachment = await updateAttachmentsByIds(attachmentsInput)
                if(resUpdatedAttachment.status !== 200){
                  toast.error("Upload attachments failed")
                }else {
                  setAttachments(null)
                  setValueComment("")
                }
              } catch (error) {
                if (isAxiosError<ApiResponse>(error)) {
                  if (error?.response?.data?.message) {
                    toast.error(error?.response?.data?.message)
                  } else {
                    toast.error(error.message)
                  }
                }
              }
            }
          }
          queryClient.invalidateQueries({queryKey: [`comments`,postId],exact: true})
        }
      },
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
  const handleDeleteAttachment = async (id: string) => {
    if(id){
      try {
        const res = await deleteAttachment(id)
        if(res.status === 200){
          toast.success("Delete attachment successfully")
          setAttachments(null)
        }
      } catch (error) {
        if (isAxiosError<ApiResponse>(error)) {
          if (error?.response?.data?.message) {
              toast.error(error?.response?.data?.message)
          } else {
              toast.error(error.message)
          }
        }
      }
    }
  }
  return (
    <>
      <div className={`flex p-2 justify-evenly ${hidden ? 'hidden' : ''} ${className}`}>
        <AvatarComment image={avatarUser} />
        <div className={`w-full`}>
          <div className={`${open ? '' : 'flex justify-between'} px-3 py-2.5 items-center rounded-lg bg-slate-100`}>
            <span className={`text-sm text-left w-full ${open ? 'hidden' : ''}`} onClick={() => setOpen(true)}>
              Write a comment...
            </span>
            <MentionUser hidden={!open} value={valueComment} setValue={setValueComment} setTagIds={setTagIds}/>
            {attachments && (
              attachments.map(attachment => {
                return (
                  <div key={attachment.id} className='w-24 h-24 bg-white rounded-lg p-2 relative'>
                    <span className='absolute right-0 top-0 text-red-400 hover:text-red-700 text-sm'
                    onClick={() =>handleDeleteAttachment(attachment?.id)}
                    >
                      <i className='pi pi-times'></i>
                    </span>
                    {ARRAY_VIDEO.includes(attachment?.extension) ? (<video 
                          className='w-full h-full object-cover'
                          controls
                          >
                              <source src={END_POINT_MINIO + attachment?.url} 
                              type={attachment?.mimeType}/>
                          </video>) : 
                    (<img src={END_POINT_MINIO + attachment?.url} alt={attachment.fileName} className='w-full h-full object-cover'/>)}
                    
                  </div>
                )
              })
            )}
            <div className={`${open ? 'flex justify-between' : ''}`}>
              <div className={`flex mx-1 gap-1 items-center`}>
                <EmojiPicker setValueEmoji={setEmoji} />
                {!attachments && (<FileUpload className='w-5 h-5' icon='pi pi-camera' rounded onUploaded={setAttachments} onOpenWriteComment={setOpen} />)}
              </div>
              <div
                className={`text-blue-500 text-lg p-1 items-center rounded-full hover:bg-gray-200 ${
                  open ? '' : 'hidden'
                }`}
                onClick={handleCreateComment}
              >
                <i
                  className='cursor-pointer target-send-comment-icon'
                  data-pr-tooltip='Comment'
                  data-pr-position='top'
                >
                  <IoMdSend />
                </i>
              </div>
              <Tooltip className='text-xs' target='.target-send-comment-icon' />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default CommentInput
