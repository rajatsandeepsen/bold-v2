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

const array = [1, 2, 3, 4, 5, 6];

export type auth = {
  name: string;
  email: string;
  logo: string;
};

import { nanoid } from 'nanoid'
export type TodoElement = {title: string, description: string, id:string}

type TodoData = {
  done: TodoElement[]
  doing: TodoElement[]
  planning: TodoElement[]
}

import { atom, useAtom } from "jotai";
const currentUser = atom<User | null>(null);
const todoData  = atom<TodoData | null>(null)

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
  const [data, setData] = useAtom(todoData);

  onAuthStateChanged(auth, (user) => {
    if (user && i === 0) {
      setUser(user);
      console.log(user.uid)
      i++

      setData(tempData)
    }
  });


  return (
    <>
      <Header user={user} />
      <Separator className="mb-10" />

      {user ? (
        <article className="flex flex-col md:flex-row gap-10 w-full justify-center md:min-h-96 px-5 md:px-10">
          <CardEach status="Planning" prev={"none"} next={"Doing"} eachData={data?.doing || []} />
          <CardEach status="Doing" prev={"Planning"} next={"Done"} eachData={data?.done || []} />
          <CardEach status="Done" prev={"Doing"} next={"none"} eachData={data?.planning || []} />
        </article>
      ) : (
        <Auth currentUser={currentUser} auth={auth} />
      )}
    </>
  );
}

export default App;
