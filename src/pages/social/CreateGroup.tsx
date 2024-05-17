import React from 'react'
import LeftMenuCreateGroup from '@/components/social/group/LeftMenuCreateGroup'
import { Card } from 'primereact/card'
import { GROUP_PREVIEW } from '@/constants/const'
import GroupRenderDemo from '@/components/social/group/GroupRenderDemo'
interface CreateGroupProps {
}
const CreateGroup: React.FC<CreateGroupProps> = ({}) => {
    return (
        <section className='flex justify-between h-screen overflow-y-scroll'>
            <LeftMenuCreateGroup />
            <Card className='w-full mx-24 mt-20 mb-10'>
                    <span className='font-medium text-lg'>Desktop Preview</span>
                <div className='overflow-y-scroll max-h-[750px]'>
                    <GroupRenderDemo group={GROUP_PREVIEW}/>
                </div>
            </Card>        
        </section>
    )
}
export default CreateGroup