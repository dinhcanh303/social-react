import { useRef, useState } from 'react'
import AvatarUser from '@/components/social/avatar/AvatarUser'
import CommentInput from '@/components/social/comment/CommentInput'
import CommentList from '@/components/social/comment/CommentList'
import PostButtonGroup from '@/components/social/PostButtonGroup'
import { PostMetadata } from '@/types/feed.type'
import Attachments from '../attachment/Attachments'
import PostModal from './modal/PostModal'
import { convertEmojiLike } from '@/utils/utils'
import { OverlayPanel } from 'primereact/overlaypanel'
import { CiEdit } from "react-icons/ci";
import { MdAutoDelete } from "react-icons/md";
import { useAuth } from '@/hooks/useAuth'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deletePost } from '@/apis/post.api'
import toast from 'react-hot-toast'
import { useStateFeedStore } from '@/store/state-feed'
interface PostContentProps {
  postMetadata?: PostMetadata
  inPostModal?: boolean
}

const PostContent: React.FC<PostContentProps> = ({ postMetadata,inPostModal = false }) => {
  const [openPostModal, setOpenPostModal] = useState<boolean>(false)
  const [openCommentList,setOpenCommentList] = useState<boolean>(false)
  const op = useRef<OverlayPanel>(null);
  const {user} = useAuth()
  const queryClient = useQueryClient()
  const {typeFeed} = useStateFeedStore()
  const deletePostMutation = useMutation({
    mutationFn: (id:number|string) => deletePost(id),
    onSuccess: (_,id) => {
      toast.success(`Deleted post ${id} successfully`)
      queryClient.invalidateQueries({queryKey: [`feed`,typeFeed],exact: true})
    }
  })
  if(!postMetadata?.post) return
  const post = postMetadata?.post
  const group = postMetadata?.group
  const ownerPost = postMetadata?.user
  const totalComment = postMetadata?.countComments
  const attachments = postMetadata?.attachments
  const handleDeletePost = (id:string) => {
    deletePostMutation.mutate(id)
  }
  const handleEditPost = () => {
  }
  return (
    <>
      <div className='flex items-center justify-between'>
        <AvatarUser post={post} group={group} owner={ownerPost}/>
        <div 
        className='w-8 h-8 grid place-items-center text-xl text-gray-500 hover:bg-gray-200 dark:text-dark-txt dark:hover:bg-dark-third rounded-full cursor-pointer'
        onClick={(e) => op.current?.toggle(e)}
        >
          <i className='pi pi-ellipsis-h'></i>
        </div>
        <OverlayPanel ref={op} className='rounded-lg' >
            {post.userId === user?.id && (
            <div className='w-60 bg-gray-100 p-2'>
                <div className='flex gap-3 py-2 px-3 hover:bg-gray-300 rounded-lg cursor-pointer'
                onClick={handleEditPost}>
                <CiEdit className='mt-1'/>
                <span>Edit Post</span>
              </div>
                <div className='flex gap-3 py-2 px-3 hover:bg-gray-300 rounded-lg cursor-pointer'
                onClick={() => handleDeletePost(post?.id)}
                >
                <MdAutoDelete className='mt-1'/>
                <span>Delete Post</span>
              </div>
            </div>
            )}
          
        </OverlayPanel>
      </div>
      <div className=''>
        {post.bgContent != "" ? (
          <div className={`${post?.bgContent} rounded-lg p-2`}>
            <div className='h-96 flex justify-center align-middle items-center text-center px-2'>
                  <p className='text-lg font-medium'>{post?.content}</p>
            </div>
          </div>
        ) : (<div className='text-justify py-2'>{post?.content}</div>)}
      {!inPostModal && (
        attachments.length > 0 && (
            <Attachments attachments={attachments} setOpenPostModal={setOpenPostModal} ></Attachments>
        )
      )}
      
      <PostButtonGroup key={post.id} postId={post.id} source={postMetadata} 
        open={openCommentList} 
        setOpen={setOpenCommentList} 
      />
      <div className={inPostModal ? "overflow-y-auto h-96" : ""}>
        <CommentInput postId={post.id} />
        {totalComment > 0 && (<CommentList postId={post.id} visible={openCommentList}/>)}
      </div>
      <PostModal postMetadata={postMetadata}  hide={openPostModal} onHide={setOpenPostModal} />
      </div>
    </>
  )
}

export default PostContent
