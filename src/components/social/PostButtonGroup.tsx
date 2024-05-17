import { FaRegComment } from 'react-icons/fa'
import { IoIosShareAlt } from 'react-icons/io'
import EmojiGroupLike from './emoji/EmojiGroupLike'
import EmojiImage from './emoji/EmojiImage'
import { capitalizeWord, convertEmojiLike, getIcon, getName } from '@/utils/utils'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { AiOutlineLike } from 'react-icons/ai'
import { useMutation } from '@tanstack/react-query'
import { CreateLikeRequest } from '@/types/like.type'
import { createLike } from '@/apis/like.api'
import toast from 'react-hot-toast'
import { isAxiosError } from 'axios'
import { ApiResponse } from '@/types/app'
import { PostMetadata } from '@/types/feed.type'
interface PostButtonGroupProps {
  open?: any
  setOpen?: any
  source?: PostMetadata
  postId:string
}
const PostButtonGroup: React.FC<PostButtonGroupProps> = ({ postId, open, setOpen,source }) => {
  const totalComment = source?.countComments
  const othersLikedEmojis = source?.likes?.othersLikedEmojis
  const othersLikes = source?.likes?.othersLikes
  const yourLike = source?.likes?.yourLike
  const yourLikedEmoji = source?.likes?.yourLikedEmoji
  const [emoji, setEmoji] = useState<string|null>(yourLikedEmoji ? yourLikedEmoji : null)
  const createLikeMutation = useMutation({
    mutationFn: (body: CreateLikeRequest) => {
      return createLike(body)
    },
    mutationKey: ['createLike','Like/Post',postId]
  })
  const handleCreateLike = () => {
    const body : CreateLikeRequest = {
      like: {
        likeableId: postId,
        likeableType: "Like/Post",
        emoji: emoji ?? "like"
      }
    }
    setEmoji(prevEmoji => {
      if(prevEmoji && emoji && prevEmoji == emoji){
        return null
      }
      return "like"
    })
    createLikeMutation.mutate(body, {
      onError: (error) => {
        if (isAxiosError<ApiResponse>(error)) {
          if (error?.response?.data?.message) {
            toast.error(error?.response?.data?.message)
          } else {
            toast.error(error.message)
          }
        }
      }
    })
  }
  const handleRenderLiked = () => {
    return (<div className='flex'>{
      othersLikedEmojis && (
        othersLikedEmojis.map((emoji,index) => {
          const alt = getName(emoji)
          const src = getIcon(emoji)
          return <img key={`emoji-post-${index}-${postId}`} height={15} width={15} alt={alt} src={src} />
        })
      )
      }
    </div>)
  }
  let infoLikeRender = ""
  if(yourLike != 0){
      infoLikeRender += "You"
  }
  if(othersLikes != 0){
    infoLikeRender += "and" + othersLikedEmojis + "others"
  }
  return (
    <>
      <div className='flex justify-between text-sm p-1'>
          <span className='flex items-center gap-2'>
            <div>{handleRenderLiked()}</div>
            <p className='text-sm'>{infoLikeRender}</p>
          </span>
          {totalComment != 0 ? (
            <span>{totalComment} comments</span>
          ) : ("")}
      </div>
      <div className='border-t'></div>
      <div className='flex'>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`tooltip-like-btn-post-${postId} w-1/3 flex space-x-2 justify-center items-center hover:bg-gray-100 dark:hover:bg-gray-800 text-xl py-2 rounded-lg cursor-pointer text-gray-500 dark:text-gray-300 dark:hover:text-gray-200`}
          onClick={handleCreateLike}
        >
          {emoji == null ? 
          (<AiOutlineLike />) 
          : 
          (<EmojiImage className={`${emoji ? '' : 'hidden'}`} name={getName(emoji)} src={getIcon(emoji)} />)}
          <span className='text-sm font-semibold'>{emoji ? capitalizeWord(emoji) : 'Like'}</span>
        </motion.div>
        <EmojiGroupLike entityId={postId} target={`.tooltip-like-btn-post-${postId}`} setEmoji={setEmoji} />
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={
            open
              ? `w-1/3 flex space-x-2 justify-center items-center bg-gray-100 dark:bg-gray-800  dark:hover:bg-gray-800  text-xl py-2 rounded-lg cursor-pointer text-gray-500 dark:text-gray-300 dark:hover:text-gray-200`
              : `w-1/3 flex space-x-2 justify-center items-center hover:bg-gray-100 dark:hover:bg-gray-800 text-xl py-2 rounded-lg cursor-pointer text-gray-500 dark:text-gray-300 dark:hover:text-gray-200`
          }
          onClick={() => setOpen(!open)}
        >
          <FaRegComment />
          <span className='text-sm font-semibold'>Comment</span>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className='w-1/3 flex space-x-2 justify-center items-center hover:bg-gray-100 dark:hover:bg-gray-800 text-xl py-2 rounded-lg cursor-pointer text-gray-500 dark:text-gray-300 dark:hover:text-gray-200'
        >
          <IoIosShareAlt />
          <span className='text-sm font-semibold'>Share</span>
        </motion.div>
      </div>
      <div className='border-b'></div>
    </>
  )
}
export default PostButtonGroup
