import React from 'react'
import Feed from '@/components/social/Feed'
import { motion } from 'framer-motion'
import PostForm from '@/components/social/PostForm'
import NavBar from '@/components/social/NavBar'
import LeftMenu from '@/components/social/LeftMenu'
import RightMenu from '@/components/social/RightMenu'
import { useAuth } from '@/hooks/useAuth'

interface NewFeedProps {}
const NewFeed: React.FC<NewFeedProps> = () => {
  const { user } = useAuth()
  return (
      <section className='flex justify-center h-screen overflow-y-scroll'>
        <LeftMenu />
        <div className='w-full lg:w-2/3 xl:w-2/5 pt-32 lg:pt-16 px-2 '>
          {false ? (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className='flex flex-col items-center justify-center h-auto min-h-screen bg-gray-100 text-gray-800 dark:bg-[#28282B]'
            >
              {/* <Messenger /> */}
            </motion.div>
          ) : (
            <>
              {user && (
                <>
                  <PostForm isShow={true} />
                </>
              )}
              <Feed />
            </>
          )}
        </div>
        {user && <RightMenu />}
      </section>
  )
}
export default NewFeed
