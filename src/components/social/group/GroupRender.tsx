import { getGroup } from "@/apis/group.api";
import { Group } from "@/models/Group";
import { useQuery } from "@tanstack/react-query";
import { Button } from "primereact/button";
import React, { useState } from "react";
import { TabPanel, TabView } from "primereact/tabview";
import GroupMembers from "./GroupMembers";
import GroupPost from "./GroupPost";
import GroupMedia from "./GroupMedia";
import { END_POINT_MINIO, ROLE_OWNER_GROUP_MEMBER } from "@/constants/const";
import ProfileGroup from '@/assets/tlc.png'
import ChangeAvatarOrProfileModal from "../modal/ChangeAvatarOrProfileModal";
import { Dialog } from "primereact/dialog";
import { User } from "@/models/User";
import { DataTable, DataTableFilterEvent, DataTableFilterMeta, DataTablePageEvent, DataTableSortEvent, DataTableSelectAllChangeEvent } from "primereact/datatable";
import { Column } from "primereact/column";
import { getUsersInviteGroup } from "@/apis/auth.api";
import GroupSetting from "./GroupSetting";

type GroupRenderProps = {
    disabled?: boolean
    groupId?: string
    group?: Group
};
interface LazyTableState {
    first: number;
    rows: number;
    page: number;
    sortField?: string;
    sortOrder?: number;
    filters: DataTableFilterMeta;
}
const GroupRender: React.FC<GroupRenderProps> = ({group, groupId, disabled=false}) => {
    const [openInvite,setOpenInvite] = useState<boolean>(false)
    const [totalRecords, setTotalRecords] = useState<number>(0);
    const [users, setUsers] = useState<User[] | null>(null);
    const [selectAll, setSelectAll] = useState<boolean>(false);
    const [selectedUsers, setSelectedUsers] = useState<User[] | null>(null);
    const [openChangeProfile,setOpenChangeProfile] = useState<boolean>(false)
    // useEffect(() => {
    //     getUsersInviteGroup(groupId).then((data) => {
    //         setUsers(data?.data.users)
    //     })
    // }, []);
    const onSelectionChange = (event: DataTableSelectionChangeEvent) => {
        const value = event.value;
        setSelectedUsers(value);
        setSelectAll(value.length === totalRecords);
    };
    const onSelectAllChange = (event: DataTableSelectAllChangeEvent) => {
        const selectAll = event.checked;
        if (selectAll) {
            getUsersInviteGroup(groupId).then((data) => {
                setSelectAll(true);
                setSelectedUsers(data?.data?.users);
            });
        } else {
            setSelectAll(false);
            setSelectedUsers([]);
        }
    };

    const fullNameBodyTemplate = (rowData: User) => {
        return (
            <div className="flex align-items-center gap-2">
                <img alt={rowData.fullName} src={END_POINT_MINIO + rowData.avatarUrl} width={32} />
                <span>{rowData.fullName}</span>
            </div>
        );
    };
    let members;
    let roleGroupMember;
    const groupRes = useQuery({
        queryKey: ['group',groupId],
        queryFn: () => {return getGroup(groupId)}
    })
    group = groupRes?.data?.data?.group
    members = groupRes?.data?.data?.countGroupMembers ?? 1
    roleGroupMember = groupRes?.data?.data?.roleGroupMember ?? false        
    const items  = [
        { label: 'Posts', icon: 'pi pi-home mr-2' ,content: <GroupPost groupId={groupId}/>},
        { label: 'Members', icon: 'pi pi-users mr-2',content: <GroupMembers groupId={groupId} /> },
        { label: 'Media', icon: 'pi pi-images mr-2',content: <GroupMedia groupId={groupId} /> },
        { label: 'File', icon: 'pi pi-inbox mr-2' ,content: ""}
      ];
    const profileUrl = group?.profileUrl ? END_POINT_MINIO + group.profileUrl : ProfileGroup
    const footerContent = (
        <div>
            <Button label='Continue editing' onClick={() => setOpenInvite(false)} text />
            <Button label='Change' onClick={() => {}} raised />
        </div>
    )
    return (
    <div className={`${disabled ? "pointer-events-none" : ""}`}>
        <div className="relative h-96 rounded-xl flex">
            <img
            src={profileUrl}
            className="object-cover w-full h-full rounded-xl"
            alt="cover"
            onClick={() => setOpenChangeProfile(!openChangeProfile)}
            />
            <ChangeAvatarOrProfileModal edit={!disabled} 
            type="profile" 
            data={group} 
            mode="group"
            imageUrl={profileUrl} 
            open={openChangeProfile} 
            setOpen={setOpenChangeProfile}  />
        </div>
        <div className="flex justify-between">
            <div className="text-left ml-10 mt-8">
                <span className="text-3xl font-bold">{group?.name}</span>
                <p className="text-sm font-normal">{members ?? 1} member</p>
            </div>
            <div className="mr-10  mt-14">
                {roleGroupMember ? (
                    <div className="space-x-2">
                        <Button label="Invite" icon="pi pi-plus" size="small" onClick={() => setOpenInvite(!openInvite)}/>
                        <Dialog
                            header='Invite member group?'
                            visible={openInvite}
                            style={{ width: '52vw' }}
                            onHide={() => setOpenInvite(false)}
                            footer={footerContent}
                        >
                            <div className="card">
                                <DataTable value={users} scrollable scrollHeight="flex" 
                                        tableStyle={{ minWidth: '48vw' }}
                                        selection={selectedUsers} 
                                        onSelectionChange={onSelectionChange} 
                                        selectAll={selectAll} 
                                        onSelectAllChange={onSelectAllChange}>
                                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />
                                    <Column field="fullName" header="Name" body={fullNameBodyTemplate}/>
                                    <Column field="position" header="Position"></Column>
                                </DataTable>
                            </div>
                        </Dialog>
                        <Button security="secondary" label="Joined" icon="pi pi-check" size="small"/>
                    </div>
                ) : (
                    <Button security="secondary" label="Join" icon="pi pi-user-plus" size="small"/>
                )}
            </div>
        </div>
        <div className="border mt-6 border-opacity-10 mx-10" />
            <TabView className="text-sm mx-10">
            {items.length > 0 && items.map((item,index) => {
                return  <TabPanel key={index} header={item.label} leftIcon={item.icon} className="">
                        {item.content}
                        </TabPanel>
            })}
            {roleGroupMember == ROLE_OWNER_GROUP_MEMBER && (
                <TabPanel header="Settings" leftIcon="pi pi-cog mr-2" className="">
                    <GroupSetting/>
                </TabPanel>
            )}
            </TabView>
    </div>
);
};
export default GroupRender;