import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { getFallBack } from '../lib/const'

import { User } from "firebase/auth"
import type { auth } from '../App'
import { Atom } from "jotai"

 
const Header = ({user}:{user:User | null}) => {
    // const {name, email} = {name:"hi", email:"hi"}
    // console.log(user)
    return ( 
        <div className='p-5 font-sans md:container md:mx-auto flex flex-col gap-1'>
            <Avatar className='w-20 h-20 '>
                <AvatarImage src={'/hexagon-half.svg'} />
                <AvatarFallback>{getFallBack(user?.displayName || 'B D')}</AvatarFallback>
            </Avatar>
            <h2>{user?.displayName || 'BOLD MOVE'}</h2>
            <p>{user?.email || 'It just a Notion Inspired To-Do list & clipboard tool.'}</p>
        </div>
     );
}
 
export default Header ;