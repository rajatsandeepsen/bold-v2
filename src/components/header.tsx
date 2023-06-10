import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { getFallBack, getUserName } from '../lib/const'
import type { User } from '../App'

 
const Header = ({user}:{user:User | null}) => {

    const name = getUserName(user?.email || 'BOLD MOVE')
    return ( 
        <div className='p-5 font-sans md:container md:mx-auto flex flex-col gap-1'>
            <Avatar className='w-20 h-20 '>
                <AvatarImage src={'/hexagon-half.svg'} />
                <AvatarFallback>{getFallBack(name || 'B D')}</AvatarFallback>
            </Avatar>
            <h2>{getUserName(user?.email || 'BOLD MOVE')}</h2>
            <p>{user?.email || 'It just a Notion Inspired To-Do list & clipboard tool.'}</p>
            <p>{user?.id}</p>
        </div>
     );
}
 
export default Header ;