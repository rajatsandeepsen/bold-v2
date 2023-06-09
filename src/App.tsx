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

type TodoElement = {title: string, description: string}

type TodoData = {
  done: TodoElement[]
  doning: TodoElement[]
  planning: TodoElement[]
}

import { atom, useAtom } from "jotai";
const currentUser = atom<User | null>(null);
const todoData  = atom<TodoData | null>(null)

function App() {
  const [user, setUser] = useAtom(currentUser);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
    }
  });

  return (
    <>
      <Header user={user} />
      <Separator className="mb-10" />

      {user ? (
        <article className="flex gap-10 w-full min-h-96 px-10">
          <CardEach status="Planning" prev={"Done"} next={"Doing"} array={array} />
          <CardEach status="Doing" prev={"Planning"} next={"Done"} array={array} />
          <CardEach status="Done" prev={"Doing"} next={"Planning"} array={array} />
        </article>
      ) : (
        <Auth currentUser={currentUser} auth={auth} />
      )}
    </>
  );
}

export default App;
