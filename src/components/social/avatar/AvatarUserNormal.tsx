import { getAvatarUser } from "@/hooks/getAvatarUser"
import { useAuth } from "@/hooks/useAuth"
import { Avatar } from "primereact/avatar"

interface AvatarUserNormalProps {
    src?: string
    size?: "normal" | "large" | "xlarge"
    shape?: "circle" | "square"
    onClick?: any
}

const AvatarUserNormal : React.FC<AvatarUserNormalProps> = ({src,size = "normal" , shape = "circle",onClick}) => {
    if(src === undefined){
        const { user } = useAuth()
        src = getAvatarUser(user)
    }
    return (
        <Avatar image={src} size={size} shape={shape} onClick={onClick} />
    )
}
export default AvatarUserNormal