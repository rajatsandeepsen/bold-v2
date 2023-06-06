import * as r from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { getFallBack } from '../lib/const'

interface Props {
    name: string | null ,
    email: string | null ,
    logo: string | null ,
}
 
const Header: r.FunctionComponent<Props> = ({name, email, logo}) => {
    return ( 
        <div className='p-5 font-sans'>
            <Avatar className='w-20 h-20 '>
                <AvatarImage src={logo || '/hexagon-half.svg'} />
                <AvatarFallback>{getFallBack(name || 'B D')}</AvatarFallback>
            </Avatar>
            <h1 className='font-semibold text-3xl'>{name || 'BOLD'}</h1>
            <p className='font-light text-md'>{email || 'It just a Notion Inspired To-Do list & clipboard tool.'}</p>
        </div>
     );
}
 
export default Header ;