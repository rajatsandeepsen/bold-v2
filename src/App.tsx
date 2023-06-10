import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase/config";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";

initializeApp(firebaseConfig);
const auth = getAuth();


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
export type TodoElement = {title: string, description: string, id:string}
export type status = 'Planning' | 'Doing' | 'Done' | 'none'
type TodoData = {
  done: TodoElement[]
  doing: TodoElement[]
  planning: TodoElement[]
}

import { atom, useAtom } from "jotai";
const currentUser = atom<User | null>(null);
// const todoData  = atom<TodoData | null>(null)

const planning = atom<TodoElement[] |null>(null)
const doing = atom<TodoElement[] |null>(null)
const done = atom<TodoElement[] |null>(null)

// temperary data
const tempElement1:TodoElement = {title: "go touch some grass1", description: "and make some money", id:nanoid()}
const tempElement11:TodoElement = {title: "go touch some grass11", description: "and make some money", id:nanoid()}
const tempElement111:TodoElement = {title: "go touch some grass111", description: "and make some money", id:nanoid()}
const tempData:TodoData = {
  done: [tempElement1,tempElement11,tempElement111],
  doing: [tempElement1,tempElement11,tempElement111],
  planning: [tempElement1,tempElement11,tempElement111],
}


let i = 0;

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

      setPlanningData(tempData.planning)
      setDoingData(tempData.doing)
      setDoneData(tempData.done)
    }
  });

  


  return (
    <>
      <Header user={user} />
      <Separator className="mb-10" />

      {user ? (
        <article className="flex flex-col lg:flex-row gap-10 w-full justify-center lg:min-h-96 px-5 lg:px-10">

          <CardEach atomCode={planning}  status={{current:"Planning", prev:"none",     next:"Doing"}} />
          <CardEach atomCode={doing}     status={{current:"Doing",    prev:"Planning", next:"Done"}} />
          <CardEach atomCode={done}      status={{current:"Done",     prev:"Doing",    next:"none"}} />

        </article>
      ) : (
        <Auth currentUser={currentUser} auth={auth} />
      )}
    </>
  );
}

export default App;
