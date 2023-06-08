import Header from './components/header'
import CardEach from './components/card'
import Auth from './components/auth'
import {Separator} from '../components/ui/separator'
import { atom, useAtom  } from 'jotai'

import './App.css'

// const array  = [1,2,3,4,5,6] 

export type auth = {
  name: string ,
  email : string ,
  logo : string ,
}

const user1:auth = {
  name : 'Rajat Sandeep',
  email : 'rajatsandeepsen1839@gmail.com',
  logo : 'plus'
}

function App() {
  const user = atom({...user1})
  console.log(user.init)

  
  
  return (
    <>
      <Header currentUser={user1} />
      <Separator className='mb-10' />
      {/* <article className='flex gap-10 w-full min-h-96 px-10'>
        <CardEach status='Planning' prev={'Done'} next={'Doing'} array={[...array,2,3,4,6]} />
        <CardEach status='Doing' prev={'Planning'} next={'Done'} array={array} />
        <CardEach status='Done' prev={'Doing'} next={'Planning'} array={array} />
      </article> */}

      <Auth />
      
    </>
  )
}

export default App
