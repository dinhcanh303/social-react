import AvatarUser from './avatar/AvatarUser'
import { SlArrowDown } from 'react-icons/sl'
import ButtonWrap from '@/components/button/ButtonWrap'
import iconLeftMenu from '@/assets/sidebar-icon/index'
import { useAuth } from '@/hooks/useAuth'

type LeftMenuProps = {}

const sideData = [
  {
    name: 'Find Friends',
    icon: iconLeftMenu.Friends,
    href: '/friends'
  },
  {
    name: 'Groups',
    icon: iconLeftMenu.Groups,
    href: '/groups/feed'
  },
  {
    name: 'Birthdays',
    icon: iconLeftMenu.Birthday,
    href: '/birthdays'
  },
  // {
  //   name: 'Pages',
  //   icon: iconLeftMenu.Pages,
  //   href: '/'
  // }
]

const LeftMenu: React.FC<LeftMenuProps> = ({}) => {
  const { user } = useAuth()
  return (
    <div className='scrollbar-hide w-1/5 pt-16 h-full hidden xl:flex flex-col fixed top-0 left-0'>
      <ul className='p-4'>
        <li>
          {user && (
            <ButtonWrap>
              <AvatarUser type='normal' />
            </ButtonWrap>
          )}
        </li>
        {user && (
          <>
            {sideData.map((data, index) => (
              <li key={index}>
                <ButtonWrap href={data.href}>
                  <div className='flex items-center'>
                    <img height={40} width={40} className='rounded-full ml-1 mr-2' alt='Icon' src={data.icon} />
                    <span className='font-semibold'>{data.name}</span>
                  </div>
                </ButtonWrap>
              </li>
            ))}
            <li>
              <div className='flex items-center cursor-pointer space-x-2 p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-all dark:text-dark-txt dark:hover:bg-dark-third'>
                <span className='w-10 h-10 rounded-full grid place-items-center bg-gray-300 dark:bg-dark-second'>
                  <SlArrowDown />
                </span>
                <span className='font-semibold'>See more</span>
              </div>
            </li>
            <li className='border-b border-gray-200 dark:border-dark-third mt-6'></li>
          </>
        )}
      </ul>
    </div>
  )
}
export default LeftMenu
