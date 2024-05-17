import React, { RefObject } from 'react'
import { Menu } from 'primereact/menu'
import { Avatar } from 'primereact/avatar'
import { MenuItem } from 'primereact/menuitem'
import { classNames } from 'primereact/utils'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { getAvatarUser } from '@/hooks/getAvatarUser'

interface UserMenuProps {
  id?: string
  refMenu?: RefObject<Menu>
  alignment?: 'left' | 'right'
}

const UserMenu: React.FC<UserMenuProps> = ({ id, refMenu, alignment = 'right' }) => {
  const { user } = useAuth()
  const avatarUser = getAvatarUser(user)
  const navigate = useNavigate()
  const items: MenuItem[] = [
    {
      command: () => {
        navigate(`/profile?id=${user?.id}`)
      },
      template: (item, options) => {
        return (
          <button
            onClick={(e) => options.onClick(e)}
            className={classNames(
              options.className,
              'w-full p-link flex align-items-center p-2 pl-4 text-color hover:surface-200 border-noround'
            )}
          >
            <Avatar image={avatarUser} className='mr-2' shape='circle' />
            <div className='flex flex-column align'>
              <span className='font-bold'>{user?.fullName}</span>
            </div>
          </button>
        )
      }
    },
    { separator: true },
    { label: 'Profile', icon: 'pi pi-fw pi-user' },
    { label: 'Settings', icon: 'pi pi-fw pi-cog' },
    { label: 'Themes', icon: 'pi pi-fw pi-sun' },
    { separator: true },
    { label: 'Logout', icon: 'pi pi-fw pi-arrow-circle-left' }
  ]
  return (
    <div className='card flex justify-content-center'>
      <Menu model={items} id={id} ref={refMenu} popup popupAlignment={alignment} />
    </div>
  )
}
export default UserMenu
