import { User } from "@/models/User"
import PostForm from "../PostForm"
import ProfileFeed from "./ProfileFeed"
import ProfileIntro from "./ProfileIntro"
import { useAuth } from "@/hooks/useAuth"

interface ProfilePostProps {
    userProfile?: User

}

const ProfilePost : React.FC<ProfilePostProps> = ({userProfile}) => {
    const {user} = useAuth()
    const checkEdit = user?.id === userProfile?.id ? true : false
    return (
        <div className="flex justify-around h-auto">
        <div className="w-2/5">
                <div className="mr-16 mt-4">
                    <ProfileIntro user={userProfile} edit={checkEdit} />
                </div>
                  {/* // PHOTOS */}
                <div className="mr-16 mt-4">
                    <div
                    className="p-4 shadow rounded-lg bg-white w-full dark:bg-gray-800"
                    id="intro"
                    >
                    <div className="flex justify-between">
                        <h1 className="font-bold text-xl">Photos</h1>
                        <a
                        href="#"
                        className="text-lg text-blue-700 dark:text-blue-400"
                        >
                        See All Photos
                        </a>
                    </div>
                </div>
                </div>
                  {/* // END PHOTOS */}
                  {/* // FRIENDS */}
                <div className="mr-16 mt-4">
                    <div className="p-4 shadow rounded-lg bg-white w-full dark:bg-gray-800"
                    id="intro"
                    >
                      {/* Header */}
                    <div className="flex justify-between">
                        <h1 className="font-bold text-xl">Friends</h1>
                    </div>
                      {/* List */}
                    </div>
                </div>
                  {/* // END FRIENDS */}
                </div>
                <div className="w-3/5 px-2 mt-1">
                {/* CREATE POST */}
                {checkEdit && (
                <>
                    <PostForm isShow={true} />
                </>
                )}
                  {/* END CREATE POST */}
                  {/* <Feed /> */}
                    <ProfileFeed userId={userProfile?.id}/>
                </div>
        </div>        
    )
}
export default ProfilePost