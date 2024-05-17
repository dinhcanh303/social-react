import { CommentHasChildren } from '@/models/Comment'
import CommentItemContent from './CommentItemContent'
import CommentReplyList from './CommentReplyList'
interface CommentItemProps {
  postId: string
  comment?: CommentHasChildren
}

const CommentItem: React.FC<CommentItemProps> = ({ postId, comment }) => {
  return (
    <>
      {comment && (
        <>
          <CommentItemContent postId={postId} comment={comment} />
          {comment?.children?.length > 0 && <CommentReplyList parent={comment} />}
        </>
      )}
    </>
  )
}

export default CommentItem
