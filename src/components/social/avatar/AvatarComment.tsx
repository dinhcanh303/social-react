import { Avatar } from 'primereact/avatar'

interface AvatarCommentProps {
  image: string
  className?: string
  size?: 'normal' | 'large' | 'xlarge'
}
const AvatarComment: React.FC<AvatarCommentProps> = ({ image, className, size = 'normal' }) => {
  return (
    <>
      <div className='mr-2 cursor-pointer'>
        <Avatar className={className} size={size} image={image} shape='circle'></Avatar>
      </div>
    </>
  )
}

export default AvatarComment
