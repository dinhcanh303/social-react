import React from 'react'
import Feed from '@/components/social/Feed'
import { motion } from 'framer-motion'
import PostForm from '@/components/social/PostForm'
import NavBar from '@/components/social/NavBar'
import LeftMenu from '@/components/social/LeftMenu'
import RightMenu from '@/components/social/RightMenu'
import { useAuth } from '@/hooks/useAuth'
import LeftMenuGroup from '@/components/social/group/LeftMenuGroup'
import { useParamsString } from '@/utils/utils'
import { useParams } from 'react-router-dom'
interface GroupsFeedProps {


}
const GroupsFeed: React.FC<GroupsFeedProps> = ({}) => {
  return (
      <section className='flex justify-between h-screen overflow-y-scroll'>
        <LeftMenuGroup />
        <div className='w-full xl:w-3/6 pt-32 lg:pt-16 px-2 mr-60'>
            <Feed type='groups'/>
        </div>
      </section>
  )
}
export default GroupsFeed