import { updateUser } from "@/apis/auth.api"
import { updateGroup } from "@/apis/group.api"
import { deleteAttachment, getAttachmentsByOptional, updateAttachmentsByIds } from "@/apis/upload.api"
import FileUpload from "@/components/file/FileUpload"
import { ATTACHMENT_AVATAR, ATTACHMENT_PROFILE, END_POINT_MINIO } from "@/constants/const"
import { Attachment } from "@/models/Attachment"
import { Group } from "@/models/Group"
import { User } from "@/models/User"
import { ApiResponse } from "@/types/app"
import { UpdateUserRequest } from "@/types/auth.type"
import { UpdateGroupRequest } from "@/types/group.type"
import { UpdateAttachmentByIdsRequest } from "@/types/upload.type"
import { capitalizeWord } from "@/utils/utils"
import { useQueryClient } from "@tanstack/react-query"
import { isAxiosError } from "axios"
import { Button } from "primereact/button"
import { Dialog } from "primereact/dialog"
import { useState } from "react"
import toast from "react-hot-toast"

interface ChangeAvatarOrProfileModalProps {
    data?: User | Group
    mode?: "profile" | "group"
    type?: "avatar" | "profile"
    open?: boolean
    setOpen?: any
    imageUrl?: string
    edit?: boolean
}

const ChangeAvatarOrProfileModal : React.FC<ChangeAvatarOrProfileModalProps> = ({edit = false,data,mode = "profile",type = 'avatar', open,setOpen,imageUrl}) => {
    if(!edit) return
    const [attachments,setAttachments] = useState<Attachment[] | null>(null)
    const [images,setImages] = useState<Attachment[] | null>(null)
    const [visible, setVisible] = useState<boolean>(false);
    const [valueChangeImage,setValueChangeImage] = useState<string| null>(null)
    const queryClient = useQueryClient()
    const handleSaveImageUser = async () => {
        if(attachments && attachments[0].id){
            const attachmentsInput : UpdateAttachmentByIdsRequest = {
                attachableId: data?.id,
                attachableType: type == 'avatar' ? ATTACHMENT_AVATAR : ATTACHMENT_PROFILE,
                attachmentIds: [attachments[0]?.id],
                entityUploadId: mode == "group" ? data?.id : undefined
            }
            try {
                const resUpdatedAttachment = await updateAttachmentsByIds(attachmentsInput)
                if(resUpdatedAttachment.status !== 200){
                    toast.error("Upload attachments failed")
                }else {
                    if(mode == "profile"){
                        const userReq : UpdateUserRequest = {
                            user:{
                                id: data?.id,
                                avatarUrl: type == 'avatar' ? attachments[0].url : undefined,
                                profileUrl: type == 'profile' ? attachments[0].url : undefined,
                            }
                            
                        }
                        const res = await updateUser(userReq)
                        if(res?.status == 200){
                            toast.success(`Update ${capitalizeWord(type)} Successfully`)
                            queryClient.invalidateQueries({queryKey: [`profile`,data?.id],exact: true})
                            setAttachments(null)
                        }
                    }else {
                        const groupReq : UpdateGroupRequest = {
                            group:{
                                id: data?.id as string,
                                profileUrl: attachments[0].url,
                            }
                            
                        }
                        const res = await updateGroup(groupReq)
                        if(res?.status == 200){
                            toast.success(`Update ${capitalizeWord(type)} Successfully`)
                            queryClient.invalidateQueries({queryKey: [`group`,data?.id],exact: true})
                            setAttachments(null)
                        }
                    }
                    
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
    const handleDeleteAttachment = async () => {
        if(attachments && attachments[0].id){
            try {
                const res = await deleteAttachment(attachments[0].id)
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
    const handleChangeImage = async () => {
        setVisible(true)
        try {
            const res = await getAttachmentsByOptional(
                type == 'avatar' ? ATTACHMENT_AVATAR : ATTACHMENT_PROFILE ,
                'image',
                mode == "profile" ? data?.id : undefined,
                mode == "group" ? data?.id : undefined)
            if(res.status === 200){
                const results = res?.data?.attachments
                if(!results) return
                setImages(results)
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
    const changeImage = async () => {
        if(mode == "profile"){
            const userReq : UpdateUserRequest = {
                user:{
                    id: data?.id,
                    avatarUrl: type == 'avatar' ? valueChangeImage as string : undefined,
                    profileUrl: type == 'profile' ? valueChangeImage as string : undefined
                }
                
            }
            const res = await updateUser(userReq)
            if(res?.status == 200){
                toast.success(`Change ${capitalizeWord(type)} Successfully`)
                queryClient.invalidateQueries({queryKey: [`profile`,data?.id],exact: true})
                // setVisible(false)
            }
        }else {
            const groupReq : UpdateGroupRequest = {
                group:{
                    id: data?.id as string,
                    profileUrl: valueChangeImage as string,
                }
                
            }
            const res = await updateGroup(groupReq)
            if(res?.status == 200){
                toast.success(`Change ${capitalizeWord(type)} Successfully`)
                queryClient.invalidateQueries({queryKey: [`group`,data?.id],exact: true})
                // setAttachments(null)
            }
        }
        
    }
    const footerContent = (
        <div>
            <Button label="No" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
            <Button label="Yes" icon="pi pi-check" onClick={changeImage} autoFocus />
        </div>
    );
    return (
        <Dialog
                header={`Edit ${capitalizeWord(type)}`}
                headerClassName='text-center mb-[-16px]'
                visible={open}
                style={{ width: '42vw' }}
                onHide={() => setOpen(false)}
                //  footer={footerContent}
            >
                <div className="flex justify-center items-center">
                    {attachments ? (
                        <img
                        src={END_POINT_MINIO + attachments[0].url}
                        className={`object-cover border-4 border-white ${type == 'avatar' ? 'w-48 h-48 rounded-full' : 'w-auto'} `}
                        alt="cover"
                        />
                    ) : <img
                    src={imageUrl}
                    className={`object-cover border-4 border-white ${type == 'avatar' ? 'w-48 h-48 rounded-full' : 'w-auto'}`}
                    alt="cover"
                    /> }
                    
                </div>
                <Dialog header={`Change ${capitalizeWord(type)}`} 
                className="text-center mb-[-16px]"
                visible={visible} 
                style={{ width: '50vw' }} 
                onHide={() => setVisible(false)} 
                footer={footerContent}>
                    <div className="flex justify-center gap-2">
                        {images && images.map(avatar => (
                            <img
                            key={avatar?.id}
                            src={END_POINT_MINIO + avatar?.url}
                            className={`object-cover w-48 h-48 rounded-lg ${valueChangeImage == avatar?.url ? 'border-2 border-blue-700': ''}`}
                            alt="cover"
                            onClick={() => setValueChangeImage(avatar?.url)}
                            />
                        ))}
                    </div>
                    
                </Dialog>
                <div className="flex">
                    <FileUpload icon='pi pi-camera' rounded onUploaded={setAttachments} ></FileUpload>
                    {attachments && (
                        <div>
                            <Button icon="pi pi-check" rounded text aria-label="Save" 
                            onClick={handleSaveImageUser}
                            />
                            <Button icon="pi pi-times" rounded text severity="danger" aria-label="Cancel" 
                            onClick={handleDeleteAttachment}
                            />
                        </div>
                    )}
                    <Button icon="pi pi-image" rounded text aria-label="Change Avatar" 
                        onClick={handleChangeImage}
                    />
                </div>
                
            </Dialog>
    )
}
export default ChangeAvatarOrProfileModal