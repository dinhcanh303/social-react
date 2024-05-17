import { Attachment } from "@/models/Attachment"

export interface UploadResponse {
  id: string
  attachableType: string
  attachableId: string
  userId: string
  fileName: string
  extension: string
  mimeType: string
  folder: string
  url: string
  urlThumbnails: string
  createdAt: string
  updatedAt: string
}
export interface GetAttachmentsByOptional {
  attachments: Attachment[]
}

export interface UpdateAttachmentByIdsRequest {
  attachmentIds?: string[]
  attachableType?: string
  attachableId?: string
  entityUploadId?: string
}
