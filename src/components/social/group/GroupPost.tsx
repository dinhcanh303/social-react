import Feed from "../Feed"
import PostForm from "../PostForm"
import AboutGroup from "./AboutGroup"

interface GroupPostProps {
    groupId?: string
}

const GroupPost : React.FC<GroupPostProps> = ({groupId}) => {
    return (
        <>
            <div className="">
                <div className="flex justify-around h-auto">
                    <div className="w-full mx-0 flex">
                        <div className="w-3/5 pr-10">
                            <PostForm isShow={true} groupId={groupId} />
                            <Feed type="group" groupId={groupId} />
                        </div>
                        <div className="w-2/5 pl-10">
                            <AboutGroup/>
                        </div>
                    </div>
                </div>
            </div>  
        </>
    )
}
export default GroupPost