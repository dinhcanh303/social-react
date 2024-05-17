import { BreadCrumb } from "primereact/breadcrumb";
import { Button } from "primereact/button"
import { Card } from "primereact/card"
import { MenuItem } from "primereact/menuitem";
import AvatarUser from "../avatar/AvatarUser";
import { InputText } from "primereact/inputtext";
import { useMemo, useState } from "react";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { User } from "@/models/User";
import { MultiSelect, MultiSelectChangeEvent } from "primereact/multiselect";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUsers } from "@/apis/auth.api";
import { END_POINT_MINIO } from "@/constants/const";
import { useAuth } from "@/hooks/useAuth";
import { CreateGroupRequest } from "@/types/group.type";
import { createGroup } from "@/apis/group.api";
import { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ApiResponse } from "@/types/app";
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorMessage from "@/components/message/ErrorMessage";
import { convertStatusCreateGroup } from "@/utils/utils";
interface LeftMenuCreateGroupProps {

}
export interface Status {
    name: string;
    value: number;
icon : string | any;
    description: string;
}
const schemaCreateGroupValidation:  yup.ObjectSchema<CreateGroupRequest, any, any> = yup.object( {
    group: yup.object({
        name: yup.string().required().min(3),
        description: yup.string(),
        status: yup.string().required(),
    }).required(),
})
const LeftMenuCreateGroup : React.FC<LeftMenuCreateGroupProps> = ({}) => {
    const {user} = useAuth()
    const items: MenuItem[] = [{ label: 'Create Group' }];
    const home: MenuItem = { label: 'Groups', url: '/groups/feed' }
    const [valueName, setValueName] = useState<string>('');
    const [valueDescription, setValueDescription] = useState<string>('');
    const [selectedStatus, setSelectedStatus] = useState<Status | null>(null);
    const [selectedUsers, setSelectedUsers] = useState<User[] | null>(null);
    const usersRes = useQuery({
        queryKey: ['users'],
        queryFn: () => {return getUsers()}
    })
    var users = usersRes.data?.data.users
    users = users?.filter(u => !(u.id === user?.id))
    const createGroupMutation = useMutation({
        mutationFn: (body: CreateGroupRequest) => {
        return createGroup(body)
        },
        mutationKey: ['createGroup']
    })
    const errorForm = useMemo(() => {
        const error = createGroupMutation.error
        if (isAxiosError<{ error: any }>(error)) {
        return error.response?.data.error
        }
        return undefined
    }, [createGroupMutation.error])
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid }
    } = useForm<CreateGroupRequest>(
        {
        resolver: yupResolver(schemaCreateGroupValidation),
        mode: "onChange"
        }
    )
    const onSubmit = (body: CreateGroupRequest) => {
        if (isValid) {
            body.group.status = convertStatusCreateGroup(body.group.status)
            if(selectedUsers && selectedUsers?.length > 0){
                const userIds = selectedUsers?.map(u => u.id)
                body.group.userIds = userIds as string[]
            }
            createGroupMutation.mutate(body, {
                onSuccess:async (res) => {
                    if (res?.status === 200) {
                        const group = res?.data?.group
                        if(group.id){
                            toast.success('Create Group Successfully!')
                            setValueName("")
                            setValueDescription("")
                            setSelectedStatus(null)
                            setSelectedUsers(null)
                        }
                    }
                },
                onError: (error) => {
                    if (isAxiosError<ApiResponse>(error)) {
                        if (error?.response?.data?.message) {
                        toast.error(error?.response?.data?.message)
                        } else {
                        toast.error(error.message)
                        }
                    }
                }
            })
        }
        
    } 
    const userTemplate = (option : User) => {
        return (
            <div className="flex align-items-center items-center gap-2">
                <img className="w-10 h-10 rounded-full object-cover" alt={option.fullName} src={END_POINT_MINIO + option.avatarUrl}/>
                <div>{option.fullName}</div>
            </div>
        );
    };
    const panelFooterTemplate = () => {
        const length = users ? users.length : 0;
        return (
            <div className="py-2 px-3">
                <b>{length}</b> item{length > 1 ? 's' : ''} selected.
            </div>
        );
    };
    const statues: Status[] = [
        { name: 'Public', value: 1 ,icon : "pi-globe", description: "Anyone can see who's in the group and what they post."},
        { name: 'Private', value: 2 , icon : "pi-lock",description: "Only members can see who's in the group and what they post."}
    ];
    const selectedStatusTemplate = (option: Status, props : any) => {
        if (option) {
            return (
                <div className="flex align-items-center font-normal">
                    <i className={`mt-1 mr-2 text-green-500 pi ${option.icon}`}></i>
                    <div>{option.name}</div>
                </div>
            );
        }
        return <span>{props.placeholder}</span>;
    };

    const statusOptionTemplate = (option: Status) => {
        return (
            <div>
                <div className="flex align-items-center font-normal">
                    <i className={`mt-0 mr-2 text-green-500 pi ${option.icon}`}></i>
                    <div>{option.name}</div>
                </div>
                <p className="text-xs font-light">{option.description}</p>
            </div>
            
        );
    };
    return (
        <Card  className="w-1/3 mt-14">
            <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
                <div>
                        <BreadCrumb model={items} home={home} className="border-none p-0"/>
                        <div className="text-xl font-medium py-2">Create Group</div>
                        <AvatarUser type="role"/>
                        <span className="p-float-label mt-6">
                            <InputText id="name" className="w-full" 
                            value={valueName} 
                            {...register('group.name' ,{ required: true ,minLength: 3})}
                            onChange={(e) => setValueName(e.target.value)} />
                            {errors?.group?.name && <ErrorMessage message={errors?.group?.name?.message} />}
                            {errorForm?.group?.name && <ErrorMessage message={errorForm?.group?.name} />}
                            <label htmlFor="name">Group Name</label>
                        </span>
                        <span className="p-float-label mt-6">
                            <InputText id="description" className="w-full" 
                            value={valueDescription} 
                            {...register('group.description')}
                            onChange={(e) => setValueDescription(e.target.value)} />
                            <label htmlFor="description">Description (optional)</label>
                        </span>
                        <Dropdown value={selectedStatus}  options={statues} optionLabel="name" 
                        placeholder="Choose privacy" className="w-full md:w-14rem mt-6" 
                        valueTemplate={selectedStatusTemplate}
                        itemTemplate={statusOptionTemplate}
                        {...register('group.status',{required: true})}
                        onChange={(e: DropdownChangeEvent) => setSelectedStatus(e.value)}
                        />
                        {errors?.group?.status && <ErrorMessage message={errors?.group?.status?.message} />}
                        {errorForm?.group?.status && <ErrorMessage message={errorForm?.group?.status} />}
                        <MultiSelect value={selectedUsers} options={users}
                        onChange={(e: MultiSelectChangeEvent) => setSelectedUsers(e.value)} optionLabel="fullName" 
                        placeholder="Invite member (optional)" 
                        itemTemplate={userTemplate} 
                        panelFooterTemplate={panelFooterTemplate} 
                        className="w-full md:w-20rem mt-6" display="chip" />    
                </div>
                <Button type="submit" size="small" loading={isSubmitting} className="w-full mt-6" label="Create"/>
            </form>
        </Card>
    )
}
export default LeftMenuCreateGroup