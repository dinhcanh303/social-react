import { LuReply } from 'react-icons/lu'
import AvatarComment from '@/components/social/avatar/AvatarComment'
import { imageC } from '@/constants/const'

interface CommentItemReplyProps {
  hidden?: boolean
}
const CommentItemReply: React.FC<CommentItemReplyProps> = ({ hidden = false }) => {
  return (
    <>
      <div className={`flex gap-1 items-center ml-10 ${hidden ? 'hidden' : ''}`}>
        <span className='rotate-180'>
          <LuReply />
        </span>
        <AvatarComment image={imageC} />
        <div className='hover:border-b hover:border-gray-500 cursor-pointer'>
          <span className='font-medium'>Foden Ngo</span>
          <span> replied · </span>
          <span>1 reply</span>
          <span className='text-xs'> 32m</span>
        </div>
      </div>
    </>
  )
}
export default CommentItemReply
