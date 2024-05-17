import { getCommentsByCommentId } from '@/apis/comment.api'
import CommentItemContent from '@/components/social/comment/CommentItemContent'
import CommentItemReply from '@/components/social/comment/CommentReply'
import { LIMIT_COMMENT } from '@/constants/const'
import { CommentHasChildren } from '@/models/Comment'
import { GetCommentsByCommentIdResponse } from '@/types/comment.type'
import { useInfiniteQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast'

interface CommentReplyListProps {
  parent?: CommentHasChildren
}

const CommentReplyList: React.FC<CommentReplyListProps> = ({parent}) => {
  if(parent === undefined) return
  const commentId = parent?.id
  const comments = parent?.children
  const [isQueryEnabled, setIsQueryEnabled] = useState<boolean>(false);
  const {
    data,
    // status,
    error,
    fetchNextPage,
    // isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['comments_child',commentId],
    queryFn: ({pageParam}) => {
      const controller = new AbortController()
      setTimeout(() => {
        controller.abort()
      }, 5000)
      return getCommentsByCommentId(commentId,LIMIT_COMMENT, pageParam, controller.signal)
    },
    initialPageParam: 0,
    enabled:isQueryEnabled,
    getNextPageParam: (lastPage,_,lastPageParam) => {
      const length = lastPage?.data?.comments?.length
      const nextPage = length < LIMIT_COMMENT ? undefined : lastPageParam + length
      return nextPage;
    }
  })
  const content = data?.pages.map((comments: AxiosResponse<GetCommentsByCommentIdResponse, any> ) => {
    return comments?.data?.comments.map((comment,index) => {
      return (
          <div key={comment?.id ?? index}>
            {/* <CommentItemReply hidden={true} /> */}
            <CommentItemContent postId={parent.postId} isChildren={true} comment={comment}/>
          </div>
      )
    })
  })
  if(error?.message){
    toast.error(error.message)
  }
  const handleLoadMore = () => {
    setIsQueryEnabled(true)
    fetchNextPage()
  }
  const render = !isQueryEnabled ? (
    comments.map((comment,index) => {
      return (
        <div key={comment?.id ?? index}>
          {/* <CommentItemReply hidden={true} /> */}
          <CommentItemContent postId={parent.postId} isChildren={true} comment={comment}/>
        </div>
      )
    })
  ) : (content)
  const hiddenLoadMore = (!isQueryEnabled && comments.length > 0) ? true : (hasNextPage ? true :false)
  return (
    <>
      {render}
      {comments.length > 0 && (
      <button className={`ml-10 text-xs font-medium pb-2 pt-1 cursor-pointer ${hiddenLoadMore ? "" : "hidden"}`} 
        onClick={handleLoadMore}>
        Load more replies
      </button>
      )}
    </>
  )
}

export default CommentReplyList
