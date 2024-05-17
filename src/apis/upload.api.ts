import { Attachment } from '@/models/Attachment'
// import { CreateLikeRequest, CreatePostResponse } from '@/types/post.type'
import { GetAttachmentsByOptional, UpdateAttachmentByIdsRequest } from '@/types/upload.type'
import { httpPrivate, httpPrivateUpload } from '@/utils/http'

export const upload = (formData: FormData) => httpPrivateUpload.post<Attachment[]>('/uploads', formData)
// export const uploadAvatar = (files: CreateLikeRequest) =>
//   httpPrivateUpload.post<CreatePostResponse>('/uploads/avatar', files)
export const updateAttachmentsByIds = (attachments: UpdateAttachmentByIdsRequest) =>
  httpPrivate.post<Attachment[]>('/attachments', attachments)
export const getAttachmentsByOptional = (
  attachableType: string,
  mimeType?: string,
  userId?: string,
  entityUploadId?: string,
  signal?: AbortSignal
) =>
  httpPrivate.get<GetAttachmentsByOptional>('/optional/attachments', {
    params: {
      attachableType: attachableType,
      userId: userId,
      mimeType: mimeType,
      entityUploadId: entityUploadId
    },
    signal
  })
export const deleteAttachment = (id: string) => httpPrivate.delete<object>(`/attachments/${id}`)
export const deleteAttachments = (attachmentIds: string[]) =>
  httpPrivate.delete<object>(`/attachments`, {
    data: {
      attachmentIds: attachmentIds
    }
  })
