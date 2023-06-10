import React, {useState, useRef, FormHTMLAttributes} from 'react';
import { Reorder } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { ChevronLeft, ChevronRight, Plus, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "../../components/ui/dialog"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Textarea } from "../../components/ui/textarea"
import { Badge } from "../../components/ui/badge"
import { useToast } from "../../components/ui/use-toast"
import { Checkbox } from "../../components/ui/checkbox"

import { TodoElement, status } from '../App';
import { nanoid } from 'nanoid';
import { PrimitiveAtom, useAtom } from 'jotai';
// import { Atom, PrimitiveAtom, atom, useAtom } from 'jotai';



interface CardEachProps {
    status: {
      prev : status,
      next : status,
      current : status
    }
    // next : status
    // prev : status
    atomCode : PrimitiveAtom<TodoElement[] | null>
}
 
const CardEach: React.FunctionComponent<CardEachProps> = ({status, atomCode}) => {
    const {current, prev, next} = status
    const [data, ] = useAtom(atomCode);
    const [items, setItems] = useState(data || [])
    const form = useRef<HTMLFormElement>(null)



    function handleSumbit(e:React.MouseEvent<HTMLElement>, futureType:status){

      const formData = new FormData(form.current || undefined)
      const newArray = []
      let currentType : status | null = null


      for (const [key, value] of formData) {
        currentType ??= key as status
        newArray.push(data?.find((item)=> item.id === value))
      }

      console.log(currentType,' to ',futureType,newArray)

      // function adder(to:status, element:TodoElement[]){
      //   switch (to){
      //     case 'Doing': setAtomData((get)=> [element,...get(doing)]) ; break ;
      //   }
      // }
    }
    
    return ( 
        <Card className='w-full lg:w-1/3 h-min'>
        <CardHeader className='flex flex-row p-4  items-center justify-between'>
          <CardTitle><Badge>{current}</Badge></CardTitle>
        </CardHeader>
        <form ref={form}>
        <Reorder.Group values={items} onReorder={setItems}>
            {items.map((item)=>(  
                <Reorder.Item key={item.id} value={item} //dragListener={false} dragControls={controls}
                >
                    <CardContent className='h-auto border p-4 flex justify-between select-none items-center gap-4 m-2 rounded-md bg-white hover:bg-slate-50'>
                        <div className="flex flex-col overflow-hidden break-normal">
                          <h6>{item.title}</h6>
                          <p>{item.description}</p>
                        </div>
                        {/* <Grip className='text-slate-300' onPointerDown={(e) => controls.start(e)} /> */}
                        <Checkbox className='w-6 h-6 border-slate-300' name={current} value={item.id} />

                    </CardContent>
              </Reorder.Item>
            ))}
        </Reorder.Group>
        </form>

        <CardFooter className='flex justify-between items-start gap-2 m-2 p-0'>
            <DialogDemo setItems={setItems} />

          <div className='flex gap-2 flex-wrap justify-end'>
            <Button onClick={(e)=> handleSumbit(e, 'none')} variant={'destructive'}>
              <Trash2 />
            </Button>
            {prev !== 'none' && <Button onClick={(e)=> handleSumbit(e, prev)} variant={'outline'}>
              <ChevronLeft />
              <span className='hidden lg:block'>{prev}</span>
            </Button>}
            {next !== 'none' && <Button onClick={(e)=> handleSumbit(e, next)} variant={'outline'}>
            <span className='hidden lg:block'>{next}</span>
              <ChevronRight />
            </Button>}
          </div>
        </CardFooter>
      </Card>
     );
    }
    
    export default CardEach;
    




    
    function DialogDemo({setItems}:{ setItems:React.Dispatch<React.SetStateAction<TodoElement[]>> }) {
      const { toast } = useToast()

      function addTodo(e: React.SyntheticEvent<HTMLFormElement>){
        e.preventDefault()

        type formElements = {
          title : HTMLInputElement
          description : HTMLInputElement
        }
        
        const form = e.target as HTMLFormElement & formElements 
        const element:TodoElement = {title: form.title.value, description: form.description.value, id: nanoid() }
        
        setItems((items) => [element, ...items])
        form.reset()
      }
      
      return (
        <Dialog>
      <DialogTrigger asChild>
        <Button><span className='hidden lg:block'>New </span><Plus /></Button>
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