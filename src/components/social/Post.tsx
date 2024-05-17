import { Card } from 'primereact/card'
import PostContent from '@/components/social/PostContent'
import { PostMetadata } from '@/types/feed.type'
interface PostProps {
  postMetadata?: PostMetadata
}
const Post: React.FC<PostProps> = ({postMetadata}) => {
  return (
    <>
      <Card className='mt-3 rounded-lg'>
        <PostContent postMetadata={postMetadata} />
      </Card>
    </>
  )
}

export default Post
