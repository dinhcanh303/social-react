import { getGroup } from "@/apis/group.api";
import { Group } from "@/models/Group";
import { useQuery } from "@tanstack/react-query";
import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { TabPanel, TabView } from "primereact/tabview";
import GroupMembers from "./GroupMembers";
import GroupPost from "./GroupPost";
import GroupMedia from "./GroupMedia";
import { END_POINT_MINIO } from "@/constants/const";
import ProfileGroup from '@/assets/tlc.png'
import ChangeAvatarOrProfileModal from "../modal/ChangeAvatarOrProfileModal";
import { Dialog } from "primereact/dialog";
import { User } from "@/models/User";
import { Column } from "primereact/column";
import { getUsersInviteGroup } from "@/apis/auth.api";
import AboutGroup from "./AboutGroup";
import Feed from "../Feed";
import PostForm from "../PostForm";

type GroupRenderProps = {
    disabled?: boolean
    groupId?: string
    group?: Group
};

const GroupRenderDemo: React.FC<GroupRenderProps> = ({group}) => {
    const items  = [
        { label: 'Posts', icon: 'pi pi-home mr-2' ,content: (<div className="">
        <div className="flex justify-around h-auto">
            <div className="w-full mx-0 flex">
                <div className="w-3/5 pr-10 text-center">
                    <PostForm isShow={true} />
                    ...
                </div>
                <div className="w-2/5 pl-10">
                    <AboutGroup/>
                </div>
            </div>
        </div>
    </div> )},
        { label: 'Members', icon: 'pi pi-users mr-2',content: "" },
        { label: 'Media', icon: 'pi pi-images mr-2',content: "" },
        { label: 'File', icon: 'pi pi-inbox mr-2' ,content: ""}
    ];
    const profileUrl = group?.profileUrl ? END_POINT_MINIO + group.profileUrl : ProfileGroup
    return (
    <div className={`pointer-events-none`}>
        <div className="relative h-96 rounded-xl flex">
            <img
            src={profileUrl}
            className="object-cover w-full h-full rounded-xl"
            alt="cover"
            />
        </div>
        <div className="flex justify-between">
            <div className="text-left ml-10 mt-8">
                <span className="text-3xl font-bold">{group?.name}</span>
                <p className="text-sm font-normal">100 member</p>
            </div>
            <div className="mr-10  mt-14">
            </div>
        </div>
        <div className="border mt-6 border-opacity-10 mx-10" />
            <TabView className="text-sm mx-10">
            {items.length > 0 && items.map((item,index) => {
                return  <TabPanel key={index} header={item.label} leftIcon={item.icon} className="">
                        {item.content}
                        </TabPanel>
            })}
            </TabView>
    </div>
);
};
export default GroupRenderDemo;