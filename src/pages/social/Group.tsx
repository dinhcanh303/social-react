import React from 'react'
import { useParams } from 'react-router-dom'
import GroupRender from '@/components/social/group/GroupRender'
interface GroupProps {
}
const Group: React.FC<GroupProps> = ({}) => {
    const paramsString: {id?: string} = useParams()
    var groupId = paramsString?.id
    if(!groupId) return 
  // const [isMessenger, setIsMessenger] = useState(false)
  return (
        <section className='px-32 h-screen overflow-y-scroll'>
            <GroupRender groupId={groupId} />
        </section>
)
}
export default Group