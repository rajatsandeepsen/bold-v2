import * as React from 'react';
import { Reorder, useDragControls } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { ChevronLeft, ChevronRight, Grip, Plus, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "../../components/ui/dialog"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Textarea } from "../../components/ui/textarea"
import { Badge } from "../../components/ui/badge"
import { useToast } from "../../components/ui/use-toast"

import { TodoElement } from '../App';
import { nanoid } from 'nanoid';
import { Atom, PrimitiveAtom, atom, useAtom } from 'jotai';

type status = 'Planning' | 'Doing' | 'Done' | 'none'

interface CardEachProps {
    eachData: TodoElement[]
    status: status
    // moveTodo: (id: number, newStatus: string) => void;
    next : status
    prev : status
}
 
const CardEach: React.FunctionComponent<CardEachProps> = ({eachData, status, next, prev}) => {
    const [items, setItems] = React.useState(eachData)
    const controls = useDragControls()
    return ( 
        <Card className='w-full md:w-1/3 h-min'>
        <CardHeader className='flex flex-row p-4  items-center justify-between'>
          <CardTitle><Badge>{status}</Badge></CardTitle>
        </CardHeader>

        <Reorder.Group values={items} onReorder={setItems}>
            {items.map((item)=>(  
                <Reorder.Item key={item.id} value={item} dragListener={false} dragControls={controls}>
                    <CardContent className=' border p-4 flex justify-between items-center m-2 rounded-md bg-white hover:bg-slate-50'>
                        <div className="flex flex-col">
                          <h6>{item.title}</h6>
                          <p>{item.description}</p>
                        </div>
                        <Grip className='text-slate-300' onPointerDown={(e) => controls.start(e)} />
                    </CardContent>
              </Reorder.Item>
            ))}
        </Reorder.Group>

        <CardFooter className='flex justify-between gap-2 m-2 p-0'>
            <DialogDemo setItems={setItems} />

          <div className='flex gap-2 flex-wrap justify-end'>
            <Button variant={'destructive'}><Trash2 /></Button>
            {prev !== 'none' && <Button variant={'outline'}><ChevronLeft /> {prev}</Button>}
            {next !== 'none' && <Button variant={'outline'}>{next} <ChevronRight /></Button>}
          </div>
        </CardFooter>
      </Card>
     );
    }
    
    export default CardEach;
    
    
    function DialogDemo({setItems}:{setItems:React.Dispatch<React.SetStateAction<TodoElement[]>> }) {
      const { toast } = useToast()

      function addTodo(e:any){
        e.preventDefault()

        const form = e.target
        const element:TodoElement = {title: form.title.value, description:form.description.value, id: nanoid() }
        console.log(element)
        setItems((items) => [element, ...items])
      }
      
      return (
        <Dialog>
      <DialogTrigger asChild>
        <Button><span className='hidden md:block'>New </span><Plus /></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={addTodo}>
        <DialogHeader>
          <DialogTitle>Create New To-Do</DialogTitle>
          <DialogDescription>
            Create new To-Do element here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-start gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input name="title" type='string' placeholder="eg: touch some grass" className="col-span-3" />
          </div>
          <div className="flex flex-col items-start gap-4">
            <Label htmlFor="username" className="text-right">
              Description
            </Label>
            <Textarea name="description" placeholder="eg: leave home and talk to people" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type='submit' onClick={() => { toast({ description: "Successfully added new todo element", }) }}>Save changes</Button>
        </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}