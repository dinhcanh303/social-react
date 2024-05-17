import { END_POINT_MINIO } from "@/constants/const"
import { Group } from "@/models/Group"
import GroupImg  from "@/assets/group.png"

interface LeftMenuGroupItemProps {
    group?: Group
    className?: string
}
const LeftMenuGroupItem : React.FC<LeftMenuGroupItemProps> = ({group}) => {
    return (
        <>
            <a href={`/groups/${group?.id}`} className="bg-gray-100 hover:bg-gray-300 rounded-lg p-4 mb-2 flex items-center">
                <img src={group?.profileUrl ? END_POINT_MINIO + group?.profileUrl : GroupImg} alt="" className="w-10 h-10 rounded-full"/>
                <span className="ml-2">{group?.name}</span>
            </a>
        </>
    )
}
export default LeftMenuGroupItem