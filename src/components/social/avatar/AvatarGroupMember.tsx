import { END_POINT_MINIO } from "@/constants/const"
import { GroupMemberMetadata } from "@/models/GroupMember"
import { getRoleGroupMember } from "@/utils/utils"
import moment from "moment"
import { Avatar } from "primereact/avatar"

interface AvatarGroupMemberProps {
    groupMember?: GroupMemberMetadata
}
const AvatarGroupMember : React.FC<AvatarGroupMemberProps> = ({groupMember}) => {
    if(!groupMember) return
    return (
            <div className={`flex space-x-2 items-center`}>
                <a href={`/profile?id=${groupMember?.userId}`}>
                    <Avatar image={END_POINT_MINIO + groupMember?.user?.avatarUrl} size='large' shape='circle' />
                </a>
                <div className="text-left pl-2">
                    <a href={`/profile?id=${groupMember?.userId}`}>
                        <span className="text-base font-medium">{groupMember?.user?.fullName}</span>
                    </a>
                    <div className="text-sm">Role <span className="p-1 bg-blue-200 rounded-lg text-blue-700">{getRoleGroupMember(groupMember?.role)}</span></div>
                    <span className="text-sm">Joined <span className="font-medium">{moment(new Date(groupMember?.createdAt)).fromNow()}</span></span>
                </div>
            </div>
    )
}
export default AvatarGroupMember