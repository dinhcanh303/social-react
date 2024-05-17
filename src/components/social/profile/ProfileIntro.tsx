import { IoHome } from "react-icons/io5";
import { FaBuildingUser } from "react-icons/fa6";
import { User } from "@/models/User";
import { MdEdit, MdLocalPhone, MdOutlineWorkOutline } from "react-icons/md";
import { Dialog } from "primereact/dialog";
import { useMemo, useState } from "react";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { InputSwitch } from "primereact/inputswitch";
import { Nullable } from "primereact/ts-helpers";
import 'react-phone-number-input/style.css'
import PhoneInput from "react-phone-number-input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateUserRequest } from "@/types/auth.type";
import { updateUser } from "@/apis/auth.api";
import { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorMessage from "@/components/message/ErrorMessage";
import toast from "react-hot-toast";
import { ApiResponse } from "@/types/app";
import moment from "moment";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { PiGenderIntersex } from "react-icons/pi";
type ProfileIntroProps = {
    user?: User
    edit?: boolean
};
const schemaUpdateUserValidation :  yup.ObjectSchema<UpdateUserRequest, any, any> = yup.object({
    user: yup.object({
        address: yup.string().default("").max(255),
        position: yup.string().default("").max(255),
        // gender: yup.boolean().default(false),
        // phone: yup.string().default("").max(15),
        // dateOfBirth: yup.date().default(new Date()),
    }).required(),
})
const ProfileIntro: React.FC<ProfileIntroProps> = ({user,edit}) => {
    let initStateDateOfBirth = null;
    if(user?.dateOfBirth){
        var currentDate = new Date(user.dateOfBirth)
        // currentDate.setDate(currentDate.getDate() - 1)
        initStateDateOfBirth = currentDate
    } 
    const [open,setOpen] = useState<boolean>(false)
const [gender,setGender] = useState<boolean>(user?.gender ?? false)
const [address,setAddress] = useState<string>(user?.address ?? "")
const [phone,setPhone] = useState<string>(user?.phone ?? "")
const [position,setPosition] = useState<string>(user?.position ?? "")
const [dateOfBirth, setDateOfBirth] = useState<Nullable<Date>>(initStateDateOfBirth);
    const queryClient = useQueryClient()
    const updateUserMutation = useMutation({
        mutationFn: (body: UpdateUserRequest) => {
            body.user.id = user?.id
        return updateUser(body)
        },
        mutationKey: ['updateUser',user?.id]
    })
    const errorForm = useMemo(() => {
        const error = updateUserMutation.error
        if (isAxiosError<{ error: any }>(error)) {
        return error.response?.data.error
        }
        return undefined
    }, [updateUserMutation.error])
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid }
    } = useForm<UpdateUserRequest>(
        {
        resolver: yupResolver(schemaUpdateUserValidation),
        mode: "onChange"
        }
    )
    const handleSubmitForm = () => {
        handleSubmit(onSubmit)();
    }
    const onSubmit = (body: UpdateUserRequest) => {
        if(dateOfBirth){
                console.log(dateOfBirth)
                var currentDate = new Date(dateOfBirth)
                currentDate.setDate(currentDate.getDate() + 1) // tips change date sang timestamp save data correct
                body.user.dateOfBirth = currentDate.toISOString()
                console.log(dateOfBirth)
            }
            body.user.phone = phone
            body.user.gender = gender
            if (isValid) {
                updateUserMutation.mutate(body, {
                onSuccess:async (res) => {
                    if (res?.status === 200) {
                    const user = res?.data?.user
                    toast.success('Update Info User Successfully!')
                    queryClient.invalidateQueries({queryKey: [`profile`,user?.id],exact: true})
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
    const footerContent = (
        <div>
            <Button label="Cancel" size="small" icon="pi pi-times" onClick={() => setOpen(false)} className="p-button-text" />
            <Button label="Save" size="small" icon="pi pi-check" loading={isSubmitting} onClick={handleSubmitForm} autoFocus />
        </div>
    );
    return (
        <div className="relative p-4 shadow rounded-lg bg-white w-full dark:bg-gray-800">
            <div className="flex justify-between">
                <div className="text-xl font-bold">Intro</div>
                {edit && (
                    <div>
                        <div className="cursor-pointer hover:bg-gray-200 hover:text-blue-500 w-10 h-10 rounded-full flex justify-center items-center"
                        onClick={() => setOpen(!open)}
                        >
                            <MdEdit />
                        </div>
                        <Dialog
                        header="Edit Intro"
                        headerClassName='text-center mb-[-16px]'
                        visible={open}
                        style={{ width: '42vw' }}
                        onHide={() => setOpen(false)}
                        footer={footerContent}
                        >
                            <form onSubmit={handleSubmit(onSubmit)} className="grid md:grid-cols-2 grid-cols-1 gap-2">
                                <div className="flex-auto">
                                    <label htmlFor="address" className="block">Address</label>
                                    <InputText className="w-full" id="address" 
                                    value={address} 
                                    {...register('user.address')}
                                    onChange={(e) => setAddress(e.target.value)} />
                                    {errors?.user?.address && <ErrorMessage message={errors?.user?.address?.message} />}
                                    {errorForm?.user?.address && <ErrorMessage message={errorForm?.user?.address} />}
                                </div>
                                <div className="flex-auto">
                                    <label htmlFor="position" className="block">Position</label>
                                    <InputText className="w-full" id="position" 
                                    value={position}
                                    {...register('user.position')} 
                                    onChange={(e) => setPosition(e.target.value)} />
                                    {errors?.user?.position && <ErrorMessage message={errors?.user?.position?.message} />}
                                    {errorForm?.user?.position && <ErrorMessage message={errorForm?.user?.position} />}
                                </div>
                                <div className="flex-auto">
                                    <label htmlFor="phone" className="block">Phone Number</label>
                                    <PhoneInput
                                        className="border w-full h-12 rounded-lg border-gray-300 p-2"
                                        placeholder="Enter phone number"
                                        value={phone}
                                        // {...register('user.phone')}
                                        onChange={setPhone}
                                        />
                                    {/* {errors?.user?.phone && <ErrorMessage message={errors?.user?.phone?.message} />} */}
                                    {/* {errorForm?.user?.phone && <ErrorMessage message={errorForm?.user?.phone} />} */}
                                </div>
                                <div className="flex-auto">
                                    <label htmlFor="date_of_birth" className="block">Date</label>
                                    <Calendar
                                        inputId="date_of_birth"
                                        className="w-full"
                                        value={dateOfBirth}
                                        dateFormat='dd-mm-yy'
                                        // {...register('user.dateOfBirth')}
                                        onChange={(e) => setDateOfBirth(e.value)}
                                    />
                                    {/* {errors?.user?.dateOfBirth && <ErrorMessage message={errors?.user?.dateOfBirth?.message} />} */}
                                    {/* {errorForm?.user?.dateOfBirth && <ErrorMessage message={errorForm?.user?.dateOfBirth} />} */}
                                </div>
                                <div className="flex-auto">
                                    <label htmlFor="gender" className="block">Gender <span className="text-sm italic">(Male/Female)</span></label>
                                    <InputSwitch  id="gender" 
                                    checked={gender} 
                                    // {...register('user.gender')}
                                    onChange={(e) => setGender(e.value)} />
                                    {/* {errors?.user?.gender && <ErrorMessage message={errors?.user?.gender?.message} />} */}
                                    {/* {errorForm?.user?.gender && <ErrorMessage message={errorForm?.user?.gender} />} */}
                                </div>

                            </form>
                        </Dialog>
                    </div>
                    
                )}
                
            </div>
            {user?.position && (
                <div className="mt-4 flex items-center">
                    <MdOutlineWorkOutline />
                    <span className="ml-2">{user.position}</span>
                </div>
            )}
            {user?.phone && (
                <div className="mt-4 flex items-center">
                    <MdLocalPhone />
                    <span className="ml-2">{user?.phone}</span>
                </div>
            )}
                <div className="mt-4 flex items-center">
                    <PiGenderIntersex />
                    <span className="ml-2">{user?.gender ? "Female" : "Male"}</span>
                </div>
            <div className="mt-4 flex items-center">
                <FaBuildingUser />
                <span className="ml-2">TLC Modular</span>
            </div>
            {user?.dateOfBirth && (
                <div className="mt-4 flex items-center">
                    <LiaBirthdayCakeSolid />
                    <span className="ml-2">
                    Birthday <b>{moment(user?.dateOfBirth).format("DD/MM/YYYY")}</b>
                    </span>
                </div>
            )}
            {user?.address && (
                <div className="mt-4 flex items-center">
                    <IoHome />
                    <span className="ml-2">
                    Lives in <b>{user?.address}</b>
                    </span>
                </div>
            )}
        </div>
    );
};
export default ProfileIntro;
