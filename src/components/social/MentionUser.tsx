import { Mention, MentionSearchEvent } from 'primereact/mention'
import { useState } from 'react'
import AvatarComment from '@/components/social/avatar/AvatarComment'
import { getUsers } from '@/apis/auth.api'
import { useQuery } from '@tanstack/react-query'
import { END_POINT_MINIO } from '@/constants/const'
import { User } from '@/models/User'
interface MentionUserProps {
  hidden?: boolean
  setTagIds: any
  value: string
  setValue: any
}

const MentionUser: React.FC<MentionUserProps> = ({ hidden = false, setTagIds,value, setValue }) => {
  const [suggestions, setSuggestions] = useState<any>([])
  const usersRes = useQuery(
    {
      queryKey: ['users'],
      queryFn: () => {
        return getUsers()
      }
    }
  )
  const users = usersRes.data?.data?.users
  const onSearch = (event: MentionSearchEvent) => {
    //in a real application, make a request to a remote url with the query and return suggestions, for demo we filter at client side
    setTimeout(() => {
      const query = event.query
      let suggestions
      if (!query.trim().length) {
        suggestions = [...users?? []]
      } else {
          suggestions = users?.filter((user: User) => {
            return user?.fullName?.toLowerCase().startsWith(query.toLowerCase())
          })
      }
      setSuggestions(suggestions)
    }, 250)
  }
  const itemTemplate = (suggestion: any) => {
    return (
      <div className='flex align-items-center items-center'>
        <AvatarComment image={END_POINT_MINIO + suggestion.avatarUrl} />
          <span className='font-medium flex flex-col'>
            {suggestion.fullName}
            <small className='font-normal text-xs'>{suggestion.nickName}</small>
          </span>
      </div>
    )
  }
  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    const nameValues = getNamesFromValue(value)
    const userIds = nameValues?.map((name) => {
      const user = users?.find((u) => '@'+ u.fullName === name);
      return user ? user.id : null;
    });
    setTagIds(userIds)
    setValue(value)
  }
  const getNamesFromValue = (value: string) => {
    let tmp = value.split(" ")
    var names = tmp.filter((str,_) => str.includes('@'))
    names = Array.from(new Set(names))
    return names
  }
  return (
    <>
      <Mention
        className={`w-full ${hidden ? 'hidden' : 'block'}`}
        inputClassName={`w-full text-sm bg-slate-100 border-none focus:border-transparent focus:border-none hover:border-none focus:outline-none`}
        value={value}
        onChange={handleOnChange}
        suggestions={suggestions}
        onSearch={onSearch}
        field='fullName'
        placeholder='Write a comment...'
        rows={2}
        cols={40}
        itemTemplate={itemTemplate}
      />
    </>
  )
}

export default MentionUser
