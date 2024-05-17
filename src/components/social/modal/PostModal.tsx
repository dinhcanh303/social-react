import { Dialog } from 'primereact/dialog'
import PostContent from '../PostContent'
import { PostMetadata } from '@/types/feed.type'
import Gallery from '@/components/attachment/Gallery'
interface PostModalProps {
  onHide: any
  hide: any
  postMetadata?: PostMetadata
}
const PostModal: React.FC<PostModalProps> = ({ hide, onHide , postMetadata }) => {
  // const placeHolder = "What's on your mind, Foden Ngo"
  // const [value, setValue] = useState<string>('')
  // const [valueEmoji, setValueEmoji] = useState<any>(null)
  // const [isUploadFileVisible, setIsUploadFileVisible] = useState<boolean>(true)
  const attachments = postMetadata?.attachments
  return (
    <div>
      <Dialog
        header='Post'
        headerClassName='text-center mb-[-16px]'
        visible={hide}
        contentClassName='overflow-hidden'
        style={{ width: '72vw' }}
        onHide={() => onHide(false)}
      >
        <div className='grid grid-cols-3'>
          <div className='col-span-2'>
            <Gallery attachments={attachments}></Gallery>
          </div>
          <div className='pl-2'>
            <PostContent postMetadata={postMetadata} inPostModal/>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

export default PostModal
