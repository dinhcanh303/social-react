import React, { RefObject, useEffect, useState } from 'react'
import { Avatar } from 'primereact/avatar'
import { OverlayPanel } from 'primereact/overlaypanel'
import { END_POINT_MINIO, LIMIT_NOTI, image } from '@/constants/const'
import { MdOutlinePostAdd } from 'react-icons/md'
import { motion } from 'framer-motion'
import { TabPanel, TabView } from 'primereact/tabview'
import toast from 'react-hot-toast'
import { useInView } from 'react-intersection-observer'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { getNotifications, readNotification } from '@/apis/notification.api'
import { GetNotificationsResponse } from '@/types/noti.type'
import { AxiosResponse } from 'axios'
import { Notification } from '@/models/Notification'
import moment from 'moment'
import { getProfile } from '@/apis/auth.api'
import { FaRegComment } from 'react-icons/fa'

interface NotificationMenuProps {
  refMenu?: RefObject<OverlayPanel>
  alignment?: 'left' | 'right'
}

const NotificationMenu: React.FC<NotificationMenuProps> = ({ refMenu, alignment = 'right' }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const { ref, inView } = useInView()
  const { data, status, error, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['notifications', activeIndex == 0 ? 'unread' : 'read'],
    queryFn: ({ pageParam }) => {
      const controller = new AbortController()
      setTimeout(() => {
        controller.abort()
      }, 5000)
      return getNotifications(
        {
          limit: LIMIT_NOTI,
          offset: pageParam,
          options: activeIndex == 0 ? true : false
        },
        controller.signal
      )
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      const length = lastPage?.data?.notifications?.length
      const nextPage = length < LIMIT_NOTI ? undefined : lastPageParam + length
      return nextPage
    }
  })
  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [fetchNextPage, inView])
  const content = data?.pages.map((notifications: AxiosResponse<GetNotificationsResponse, any>) => {
    return notifications?.data?.notifications.map((noti, index) => {
      return <NotificationItem key={noti?.id ?? index} noti={noti} />
    })
  })
  if (error?.message) {
    toast.error(error.message)
  }
  return (
    <div className='card flex flex-column align-items-center gap-3'>
      <OverlayPanel ref={refMenu} closeOnEscape dismissable={false} className='p-2'>
        <div className='w-[420px] h-[85vh]'>
          <div className='flex justify-between text-xl text-black p-2'>
            <span>Notifications</span>
            <i className='pi pi-ellipsis-h'></i>
          </div>
          <div className='w-[420px] mx-0'>
            <TabView
              className='m-0'
              panelContainerClassName='p-0'
              activeIndex={activeIndex}
              onTabChange={(e) => setActiveIndex(e.index)}
            >
              <TabPanel header='UnRead' className='m-0'>
                <div className='overflow-y-auto h-[70vh]'>
                  {content}
                  <div className='flex justify-center items-center'>
                    <button
                      className='text-sm font-normal'
                      ref={ref}
                      onClick={() => fetchNextPage()}
                      disabled={!hasNextPage || isFetchingNextPage}
                    >
                      {isFetchingNextPage ? 'Loading more...' : hasNextPage ? 'Load Newer' : '...'}
                    </button>
                  </div>
                </div>
              </TabPanel>
              <TabPanel header='Read'>
                <div className='overflow-y-auto h-[70vh]'>
                  {content}
                  <div className='flex justify-center items-center'>
                    <button
                      className='text-sm font-normal'
                      ref={ref}
                      onClick={() => fetchNextPage()}
                      disabled={!hasNextPage || isFetchingNextPage}
                    >
                      {isFetchingNextPage ? 'Loading more...' : hasNextPage ? 'Load Newer' : '...'}
                    </button>
                  </div>
                </div>
              </TabPanel>
            </TabView>
          </div>
        </div>
      </OverlayPanel>
    </div>
  )
}
export default NotificationMenu

type NotificationItemProps = {
  noti: Notification
}
const NotificationItem: React.FC<NotificationItemProps> = ({ noti }) => {
  const isRead = noti.readAt
  const actorRes = useQuery({
    queryKey: ['profile', noti.actorId],
    queryFn: () => {
      return getProfile(noti.actorId)
    }
  })
  const actorProfile = actorRes?.data?.data?.user
  const imageActor = END_POINT_MINIO + actorProfile?.avatarUrl

  const [icon, colorIcon, title] = getDataRenderNotiByObjectType(noti?.objectType)
  const handleOpenNotification = async (noti: Notification) => {
    if (!noti.readAt) await readNotification(noti?.id)
  }
  return (
    <motion.div
      whileHover={{ scale: 1 }}
      whileTap={{ scale: 1 }}
      className='flex justify-start mt-1 items-center hover:bg-gray-200 dark:hover:bg-gray-800 p-2 rounded-lg cursor-pointer text-gray-500 dark:text-gray-300 dark:hover:text-gray-200'
      onClick={() => handleOpenNotification(noti)}
    >
      <div className='relative'>
        <Avatar image={imageActor} size='large' shape='circle'></Avatar>
        <span
          className={`text-white flex w-6 h-6 ${colorIcon} rounded-full absolute right-0 top-3/4 border-white border-1 pt-1 justify-center`}
        >
          {icon}
        </span>
      </div>
      <div className='px-4 py-1 relative'>
        <div className='w-auto'>
          <span>
            {title} <span className='text-base text-black'>SPEAKING EVERYDAY</span> da dang trong Go Microservices
          </span>
        </div>
        <div>
          <span className='text-sm text-blue-500'>{moment(new Date(noti?.createdAt ?? 0)).fromNow()}</span>
        </div>
        {!isRead && (
          <span className='bg-blue-500 w-2 h-2 rounded-full absolute right-0 top-1/3 mt-2 border-white border-1'></span>
        )}
      </div>
    </motion.div>
  )
}
const getDataRenderNotiByObjectType = (objectType: string) => {
  switch (objectType) {
    case 'post':
      return [<MdOutlinePostAdd />, 'bg-green-500', 'Create new post:']
    case 'like':
      return [<MdOutlinePostAdd />, 'bg-blue-500', 'Like:']
    case 'comment':
      return [<FaRegComment />, 'bg-red-500', 'Comment:']
    default:
      return ['', '']
  }
}
