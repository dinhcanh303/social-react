import { getAttachmentsByOptional } from "@/apis/upload.api"
import { ARRAY_VIDEO, END_POINT_MINIO } from "@/constants/const"
import { Attachment } from "@/models/Attachment"
import { getAttachmentMimeType } from "@/utils/utils"
import { useQuery } from "@tanstack/react-query"
import { Card } from "primereact/card"
import { Galleria } from "primereact/galleria"
import { Image } from "primereact/image"
import { useRef, useState } from "react"

interface AttachmentsProps {
    userId?: string
    type?: "profile" | "group"
    mimeType?: "photo" | "video" | "file"
    attachableType?: string
    entityUploadId?: string
}
const Attachments : React.FC<AttachmentsProps> = ({type="profile",mimeType="photo",userId,attachableType = "Post",entityUploadId}) => {
    const [activeIndex, setActiveIndex] = useState<number>(0);    
    const galleria = useRef<Galleria>(null);
    const attachmentsRes = useQuery({
        queryKey: ['attachments',type ,mimeType],
        queryFn: () => {
            return getAttachmentsByOptional(
                attachableType,
                getAttachmentMimeType(mimeType),
                userId,type == 'group' ? entityUploadId: undefined)
            }
    })
    const attachments = attachmentsRes?.data?.data?.attachments
    if(!attachments) return
    console.log(attachments)
    const itemTemplate = (item : Attachment) => {
        if(ARRAY_VIDEO.includes(item?.extension)){
            return (
                    <video 
                    className='w-full h-full object-cover'
                    controls
                    >
                        <source src={END_POINT_MINIO + item?.url} 
                        type={item?.mimeType}/>
                    </video>
            )
        }
        return <img src={END_POINT_MINIO + item.url} alt={item.fileName} style={{ width: '100%', display: 'block' }} />;
    }

    const thumbnailTemplate = (item : Attachment) => {
        if(ARRAY_VIDEO.includes(item?.extension)){
            return (<div></div>)
        }
        return <img src={END_POINT_MINIO + item.url} alt={item.fileName} style={{ display: 'block' }} />;
    }
    
    return (
        <div >
            {/* {
                <div className="pb-2">
                    <Button label={`${capitalizeWord(type)}s for you`} text size="small" className="border rounded-xl"/>
                    <Button label="Your upload" text  size="small" className="border rounded-xl"/>
                </div>
            } */}
            {<Galleria ref={galleria} value={attachments} numVisible={7} style={{ maxWidth: '850px' }}
            activeIndex={activeIndex} onItemChange={(e) => setActiveIndex(e.index)}
            circular fullScreen showItemNavigators 
            showThumbnails={true} 
            item={itemTemplate} 
            thumbnail={thumbnailTemplate}
            />}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-2">
                {
                    attachments && attachments.map((attachment, index) => {
                        if(ARRAY_VIDEO.includes(attachment?.extension)){
                            return (
                                <Card key={attachment.id} className="flex items-center">
                                    <video 
                                    className='w-full h-full object-cover'
                                    onClick={
                                        () => {setActiveIndex(index); galleria?.current?.show()}
                                    }
                                    >
                                        <source src={END_POINT_MINIO + attachment?.url} 
                                        type={attachment?.mimeType}/>
                                    </video>
                                </Card>
                                    
                            )
                        }
                        return (
                            <Card key={attachment.id} className="flex items-center">
                                <Image src={END_POINT_MINIO + attachment.url} alt={attachment.fileName} 
                                className="w-full h-full object-cover cursor-pointer"
                                onClick={
                                    () => {setActiveIndex(index); galleria?.current?.show()}
                                }
                                ></Image>
                            </Card>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default Attachments