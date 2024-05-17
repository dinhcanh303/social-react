import { useState } from 'react'
import { IoMdPhotos } from 'react-icons/io'
import { MdOutlineEmojiEmotions } from 'react-icons/md'
import { motion } from 'framer-motion'
import CreatePostModal from '@/components/social/modal/CreatePostModal'
import { Card } from 'primereact/card'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { getAvatarUser } from '@/hooks/getAvatarUser'
import AvatarUserNormal from './avatar/AvatarUserNormal'

interface PostFromProps {
  isShow: boolean
  disabled?: boolean
  groupId?: string
}
const PostForm: React.FC<PostFromProps> = ({ isShow ,disabled=false,groupId}) => {
  const { user } = useAuth()
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const navigate = useNavigate()

  const click = () => {
    navigate(`/profile?${user?.id}`)
  }
  return (
    <>
      <Card className={`px-4 mt-4 rounded-lg ${disabled ? "pointer-events-none" : "" }`}>
        <div className='p-2 border-b border-gray-300 dark:border-dark-third flex space-x-4'>
          {isShow ? (
            <AvatarUserNormal size='large' onClick={click}/>
          ) : (
            <AvatarUserNormal/>
          )}
          <div
            onClick={handleOpen}
            className='flex-1 bg-gray-100 rounded-full flex items-center justify-start pl-4 cursor-pointer dark:bg-gray-600 dark:text-gray-300 text-gray-500 text-lg'
          >
            <span>What's on your mind, {user?.fullName}?</span>
          </div>
        </div>
        <div className='p-2 flex justify-around'>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleOpen}
            className='w-1/3 flex space-x-2 justify-center items-center hover:bg-gray-100 dark:hover:bg-gray-800  text-xl sm:text-3xl py-2 rounded-lg cursor-pointer text-green-500'
          >
            <IoMdPhotos />
            <span className='text-xs sm:text-sm font-semibold text-gray-500 dark:text-white'>Photos</span>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleOpen}
            className='w-1/3 flex space-x-2 justify-center items-center hover:bg-gray-100 dark:hover:bg-gray-800 text-xl sm:text-3xl py-2 rounded-lg cursor-pointer text-yellow-500'
          >
            <MdOutlineEmojiEmotions />
            <span className='text-xs sm:text-sm font-semibold text-gray-500 dark:text-white'>Feeling</span>
          </motion.div>
        </div>
        <CreatePostModal groupId={groupId} setOpen={setOpen} open={open} />
      </Card>
    </>
  )
}
export default PostForm
