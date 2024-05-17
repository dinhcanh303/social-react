import { END_POINT_MINIO } from "@/constants/const";
import { User } from "@/models/User";
import React, { useState } from "react";
import AvatarUser from '@/assets/user.png'
import ProfileUser from '@/assets/tlc.png'
import { Button } from "primereact/button";
import ChangeAvatarOrProfileModal from "../modal/ChangeAvatarOrProfileModal";

type ProfileHeaderProps = {
    user?: User
    className?: string
    edit?: boolean
};

const ProfileHeader: React.FC<ProfileHeaderProps> = ({className, user , edit}) => {
    const [openChangeAvatar,setOpenChangeAvatar] = useState<boolean>(false)
    const [openChangeProfile,setOpenChangeProfile] = useState<boolean>(false)
    if(user === undefined) return
    const avatarUrl = user?.avatarUrl ? END_POINT_MINIO + user.avatarUrl : AvatarUser
    const profileUrl = user?.profileUrl ? END_POINT_MINIO + user.profileUrl : ProfileUser
    return (
    <div className={className}>
        <div className="relative h-[500px] rounded-b-xl flex">
            <img
            src={profileUrl}
            className="object-cover w-full h-full rounded-b-xl"
            alt="cover"
            onClick={() => setOpenChangeProfile(!openChangeProfile)}
            />
            <div className="absolute -bottom-24 left-10"
                onClick={() => setOpenChangeAvatar(!openChangeAvatar)}
            >
                    <img
                    src={avatarUrl}
                    className="object-cover border-4 border-white w-48 h-48 rounded-full"
                    alt="cover"
                    />
            </div>
            <ChangeAvatarOrProfileModal edit={edit} 
            data={user} 
            imageUrl={avatarUrl} 
            open={openChangeAvatar} 
            setOpen={setOpenChangeAvatar}  />
            <ChangeAvatarOrProfileModal edit={edit} 
            type="profile" 
            data={user} 
            imageUrl={profileUrl} 
            open={openChangeProfile} 
            setOpen={setOpenChangeProfile}  />
        </div>
        <div className="flex justify-between">
            <div className="text-left ml-64 mt-8">
                <span className="text-3xl font-bold">{user?.fullName}</span>
                <p className="text-sm font-normal">630 friends</p>
            </div>
            <div className="mx-2 space-x-2 mt-14">
                <Button label="Add friend" icon="pi pi-user-plus" size="small" />
                <Button security="secondary" label="Message" icon="pi pi-comment" size="small"/>
            </div>
        </div>
        <div className="border mt-6 border-opacity-10 mx-2" />
    </div>
  );
};
export default ProfileHeader;
