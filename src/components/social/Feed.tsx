import { motion} from 'framer-motion'
import { useEffect } from 'react'
import PostSkeleton from '@/components/social/Skeleton'
import Post from '@/components/social/Post'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getFeed, getFeedGroup, getFeedGroups, getFeedProfile } from '@/apis/feed.api'
import { FeedResponse } from '@/types/feed.type'
import { AxiosResponse } from 'axios'
import { useInView } from 'react-intersection-observer'
import toast from 'react-hot-toast'
import { LIMIT_POST } from '@/constants/const'
import { useStateFeedStore } from '@/store/state-feed'
interface FeedProps{
  type?: "default" | "group" | "profile" | "groups"
  groupId?: string
  userId?: string
}
const Feed: React.FC<FeedProps> = ({type= "default",groupId,userId}) => {
  const { ref, inView } = useInView()
  const {typeFeed ,setTypeFeed} = useStateFeedStore()
  useEffect(() => {
    setTypeFeed(type)
  },[])
  const {
    data,
    status,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["feed",typeFeed],
    queryFn: ({pageParam}) => {
      const controller = new AbortController()
      setTimeout(() => {
        controller.abort()
      }, 5000)
      switch (type) {
        case 'group':
          return getFeedGroup(groupId,LIMIT_POST, pageParam, controller.signal)
        case 'groups':
          return getFeedGroups(LIMIT_POST, pageParam, controller.signal)
        case 'profile':
          return getFeedProfile(userId,LIMIT_POST, pageParam, controller.signal)
        default:
          return getFeed(LIMIT_POST, pageParam, controller.signal)
      }
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage,_,lastPageParam) => {
      const length = lastPage?.data?.posts?.length
      const nextPage = length < LIMIT_POST ? undefined : lastPageParam + length
      return nextPage;
    }
  })
  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [fetchNextPage, inView])
  const content = data?.pages.map((posts: AxiosResponse<FeedResponse, any> ) => {
    return posts?.data?.posts.map((dataOfFeed,index) => {
      return <Post key={dataOfFeed?.post?.id ?? index} postMetadata={dataOfFeed}/>
    })
  })
  if(error?.message){
    toast.error(error.message)
  }
  return (
    <>
      {status === "pending" ? (
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <PostSkeleton/>
          <PostSkeleton/>
          <PostSkeleton/>
          <PostSkeleton/>
          <PostSkeleton/>
          <PostSkeleton/>
          <PostSkeleton/>
          <PostSkeleton/>
          <PostSkeleton/>
          <PostSkeleton/>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          {content}
        </motion.div>
      )}
      <div className='flex justify-center text-xs font-medium'>
            <button
              ref={ref}
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              {isFetchingNextPage
                ? 'Loading more...'
                : hasNextPage
                  ? 'Load Newer'
                  : '...'}
            </button>
      </div>
    </>
  )
}
export default Feed;
