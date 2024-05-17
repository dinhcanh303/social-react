import { getCommentsByPostId } from '@/apis/comment.api'
import CommentItem from '@/components/social/comment/CommentItem'
import { LIMIT_COMMENT } from '@/constants/const'
import { GetCommentsByPostIdResponse } from '@/types/comment.type'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { ProgressSpinner } from 'primereact/progressspinner'
import toast from 'react-hot-toast'

interface CommentListProps {
  postId: string
  visible?: boolean
}
const CommentList: React.FC<CommentListProps> = ({ postId ,visible = true}) => {
  const {
    data,
    status,
    error,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['comments',postId],
    queryFn: ({pageParam}) => {
      const controller = new AbortController()
      setTimeout(() => {
        controller.abort()
      }, 5000)
      return getCommentsByPostId(postId,LIMIT_COMMENT, pageParam, controller.signal)
    },
    initialPageParam: 0,
    enabled: visible,
    getNextPageParam: (lastPage,_,lastPageParam) => {
      const length = lastPage?.data?.comments?.length
      const nextPage = length < LIMIT_COMMENT ? undefined : lastPageParam + length
      return nextPage;
    }
  })
  const content = data?.pages.map((posts: AxiosResponse<GetCommentsByPostIdResponse, any> ) => {
    return posts?.data?.comments.map((comment,index) => {
      return <CommentItem key={comment?.id ?? index} postId={postId} comment={comment}></CommentItem>
    })
  })
  if(error?.message){
    toast.error(error.message)
  }
  if(!visible) return

  return (
    <>
    {status === 'pending' && (
      <div className='flex justify-center'>
        <ProgressSpinner className='w-10 h-10'/>
      </div>
    )}
        <div className='my-2'></div>
        {content}
        {hasNextPage && (
          <button className='text-sm font-medium cursor-pointer' 
            onClick={() => fetchNextPage()}
            >
            Load more comments
          </button>
        )}
    </>
  )
}

export default CommentList
