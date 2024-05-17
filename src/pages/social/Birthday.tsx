import { getUsersBirthdayByCurrentMonth } from "@/apis/auth.api"
import AvatarUser from "@/components/social/avatar/AvatarUser"
import { useQuery } from "@tanstack/react-query"
import moment from "moment"
import { Card } from "primereact/card"

interface BirthdayProps {

}
const Birthday : React.FC<BirthdayProps> = ({}) => {
    const userRes = useQuery({
        queryKey: ['birthday_current_month'],
        queryFn: () => {return getUsersBirthdayByCurrentMonth()}
    })
    const users = userRes?.data?.data?.users
    return (
        <section className="flex justify-center items-center mt-16">
            <Card className="w-full" title="Birthdays in month">
                <div className="text-center">
                    {users && users.map(user => {
                        const dateString = moment(user?.dateOfBirth).format('MM-DD')
                        const yearString = moment().year()
                        const dateFromNow = moment(new Date(yearString+ '-'+dateString)).fromNow()
                        return (
                            <div key={user?.id} className="text-center border rounded-lg p-2 m-2">
                                <div className="flex justify-center">
                                    <AvatarUser owner={user} type="normal"></AvatarUser>
                                </div>
                                <p className="text-sm italic text-blue-500">{dateFromNow}</p>
                            </div>
                        )
                    })}
                </div>
            
            </Card>
        </section>
    )
}
export default Birthday