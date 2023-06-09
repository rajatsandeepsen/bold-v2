/* eslint-disable @typescript-eslint/no-explicit-any */

import Header from "./components/header";
import CardEach from "./components/card";
import Auth from "./components/auth";
import { Separator } from "../components/ui/separator";
import "./App.css";


export type auth = {
  name: string;
  email: string;
  logo: string;
};

export type User = {
  email: string
  id : string
  password : string
}

import { atom, useAtom } from "jotai";
import { TodoElement, AtomCode} from './lib/types'
import { isEmpty, userValid } from "./lib/const";
import { useState } from "react";



const planning = atom<TodoElement[] | null>(null)
const doing = atom<TodoElement[] | null>(null)
const done = atom<TodoElement[] | null>(null)


let i =0
function App() {
  
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const [currentUserIO , setUserIO] = useState(!isEmpty(user))

  const [ , setPlanningData] = useAtom(planning);
  const [ , setDoingData] = useAtom(doing);
  const [ , setDoneData] = useAtom(done);

  
  const planningBundle : AtomCode = {atomCode: planning, status:'Planning'}
  const doingBundle    : AtomCode = {atomCode: doing,    status:'Doing'}
  const doneBundle     : AtomCode = {atomCode: done,     status:'Done'}
  const nothing        : AtomCode = {atomCode: done,     status:'none'}


  if (i === 0){
    const x:TodoElement[] = JSON.parse(localStorage.getItem('Planning') || '[]')
    setPlanningData(x)
    const y:TodoElement[] = JSON.parse(localStorage.getItem('Doing') || '[]')
        setDoingData(y)
    const z:TodoElement[] = JSON.parse(localStorage.getItem('Done') || '[]')
        setDoneData(z)

    console.log(x,y,z)
    i++
  }

    

    

    


  return (
    <>
      <Header user={user} />
      <Separator className="mb-10" />

      {!isEmpty(user) && userValid(user) && currentUserIO  ? (
        <article className="flex flex-col lg:flex-row gap-10 w-full justify-center lg:min-h-96 px-5 lg:px-10">

          <CardEach current={planningBundle} prev={nothing}        next={doingBundle}/>
          <CardEach current={doingBundle}    prev={planningBundle} next={doneBundle}/>
          <CardEach current={doneBundle}     prev={doingBundle}    next={nothing}/>
          
        </article>
      ) : (
        <Auth setUserIO={setUserIO}  />
      )}
    </>
  );
}

export default App;
