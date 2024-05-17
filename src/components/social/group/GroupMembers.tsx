import { getGroupMembers } from "@/apis/group.api";
import { useQuery } from "@tanstack/react-query";
import { Card } from "primereact/card";
import AvatarUser from "../avatar/AvatarUser";
import AvatarGroupMember from "../avatar/AvatarGroupMember";

interface GroupMembersProps {
    groupId?: string;
}
const GroupMembers: React.FC<GroupMembersProps> = ({groupId}) => {
    console.log(groupId)
    const groupRes = useQuery({
        queryKey: ['group_members',groupId],
        queryFn: () => {return getGroupMembers(groupId)}
    })
    const groupMembers = groupRes?.data?.data?.groupMembers
    return (
        <>
        <Card >
            <div className="grid grid-cols-3">
            {groupMembers && (groupMembers.map(groupMember => {
                return (
                    <div key={groupMember.id} className="p-1">
                        <AvatarGroupMember groupMember={groupMember}></AvatarGroupMember>
                    </div>
                )
            }))}
            </div>
        </Card>
            
        </>
    )
}
export default GroupMembers