// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import Header from './components/header'
import CardEach from './components/card'
import Auth from './components/auth'
import {Separator} from '../components/ui/separator'



import './App.css'

// const array  = [1,2,3,4,5,6]

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Header name={null} email={null} logo={null} />
      <Separator className='mb-10' />
      {/* <article className='flex gap-10 w-full min-h-96 px-10'>
        <CardEach status='Planning' prev={'Done'} next={'Doing'} array={array} />
        <CardEach status='Doing' prev={'Planning'} next={'Done'} array={array} />
        <CardEach status='Done' prev={'Doing'} next={'Planning'} array={array} />
      </article> */}

      <Auth />
      
    </>
  )
}

export default App
