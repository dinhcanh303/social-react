import Feed from "../Feed"

interface ProfileFeedProps {
    userId?:string
}
const ProfileFeed : React.FC<ProfileFeedProps> = ({userId}) => {
    return (
        <Feed type="profile" userId={userId}/>
    )
}
export default ProfileFeed