import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { getFallBack } from '../lib/const'

import type { auth } from '../App'

 
const Header = ({currentUser}:{currentUser:auth}) => {
    const {name, email, logo} = currentUser
    return ( 
        <div className='p-5 font-sans md:container md:mx-auto flex flex-col gap-1'>
            <Avatar className='w-20 h-20 '>
                <AvatarImage src={logo || '/hexagon-half.svg'} />
                <AvatarFallback>{getFallBack(name || 'B D')}</AvatarFallback>
            </Avatar>
            <h2>{name || 'BOLD MOVE'}</h2>
            <p>{email || 'It just a Notion Inspired To-Do list & clipboard tool.'}</p>
        </div>
     );
}
 
export default Header ;