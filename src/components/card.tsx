import React, {useState, useRef, useEffect} from 'react';
import { Reorder,AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Plus, Trash2 } from 'lucide-react';

import { Card, CardContent, CardFooter, CardHeader, CardTitle, } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "../../components/ui/dialog"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Textarea } from "../../components/ui/textarea"
import { Badge } from "../../components/ui/badge"
import { useToast } from "../../components/ui/use-toast"
import { Checkbox } from "../../components/ui/checkbox"

import { TodoElement, AtomCode, status,} from '../lib/types'
import { nanoid } from 'nanoid';
import { useAtom } from 'jotai';




interface CardEachType {
  current : AtomCode
  prev    : AtomCode
  next    : AtomCode
}
 
const CardEach: React.FunctionComponent<CardEachType> = ({current, prev, next}) => {
    const { toast } = useToast()
    const [currentData, setCurrentData ] = useAtom(current.atomCode)
    

    const [ , setNextData] = useAtom(next.atomCode)
    const [ , setPrevData] = useAtom(prev.atomCode)

    
    const [items, setItems] = useState<TodoElement[] | []>(currentData || [])
    const form = useRef<HTMLFormElement>(null)

    useEffect(() => {
      // setTimeout(() => setItems(currentData || []),900)
      setItems(currentData || [])
      localStorage.setItem( current.status ,JSON.stringify(currentData || []))

    }, [currentData, current.status]);

    function adder(to:AtomCode['status'], element:TodoElement[]) {
        switch (to){
          case next.status: { setNextData((nextData) => [...element, ...(nextData || []) ]); break; } // setNextData((get)=> [...get(next.atomCode)])
          case prev.status: { setPrevData((prevData) => [...element, ...(prevData || []) ]); break; }
        }
    }



    function handleSumbit(futureType:status){

      const formData = new FormData(form.current || undefined)
      const newArray:Array<TodoElement> = []
      const oldArray:Array<TodoElement> = []
      const ID:string[] = []

      let currentType : status | null = null


      for (const [key, value] of formData) {
        currentType ??= key as status
        ID.push(value as string)
      }

      currentData?.forEach((element)=>{
        if (ID.includes(element.id || '')) newArray.push(element)
        else oldArray.push(element) 
      })

      if (newArray.length > 0) {
        console.log(currentType,' to ',futureType,newArray)
        adder(futureType, newArray)
        setCurrentData(oldArray)
      }
      
    }
    
    return ( 
        <Card className='w-full lg:w-1/3 h-min transition-height duration-500 ease-in-out'>
        <CardHeader className='flex flex-row p-4  items-center justify-between'>
          <CardTitle><Badge>{current.status}</Badge></CardTitle>
        </CardHeader>
        <form ref={form}>
        <Reorder.Group values={items} onReorder={setItems}>
          <AnimatePresence mode='sync'>
            {items.map((item)=>(  
                <Reorder.Item 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{opacity: 0}}
                  transition={{duration: .5}}
                  key={item.id} value={item} //dragListener={false} dragControls={controls}
                >
                    <CardContent className='h-auto border p-4 flex justify-between select-none items-center gap-4 m-2 rounded-md bg-white hover:bg-slate-50'>
                        <div className="flex flex-col overflow-hidden break-normal">
                          <h6>{item.title}</h6>
                          <p>{item.description}</p>
                        </div>
                        {/* <Grip className='text-slate-300' onPointerDown={(e) => controls.start(e)} /> */}
                        <Checkbox className='w-6 h-6 border-slate-300' name={current.status} value={item.id} />

                    </CardContent>
              </Reorder.Item>
            ))}
          </AnimatePresence>
        </Reorder.Group>
        </form>

        <CardFooter className='flex justify-between items-start gap-2 m-2 p-0'>
            <DialogDemo setItems={setCurrentData} />

            <div className='flex gap-2 flex-wrap justify-end'>
                <Button onClick={()=> {
                  handleSumbit('none')
                  toast({ description: "Successfully Deleted", })
                }
                  } variant={'destructive'}>
                  <Trash2 />
                </Button>
              {prev.status !== 'none' && 
                <Button onClick={()=> {
                  handleSumbit(prev.status)
                  toast({ description: `Successfully moved from "${current.status}" to "${prev.status}"`, })
                }
                  } variant={'outline'}>
                    <ChevronLeft />
                    <span className='hidden lg:block'>{prev.status}</span>
                </Button>}
              {next.status !== 'none' && 
                <Button onClick={()=> {
                  handleSumbit(next.status)
                  toast({ description: `Successfully moved from "${current.status}" to "${next.status}"`, })
                }
                  } variant={'outline'}>
                    <span className='hidden lg:block'>{next.status}</span>
                    <ChevronRight />
                </Button>}
            </div>
        </CardFooter>
      </Card>
     );
    }
    
    export default CardEach;
    



    
    
    function DialogDemo({setItems}:{ setItems: any }) {
      const { toast } = useToast()

      function addTodo(e: React.SyntheticEvent<HTMLFormElement>){
        e.preventDefault()

        type formElements = {
          title : HTMLInputElement
          description : HTMLInputElement
        }
        
        const form = e.target as HTMLFormElement & formElements 
        const element:TodoElement = {title: form.title.value, description: form.description.value, id: nanoid() }
        
        setItems((items:TodoElement[]) => [element, ...(items || [])])
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