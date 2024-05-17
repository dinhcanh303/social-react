import { getAvatarUser, getProfileGroup } from '@/hooks/getAvatarUser'
import { useAuth } from '@/hooks/useAuth'
import { Group } from '@/models/Group'
import { Post } from '@/models/Post'
import { User } from '@/models/User'
import { useStateFeedStore } from '@/store/state-feed'
import { capitalizeWord, convertStatus } from '@/utils/utils'
import moment from 'moment'
import { Avatar } from 'primereact/avatar'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { useState } from 'react'
import { MdPublic, MdGroup, MdPerson } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { Status } from '../group/LeftMenuCreateGroup'
import { RadioButton, RadioButtonChangeEvent } from 'primereact/radiobutton'
import { Checkbox, CheckboxChangeEvent } from 'primereact/checkbox'

interface AvatarUserProps {
  type?: 'time' | 'status' | 'normal' | 'role'
  post?: Post
  owner?: User
  group?: Group
  changeStatus?: any
}
const AvatarUser: React.FC<AvatarUserProps> = ({ type = 'time', post, group ,owner,changeStatus}) => {
  if (owner === undefined) {
    const { user } = useAuth()
    owner = user as User
  }
  const {typeFeed} = useStateFeedStore()
  let renderGroupAvatar = false
  if(typeFeed != 'group' && group){
    renderGroupAvatar = true
  }
  const avatarUser = getAvatarUser(owner)
  const profileGroup = getProfileGroup(group)
  const navigate = useNavigate()
  const [open, setOpen] = useState<boolean>(false)
  const footerContent = (
    <div>
      <Button label='Continue editing' onClick={() => setOpen(false)} text />
      <Button label='Change' onClick={() => navigate(`/profile?id=${owner?.id}`)} raised />
    </div>
  )
  const footerName = {
    time: <AvatarUserTime time={post?.createdAt} 
    status={convertStatus(post?.status) as "public" | "friends" | "private"} />,
    status: <AvatarUserStatus changeStatus={changeStatus}/>,
    normal: <AvatarUserNormal />,
    role: <AvatarUserRole />
  }
  return (
    <>
      <div className={`flex space-x-2 items-center ${type == 'status' ? 'border-t' : ''}`}>
        <div className='relative mt-2'>
        {renderGroupAvatar && 
          (<img className='w-12 h-12 rounded-lg' 
          src={profileGroup} 
          alt={group?.name} 
          onClick={() => navigate(`/groups/${group?.id}`)}/>)}
          <Avatar image={avatarUser} size={renderGroupAvatar ? 'normal' : 'large'} className={renderGroupAvatar ? 'absolute top-2/4 left-8' : ''} shape='circle' onClick={() => setOpen(!open)} />
        </div>
        <div>
          <div className={`flex font-semibold item-center text-lg hover:font-bold hover:cursor-pointer 
          ${renderGroupAvatar ? 'mt-1 ml-1' : ''}`} 
          onClick={() => setOpen(!open)}>
            {renderGroupAvatar ? group?.name : owner?.fullName}
          </div>
          {!renderGroupAvatar && footerName[type]}
            {renderGroupAvatar && (
              <div className='flex items-center hover:font-bold hover:cursor-pointer ml-4 gap-2' onClick={() => setOpen(!open)}>
                <div className='font-semibold'>
                  {owner?.fullName}
                </div>
                <div className='mt-1'>
                  {footerName[type]}
                </div>
              </div>
            )}
        </div>
      </div>
      <Dialog
        header='Change page?'
        visible={open}
        style={{ width: '50vw' }}
        onHide={() => setOpen(false)}
        footer={footerContent}
      >
        <p className='m-0'>Your unsaved changes will be lost if you leave the page.</p>
      </Dialog>
    </>
  )
}
export default AvatarUser

interface AvatarUserTimeProps {
  time?: string
  status?: 'public' | 'private' | 'friends'
}
const AvatarUserTime: React.FC<AvatarUserTimeProps> = ({ time, status = 'public' }) => {
  if(!time){
    time = moment().fromNow();
  }
  time = moment(new Date(time)).fromNow();
  const statues = {
    public: <MdPublic />,
    friends: <MdGroup />,
    private: <MdPerson />
  }
  return (
    <span className='flex text-xs text-gray-500 dark:text-gray-400'>
      {time} ·<div className='text-sm'>{statues[status]}</div>
    </span>
  )
}
interface AvatarUserStatusProps {
  status?: 'public' | 'private' | 'friends'
  changeStatus?: any
}
const AvatarUserStatus: React.FC<AvatarUserStatusProps> = ({ status = 'public' ,changeStatus}) => {
  const statues = {
    public: <MdPublic />,
    friends: <MdGroup />,
    private: <MdPerson />
  }
  const statuesRadio : Status[] = [
    {name: 'Public', value:1,icon:<MdPublic/>,description:''},
    {name: 'Friends', value:2,icon:<MdGroup />,description:''},
    {name: 'Private', value:3,icon:<MdPerson />,description:''},
  ]
  const [open,setOpen] = useState<boolean>(false)
  const [selectedStatus, setSelectedStatus] = useState<number|undefined>(undefined);
  const [checked, setChecked] = useState<boolean>(false);
  const footerContent = (
    <div className='flex justify-between'>
      <div className="flex items-center">
        <Checkbox inputId="default_value_status_setting" name="default" value="default" onChange={(e:CheckboxChangeEvent) => setChecked(e.checked ?? false)} checked={checked} />
        <label htmlFor="default_value_status_setting" className="ml-2">Set default value</label>
      </div>
      <div>
        <Button label='Cancel' size='small' onClick={() => setOpen(false)} text />
        <Button label='Save' size='small' onClick={() =>setOpen(false)} raised />
      </div>
    </div>
    
  )
  return (
    <div>
      <span className='flex bg-gray-200 rounded-lg text-xs p-1 cursor-pointer hover:bg-gray-300'
      onClick={() => setOpen(!open)}
      >
        <div className='text-sm'>{statues[status]}</div>
        <p className='mx-1'>{capitalizeWord(status)}</p>
        <i className='pi pi pi-angle-down'></i>
      </span>
      <Dialog
        header='Post Audience'
        visible={open}
        style={{ width: '30vw' }}
        onHide={() => setOpen(false)}
        footer={footerContent}
      >
        <div className='text-base font-medium'>
        {statuesRadio && (statuesRadio.map((status,index) => {
                    return (
                        <div key={status.name + index} className="flex align-items-center items-center">
                            <RadioButton inputId={status.name} name="status" value={status.value} 
                            onChange={(e: RadioButtonChangeEvent) => setSelectedStatus(e.value)} 
                            checked={selectedStatus === status.value} />
                            <span className="mx-2">{status.icon}</span>
                            <label htmlFor={status.name} >{status.name}</label>
                        </div>
                    );
                }))}
        </div>
      </Dialog>
    </div>
    
    
    
  )
}
interface AvatarUserNormalProps {}
const AvatarUserNormal: React.FC<AvatarUserNormalProps> = ({}) => {
  // const { user } = useAuth()
  return <>{/* <span className="ml-1 font-semibold">{user?.fullName ?? "Foden Ngo"}</span> */}</>
}
interface AvatarUserRoleProps {}
const AvatarUserRole: React.FC<AvatarUserRoleProps> = ({}) => {
  // const { user } = useAuth()
  return (
    <>
      <span className='font-normal text-sm'>Owner</span>
    </>
  )     
}
