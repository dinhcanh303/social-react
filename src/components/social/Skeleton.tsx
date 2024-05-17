import { Card } from 'primereact/card'
import { Skeleton } from 'primereact/skeleton'

interface SkeletonProps {
  loading?: boolean
}

const PostSkeleton: React.FC<SkeletonProps> = ({ loading = true }) => {
  return (
    <div>
    {loading && (<Card className='mt-4 rounded-lg'>
          <div className='border-round border-1 surface-border p-4 surface-card'>
            <div className='flex mb-3'>
              <Skeleton shape='circle' size='4rem' className='mr-2'></Skeleton>
              <div>
                <Skeleton width='10rem' className='mb-2'></Skeleton>
                <Skeleton width='5rem' className='mb-2'></Skeleton>
                <Skeleton height='.5rem'></Skeleton>
              </div>
            </div>
            <Skeleton width='100%' height='350px'></Skeleton>
            <div className='border-t mt-2'></div>
            <div className='flex justify-content-between mt-3'>
              <Skeleton className='mr-1' width='33%' height='2rem'></Skeleton>
              <Skeleton className='mr-1' width='33%' height='2rem'></Skeleton>
              <Skeleton width='33%' height='2rem'></Skeleton>
            </div>
          </div>
        </Card>)}
    </div>
  )
}
export default PostSkeleton
