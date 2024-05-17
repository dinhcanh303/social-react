import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { useEffect, useState } from 'react'
import AvatarUser from '@/components/social/avatar/AvatarUser'
import { RiImageAddFill } from 'react-icons/ri'
import EmojiPicker from '../emoji/EmojiPicker'
import { useAuth } from '@/hooks/useAuth'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { isAxiosError } from 'axios'
import toast from 'react-hot-toast'
import { CreatePostRequest } from '@/types/post.type'
import { createPost } from '@/apis/post.api'
import { Card } from 'primereact/card'
import FileUploadCustom from '@/components/file/FileUploadCustom'
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup'
import { ApiResponse } from '@/types/app'
import { deleteAttachments, updateAttachmentsByIds } from '@/apis/upload.api'
import { UpdateAttachmentByIdsRequest } from '@/types/upload.type'
import { useStateFeedStore } from '@/store/state-feed'
import { ATTACHMENT_POST, BG_CONTENT } from '@/constants/const'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import { PiSelectionBackgroundDuotone } from 'react-icons/pi'
interface CreatePostModalProps {
  groupId?: string
  setOpen: any
  open: any
}
  const schemaCreatePostValidation = yup.object({
    post: yup.object({
      status: yup.number().default(1),
    }).required(),
  })
const CreatePostModal: React.FC<CreatePostModalProps> = ({groupId, open, setOpen }) => {
  const {typeFeed} = useStateFeedStore()
  const { user } = useAuth()
  if (!user) return
  const placeHolder = `What's on your mind, ${user?.fullName}?`
  const [valueContent, setValueContent] = useState<string>("")
  const [valueBgContent, setValueBgContent] = useState<string|undefined>(undefined)
  const [valueEmoji, setValueEmoji] = useState<any>(null)
  const [isUploadFileVisible, setIsUploadFileVisible] = useState<boolean>(true)
  const [openBgContent, setOpenBgContent] = useState<boolean>(false)
  const [fileUploadedIds, setFileUploadedIds] = useState<string[]>([])
  const [statusPost,setStatusPost] = useState<number>(1)
  useEffect(() => {
    if (valueEmoji) {
      setValueContent((prevValue) => prevValue + valueEmoji as string) // Append valueEmoji to the existing value
      setValueEmoji(null) //Reset emoji 
    }
  }, [valueEmoji]);
  const queryClient = useQueryClient()
  const createPostMutation = useMutation({
    mutationFn: (body: CreatePostRequest) => {
      return createPost(body)
    },
    mutationKey: ['createPost']
  })
  // const errorForm = useMemo(() => {
  //   const error = createPostMutation.error
  //   if (isAxiosError<{ error: any }>(error)) {
  //     return error.response?.data.error
  //   }
  //   return undefined
  // }, [createPostMutation.error])
  const {
    // register,
    handleSubmit,
    formState: { //errors, 
    isSubmitting, isValid }
  } = useForm<CreatePostRequest>(
    {
      resolver: yupResolver(schemaCreatePostValidation),
      mode: "onChange"
    }
  )
  const handleSubmitForm = () => {
    handleSubmit(onSubmit)();
  }
  const onSubmit = (body: CreatePostRequest) => {
    if (isValid) {
      body.post.status = statusPost 
      body.post.groupId = groupId
      body.post.content = valueContent
      body.post.bgContent = valueBgContent
      createPostMutation.mutate(body, {
        onSuccess:async (res) => {
          if (res?.status === 200) {
            const post = res?.data?.post
            toast.success('Create Post Successfully!')
            setValueContent("")
            setValueEmoji(null);
            setValueBgContent(undefined)
            if(post?.id){
              const attachmentsInput : UpdateAttachmentByIdsRequest = {
                attachableId: post?.id,
                attachableType: ATTACHMENT_POST,
                attachmentIds: fileUploadedIds,
                entityUploadId: (typeFeed == 'group') ? groupId : undefined,
              }
              try {
                const resUpdatedAttachment = await updateAttachmentsByIds(attachmentsInput)
                if(resUpdatedAttachment.status !== 200){
                  toast.error("Upload attachments failed")
                }else{
                  queryClient.invalidateQueries({queryKey: [`feed`,typeFeed],exact: true})
                  setOpen(!open)
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
    
  }
  const footerContent = (
    <Button type='button' className='mt-[-12px] w-full rounded-lg' label='Post' loading={isSubmitting} onClick={handleSubmitForm} />
  )
  const handleDeleteAttachments = async (ids: string[]) => {
      try {
        const res = await deleteAttachments(ids)
        if(res.status === 200){
          toast.success("Delete attachment successfully")
          setFileUploadedIds([])
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
  const accept = () => {
    console.log(fileUploadedIds)
    if(fileUploadedIds){
      handleDeleteAttachments(fileUploadedIds)
    }
    setValueContent("")
    setValueBgContent(undefined)
    setOpen(false)
  }
  const reject = () => {
  }
  const confirm = () => {
    if(valueContent || fileUploadedIds.length > 0){
      confirmDialog({
        message: 'Are you sure you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        defaultFocus: 'accept',
        accept,
        reject
      });
    } else setOpen(false)
  };
  const handleOpenBgContent = () => {
    if(!isUploadFileVisible){
      if(openBgContent){
        setValueBgContent(undefined)
      }
      setOpenBgContent(!openBgContent)
    }else{
      toast.error("Please off option upload if you want using Content")
    }
  }
  const handleIsUploadFileVisible = () => {
    if(!openBgContent){
      setIsUploadFileVisible(true)
    }else{
      toast.error("Please off option content if you want using upload file")
    }
  }
  return (
    <div>
      <Dialog
        header='Create Post'
        headerClassName='text-center mb-[-16px]'
        visible={open}
        style={{ width: '42vw' }}
        onHide={confirm}
        footer={footerContent}
      >
        <AvatarUser type='status' />
        <div className='px-4 py-2'>
          <div className='flex justify-between align-middle items-center'>
            <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
              <textarea
                className='w-full border-none focus:border-transparent focus:border-none hover:border-none focus:outline-none'
                style={{
                  outline: 'none'
                }}
                value={valueContent}
                rows={1}
                placeholder={placeHolder}
                // {...register('post.title')}
                onChange={(e) => setValueContent(e.target.value)}
                />
                {/* {errors?.post?.title && <ErrorMessage message={errors?.post?.title?.message} />} */}
                {/* {errorForm?.post?.title && <ErrorMessage message={errorForm?.post?.title} />} */}
            </form>
            <EmojiPicker setValueEmoji={setValueEmoji} />
          </div>
        </div>
        <Card className={`relative bg-gray-200 p-[-4px] ${isUploadFileVisible ? 'block' : 'hidden'}`}>
          <i
              className='absolute top-0 pi pi-times right-0 p-2 bg-white rounded-full border hover:bg-gray-300'
              onClick={() => setIsUploadFileVisible(!isUploadFileVisible)}
            ></i>
          <FileUploadCustom onUploadComplete={setFileUploadedIds} />
        </Card>
        {openBgContent && (
          <div>
            <div className={`relative text-center ${valueBgContent} rounded-lg p-2`}>
              <i
                className='absolute top-0 pi pi-times right-0 p-2 bg-white rounded-full border hover:bg-gray-300'
                onClick={() => setOpenBgContent(!openBgContent)}
              ></i>
              <div className='h-80 flex justify-center align-middle items-center text-center px-2'>
                <p className='text-lg font-medium'>{valueContent}</p>
              </div>
            </div>
            <div className='flex gap-2 justify-center mt-2'>
              {BG_CONTENT.map(((bg,index )=> {
                return (
                  <div className={`${bg} w-8 h-8 rounded-lg ${bg === valueBgContent ? 'border border-blue-500' : ''}`} key={index} onClick={() => setValueBgContent(bg)}>
                  </div>
                )
              }))}
            </div>
          </div>
        )}
        <div className='mt-2 flex justify-between items-center border rounded-lg p-2'>
          <span>Add to your post:</span>
          <div className='flex'>
            <div
              className='cursor-pointer hover:bg-green-200 rounded-full bg-purple-100 p-2 text-lg mr-2 mt-1 text-purple-500'
              onClick={handleOpenBgContent}
            >
              <PiSelectionBackgroundDuotone />
            </div>
            <div
              className='cursor-pointer hover:bg-green-200 rounded-full bg-green-100 p-2 text-lg mr-2 mt-1 text-green-500'
              onClick={handleIsUploadFileVisible}
            >
              <RiImageAddFill />
            </div>
          </div>
        </div>
      </Dialog>
      <ConfirmDialog />
    </div>
  )
}

export default CreatePostModal
