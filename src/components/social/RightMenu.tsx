import { getUsersBirthdayByCurrentDay } from '@/apis/auth.api'
import ButtonWrap from '@/components/button/ButtonWrap'
import { END_POINT_MINIO } from '@/constants/const'
import { useAuth } from '@/hooks/useAuth'
import { useQuery } from '@tanstack/react-query'

type RightMenuProps = {
}

const RightMenu: React.FC<RightMenuProps> = ({  }) => {
  const {user} = useAuth()
  const userRes = useQuery({
    queryKey: ['birthday_current_day'],
    queryFn: () => {return getUsersBirthdayByCurrentDay()}
  })
  const users = userRes?.data?.data?.users
  
  return (
    <div className='scrollbar-hide w-1/5 pt-16 h-full hidden xl:flex flex-col fixed top-0 right-0'>
      <span className='mt-2 font-semibold text-gray-600 text-xl'>Birthdays</span>
      <div className='flex'>
      {user && users && users.length > 0 && (
            users.map((user,index) => {
              const isLastItem = index === users.length - 1;
              return (
                <div key={user.id} className='text-base font-medium text-blue-500 flex italic cursor-pointer items-center gap-1'>
                  <img src={END_POINT_MINIO + user?.avatarUrl} alt={user?.fullName} className='w-6 h-6 rounded-full' />
                  <span>{user?.fullName} {isLastItem ? '' : ','}</span>
                </div>
              
              )
            }
            ))
            
          }
      </div>
      <span className='italic'> have birthdays today.</span>
      <div className='border-t'></div>
      <span className='mt-2 font-semibold text-gray-600 text-xl'>Contacts</span>
    </div>
  )
}
export default RightMenu
