import { getGroups } from '@/apis/group.api'
import SearchInput from '@/components/input/SearchInput'
import { LIMIT_GROUP } from '@/constants/const'
import { useAuth } from '@/hooks/useAuth'
import { GetGroupsResponse } from '@/types/group.type'
import { useInfiniteQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import GroupItem from './LeftMenuGroupItem'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface LeftMenuGroupProps {}
// eslint-disable-next-line no-empty-pattern
const LeftMenuGroup: React.FC<LeftMenuGroupProps> = ({}) => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const userId = user?.id ?? ''
  const { ref, inView } = useInView()
  const { data, status, error, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['groups', userId],
    queryFn: ({ pageParam }) => {
      const controller = new AbortController()
      setTimeout(() => {
        controller.abort()
      }, 5000)
      return getGroups(userId, LIMIT_GROUP, pageParam, controller.signal)
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      const length = lastPage?.data?.groups?.length
      const nextPage = length < LIMIT_GROUP ? undefined : lastPageParam + length
      return nextPage
    }
  })
  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [fetchNextPage, inView])
  const content = data?.pages.map((groups: AxiosResponse<GetGroupsResponse, any>) => {
    return groups?.data?.groups.map((group, index) => {
      return <GroupItem key={group?.id ?? index} group={group} />
    })
  })
  if (error?.message) {
    toast.error(error.message)
  }
  return (
    <Card className='w-96 mt-14'>
      <div>
        <span>Groups</span>
        {/* <SearchInput/> */}
        <Button
          size='small'
          className='w-full mt-3'
          outlined
          icon='pi pi-plus'
          label='Create new groups'
          onClick={() => navigate('/groups/create')}
        />
        <div className='border my-3'></div>
        <div className='h-96 overflow-y-auto'>
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
      </div>
    </Card>
  )
}
export default LeftMenuGroup
