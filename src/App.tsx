/* eslint-disable @typescript-eslint/no-explicit-any */
import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase/config";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getFirestore, query, onSnapshot, orderBy, addDoc, serverTimestamp, limit } from 'firebase/firestore'

initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore()


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

import { nanoid } from 'nanoid'
import { atom, useAtom } from "jotai";
import {TodoData, TodoElement, AtomCode} from './lib/types'


const currentUser = atom<User | null>(null);

const planning = atom<TodoElement[] | null>(null)
const doing = atom<TodoElement[] | null>(null)
const done = atom<TodoElement[] | null>(null)

// temperary data
const demo1:TodoElement = {title: "Start", description: "Networking with others", id:nanoid()}
const demo2:TodoElement = {title: "Build", description: "TODO app and submit before saturday", id:nanoid()}
const demo3:TodoElement = {title: "Apply", description: "for the uLearn frontend intern", id:nanoid()}

const demo:TodoData = {
  done: [demo3],
  doing: [demo2],
  planning: [demo1],
}


let i = 0;
let docID = '';

function App() {
  const [user, setUser] = useAtom(currentUser);

  const [ , setPlanningData] = useAtom(planning);
  const [ , setDoingData] = useAtom(doing);
  const [ , setDoneData] = useAtom(done);

  onAuthStateChanged(auth, (user) => {
    if (user && i === 0) {
      setUser(user);
      console.log(user.uid)
      i++

      const colRef = collection(db, user.uid)
      const q = query(colRef, orderBy('createdAt','desc'), limit(1))

      onSnapshot(q, (snapshot) => {

        const data:any = []
        snapshot.docs.forEach(doc => {
          data.push(doc.data() as any)
          docID = doc.id
        })

        console.log(data, docID)

        if (data.length === 0 && i === 1){
          addDoc(colRef, {
            planning : demo.planning,
            doing    : demo.doing,
            done     : demo.done,
            createdAt: serverTimestamp()
          })
          .then((doc) => {
            console.log(doc.id)
            docID = doc.id

            setPlanningData(demo.planning)
            setDoingData(demo.doing)
            setDoneData(demo.done)
          })
        }
        else {
          setPlanningData(data[0].planning)
          setDoingData(data[0].doing)
          setDoneData(data[0].done)
        }
      })

      // setPlanningData(tempData.planning)
      // setDoingData(tempData.doing)
      // setDoneData(tempData.done)
    }
  });

  
  const planningBundle : AtomCode = {atomCode: planning, status:'Planning'}
  const doingBundle    : AtomCode = {atomCode: doing,    status:'Doing'}
  const doneBundle     : AtomCode = {atomCode: done,     status:'Done'}
  const nothing        : AtomCode = {atomCode: done,     status:'none'}


  return (
    <>
      <Header user={user} />
      <Separator className="mb-10" />

      {user ? (
        <article className="flex flex-col lg:flex-row gap-10 w-full justify-center lg:min-h-96 px-5 lg:px-10">

          <CardEach current={planningBundle} prev={nothing}        next={doingBundle}/>
          <CardEach current={doingBundle}    prev={planningBundle} next={doneBundle}/>
          <CardEach current={doneBundle}     prev={doingBundle}    next={nothing}/>
          
        </article>
      ) : (
        <Auth auth={auth} />
      )}
    </>
  );
}

export default App;
