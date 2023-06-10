import { PrimitiveAtom,  } from "jotai"

export type TodoElement = {title: string, description: string, id:string}

export type status = 'Planning' | 'Doing' | 'Done' | 'none'

export type AtomCode = {
  atomCode: PrimitiveAtom<TodoElement[] | null >
  status: status
}

export type TodoData = {
  done: TodoElement[]
  doing: TodoElement[]
  planning: TodoElement[]
}