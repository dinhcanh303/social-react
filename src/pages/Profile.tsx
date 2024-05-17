import { getProfile } from '@/apis/auth.api'
import NavBar from '@/components/social/NavBar'
import Attachments from '@/components/social/attachment/Attachments'
import ProfileHeader from '@/components/social/profile/ProfileHeader'
import ProfilePost from '@/components/social/profile/ProfilePost'
import { useAuth } from '@/hooks/useAuth'
import { useParamsString } from '@/utils/utils'
import { useQuery } from '@tanstack/react-query'
import { TabPanel, TabView } from 'primereact/tabview'

interface ProfileProps {}
const Profile: React.FC<ProfileProps> = () => {
  const { user } = useAuth()
  const paramsString: { id?: string } = useParamsString()
  let userId = paramsString?.id
  if (!userId) {
    userId = user?.id
  }
  const profileRes = useQuery({
    queryKey: ['profile', userId],
    queryFn: () => {
      return getProfile(userId)
    }
  })
  const userProfile = profileRes?.data?.data?.user
  const edit = user?.id === userProfile?.id ? true : false
  if (!userProfile) return
  const items = [
    { label: 'Posts', icon: 'pi pi-home mr-2', content: <ProfilePost userProfile={userProfile} /> },
    { label: 'Friends', icon: 'pi pi-users mr-2', content: '' },
    { label: 'Photos', icon: 'pi pi-images mr-2', content: <Attachments userId={userId} /> },
    { label: 'Videos', icon: 'pi pi-video mr-2', content: <Attachments userId={userId} mimeType='video' /> },
    { label: 'More', icon: 'pi pi-inbox mr-2', content: '' }
  ]

  return (
    <>
      <section className='h-screen overflow-y-scroll'>
        <ProfileHeader className='px-64' user={userProfile} edit={edit} />
        <TabView className='px-64 mx-2 text-sm'>
          {items.length > 0 &&
            items.map((item, index) => {
              return (
                <TabPanel key={index} header={item.label} leftIcon={item.icon} className='bg-gray-100'>
                  {item.content}
                </TabPanel>
              )
            })}
        </TabView>
      </section>
    </>
  )
}
export default Profile
