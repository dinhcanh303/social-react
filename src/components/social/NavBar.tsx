import { IoMdHome } from 'react-icons/io'
import { MdGroup } from 'react-icons/md'
import { FaStore } from 'react-icons/fa'
import { IoIosNotifications } from 'react-icons/io'
import { motion } from 'framer-motion'
import { BiSolidMessageRounded } from 'react-icons/bi'
import UserMenu from '@/components/social/menu//UserMenu'
import { Menu } from 'primereact/menu'
import { useRef } from 'react'
import NotificationMenu from '@/components/social/menu/NotificationMenu'
import { Avatar } from 'primereact/avatar'
import { OverlayPanel } from 'primereact/overlaypanel'
import { useNavigate } from 'react-router-dom'
import LogoTlc from '@/assets/tlc.png'
import { useAuth } from '@/hooks/useAuth'
import { getAvatarUser } from '@/hooks/getAvatarUser'
import SearchInput from '@/components/input/SearchInput'
import AvatarUserNormal from './avatar/AvatarUserNormal'
interface NavBarProps {}
const NavBar: React.FC<NavBarProps> = ({}) => {
  const { user } = useAuth()
  const avatarUser = getAvatarUser(user)
  const navigate = useNavigate()
  const userMenu = useRef<Menu>(null)
  const notificationMenu = useRef<OverlayPanel>(null)
  return (
    <>
      <nav className='bg-white dark:bg-[#18191a] h-max md:h-14 w-full shadow flex flex-col md:flex-row items-center justify-center md:justify-between fixed top-0 z-50 border-b dark:border-0 dark:border-dark-third'>
        <div className='flex items-center justify-between w-full md:w-max px-4 py-2'>
          {/* Logo */}
          {true ? (
            <>
              <div className='mr-2 hidden md:inline-block cursor-pointer' onClick={() => navigate('/')}>
                <img src={LogoTlc} height='100' width='100' alt='TLC logo' />
              </div>
            </>
          ) : (
            <>
              <div className='mr-2 hidden md:inline-block cursor-pointer'>
                <img src={LogoTlc} height='100' width='100' alt='TLC logo' />
              </div>
            </>
          )}
          {/* End Logo */}
          {/* Search */}
          {true && (
            <SearchInput />
          )}
          {/* End Search */}
        </div>
        {/* Menu Icon */}
        {/* <ul className='flex w-full lg:w-max items-center justify-center'>
          <li className='w-1/5 md:w-max text-center'>
            <div className='w-full text-3xl py-2 px-3 xl:px-12 cursor-pointer text-center inline-block text-blue-500 border-b-4 border-blue-500'>
              <IoMdHome />
            </div>
          </li>
          {true && (
            <>
              <li className='w-1/5 md:w-max text-center'>
                <div className='w-full text-3xl py-2 px-3 xl:px-12 cursor-pointer dark:text-gray-300 dark:hover:bg-gray-800 text-center inline-block rounded text-gray-600 hover:bg-gray-100 dark:hover:bg-dark-third dark:text-dark-txt relative'>
                  <MdGroup />
                </div>
              </li>
              <li className='w-1/5 md:w-max text-center hidden md:inline-block'>
                <div className='w-full text-3xl py-2 px-3 xl:px-12 cursor-pointer dark:text-gray-300 dark:hover:bg-gray-800 text-center inline-block rounded text-gray-600 hover:bg-gray-100 dark:hover:bg-dark-third dark:text-dark-txt relative'>
                  <FaStore />
                  <span className='text-xs absolute top-2 right-1/4 bg-red-500 text-white font-semibold rounded-full px-1 text-center'>
                    9+
                  </span>
                </div>
              </li>
            </>
          )}
        </ul> */}
        {/* End Menu Icon */}
        <ul className='hidden md:flex mx-4 items-center justify-center'>
          <li className='h-full hidden xl:flex'>
            {true ? (
              <div></div>
            ) : (
              <div
                onClick={() => navigate('/login')}
                className='animate-pulse cursor-pointer inline-flex items-center justify-center p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 mx-1'
              >
                <img
                  src='https://th.bing.com/th/id/OIP.Cl56H6WgxJ8npVqyhefTdQHaHa?pid=ImgDet&rs=1'
                  alt='Profile picture'
                  className='rounded-full h-10 w-10'
                />
                <span className='mx-2 font-semibold dark:text-dark-txt'>Sign Up</span>
              </div>
            )}
          </li>
          {true && (
            <>
              {true && (
                <li>
                  {true ? (
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      // onClick={() => setIsMessenger(false)}
                      className='text-xl xl:grid place-items-center bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-800 dark:text-white  rounded-full mx-1 p-4 cursor-pointer hover:bg-gray-300 relative'
                    >
                      <BiSolidMessageRounded />
                    </motion.div>
                  ) : (
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      // onClick={() => setIsMessenger(true)}
                      className='text-xl  xl:grid place-items-center bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-800 dark:text-white  rounded-full mx-1 p-3 cursor-pointer hover:bg-gray-300 relative'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                        fill='currentColor'
                        className='w-6 h-6'
                      >
                        <path
                          fillRule='evenodd'
                          d='M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z'
                          clipRule='evenodd'
                        />
                      </svg>

                      {/*            <span className="animate-ping text-xs absolute top-0 right-0 bg-blue-500 text-white font-semibold rounded-full px-1 text-center">
                                New
                            </span> */}
                    </motion.div>
                  )}
                </li>
              )}

              <li>
                <div
                  className='text-xl grid place-items-center bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-800 dark:text-white  rounded-full mx-1 p-4 cursor-pointer hover:bg-gray-300 relative'
                  onClick={(event) => notificationMenu.current?.toggle(event)}
                  aria-controls='popup_notification_menu_right'
                  aria-haspopup
                >
                  <IoIosNotifications />
                  <span className='animate-ping text-xs absolute top-0 right-0 bg-red-500 text-white font-semibold rounded-full px-1 text-center'>
                    9
                  </span>
                </div>
                <NotificationMenu id='popup_notification_menu_right' refMenu={notificationMenu} />
              </li>
              <li>
                <div
                  onClick={(event) => userMenu.current?.toggle(event)}
                  className='text-xl grid place-items-center  dark:bg-dark-third dark:text-dark-txt rounded-full mx-1 cursor-pointer  relative'
                  id='dark-mode-toggle'
                  aria-controls='popup_user_menu_right'
                  aria-haspopup
                >
                  <AvatarUserNormal size='large'/>
                </div>
                <UserMenu id='popup_user_menu_right' refMenu={userMenu} />
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  )
}
export default NavBar
