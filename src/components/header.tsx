import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { getFallBack, getUserName } from '../lib/const'
import type { User } from '../App'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "../../components/ui/alert-dialog"

 
const Header = ({user}:{user:User | null}) => {

    const name = getUserName(user?.email || 'BOLD MOVE')
    return ( 
        <div className='p-5 font-sans md:container md:mx-auto flex flex-col items-start gap-1'>            
            <AlertDialog>
                <AlertDialogTrigger>
                    <Avatar className='w-20 h-20 '>
                        <AvatarImage src={'/hexagon-half.svg'} />
                        <AvatarFallback>{getFallBack(name || 'B D')}</AvatarFallback>
                    </Avatar>
                </AlertDialogTrigger>
                {user && <Model />}
            </AlertDialog>

            <h2>{getUserName(user?.email || 'BOLD MOVE')}</h2>
            <p>{user?.email || 'It just a Notion Inspired To-Do list & clipboard tool.'}</p>
            {user && <p>click on image to logout</p>}
        </div>
     );
}
 
export default Header ;


const Model = () => {
    return ( 
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Are you Loging out?</AlertDialogTitle>
            <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
                onClick={() => localStorage.removeItem('user')}
            >Continue</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
     );
}