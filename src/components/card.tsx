import React, {useState, useRef, useEffect} from 'react';
import { Reorder,AnimatePresence } from "framer-motion"
import { CheckSquareIcon, PenTool, Plus, Trash2, XSquareIcon } from 'lucide-react';

import { Card, CardContent, CardFooter, CardHeader, CardTitle, } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "../../components/ui/dialog"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Textarea } from "../../components/ui/textarea"
import { Badge } from "../../components/ui/badge"
import { useToast } from "../../components/ui/use-toast"
import { Checkbox } from "../../components/ui/checkbox"
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert"

import { TodoElement, AtomCode, status,} from '../lib/types'
import { nanoid } from 'nanoid';
import { useAtom } from 'jotai';
import { TodoElementZod } from '../lib/const';

import useOnKey from '../lib/useOnKey'; // my own React Hook


type formElements = {
  title : HTMLInputElement
  description : HTMLInputElement
}

interface CardEachType {
  current : AtomCode
  prev    : AtomCode
  next    : AtomCode
}
 
const CardEach: React.FunctionComponent<CardEachType> = ({current, prev, next}) => {
    const { toast } = useToast()
    const [currentData, setCurrentData ] = useAtom(current.atomCode)
    const [checkAll, setCheckAll] = useState(false)
    

    const [ , setNextData] = useAtom(next.atomCode)
    const [ , setPrevData] = useAtom(prev.atomCode)

    
    const [items, setItems] = useState<TodoElement[] | []>(currentData || [])
    const form = useRef<HTMLFormElement>(null)

    useEffect(() => {
      setItems(currentData || [])
      localStorage.setItem( current.status ,JSON.stringify(currentData || []))
      setCheckAll(false)

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
        if (futureType !== 'none') adder(futureType, newArray)
        setCurrentData(oldArray)
        toast({ description: "Successfully Updated", })
      }
      
    }
    
    return ( 
        <Card className='w-full lg:w-1/3 h-min transition-height duration-500 ease-in-out'>
        <CardHeader className='flex flex-row p-4 pe-6  items-center justify-between'>
          <CardTitle><Badge>{current.status}</Badge></CardTitle>

          <Button variant={'ghost'} className='group p-2'>
            <span className='w-0 opacity-0 transition-all delay-200 group-hover:w-20 group-hover:opacity-100'>Select-All</span>
            <Checkbox className='w-6 h-6 border-slate-300' checked={checkAll} onClick={()=> setCheckAll((checkAll)=>!checkAll)} />
          </Button>

        </CardHeader>
        <form ref={form}>
        <Reorder.Group values={items} onReorder={setItems}>
          <AnimatePresence mode='sync'>

            {items.length === 0 &&
              <CardContent className='p-2'>
                <Alert className='hover:bg-slate-50'>
                  <AlertTitle></AlertTitle>
                  <AlertDescription>
                  </AlertDescription>
                </Alert>
              </CardContent>
            }

            {items.map((item, intex)=>(  
                <Reorder.Item initial={{ height:'-100%' }} animate={{ height:0 }} exit={{opacity:0}} transition={{duration: .5}} key={item.id} value={item} >
                    <ReorderItem item={item} status={current.status} checkAll={checkAll} index={intex} atom={current.atomCode} />
              </Reorder.Item>
            ))}

          </AnimatePresence>
        </Reorder.Group>
        </form>

        <CardFooter className='flex justify-between items-start gap-2 m-2 p-0'>
            <DialogDemo setItems={setCurrentData} />

            <div className='flex gap-2 flex-wrap justify-end'>
                <Button onClick={()=> handleSumbit('none') } variant={'destructive'} className='p-2 group'>
                    <span className='w-0 opacity-0 transition-all delay-200 group-hover:w-14 group-hover:opacity-100'>Delete</span>
                  <Trash2 />
                </Button>

              {prev.status !== 'none' && 
                <Button onClick={()=> handleSumbit(prev.status) }
                 variant={'outline'} 
                 className='p-2 group'>
                    <span className='w-0 opacity-0 transition-all delay-200 group-hover:w-14 group-hover:opacity-100'>{prev.status}</span>
                    <XSquareIcon />
                </Button>}

              {next.status !== 'none' && 
                <Button onClick={()=> handleSumbit(next.status) }
                    variant={'outline'} className='p-2 group'>
                    <span className='w-0 opacity-0 transition-all delay-200 group-hover:w-14 group-hover:opacity-100'>{next.status}</span>
                    <CheckSquareIcon />
                </Button>}
                
            </div>
        </CardFooter>
      </Card>
     );
    }
    
    export default CardEach;
    
const ReorderItem = ({item, checkAll, status, index, atom}:{item:TodoElement, checkAll:boolean, status:string, index:number, atom:any}) => {
  
  const [, setCurrentData ] = useAtom(atom)
  const [check, setCheck] = useState(checkAll)
  const { toast } = useToast()

  function update(event:React.SyntheticEvent<HTMLFormElement>){
    event.preventDefault()

    
    const form = event.target as HTMLFormElement & formElements 
    const after = TodoElementZod.safeParse({title: form.title.value, description: form.description.value, id: nanoid() })

    if (after.success) {
      setCurrentData((items:TodoElement[])=> items.map((item, iterator) => iterator !== index ? item : {...after.data, id:item.id} ))

      toast({ description: "Successfully added new todo element", })
    }
    else {
      toast({ description: after.error.errors[0].message, variant:'destructive' })
    }
    

  }
  return ( 
    <CardContent className='select-none p-2'>
        <Alert className='hover:bg-slate-50 flex justify-between cursor-grab gap-2 !ps-4 relative'>
          <div className='text-start break-normal'>
            <AlertTitle>{item.title}</AlertTitle>
            <AlertDescription>{item.description}</AlertDescription>
          </div>

          <div className='absolute right-4 flex items-center'>
            <EditableText item={item} update={update}/>
            <Button type='button' variant={'ghost'} className='p-2'>
              <Checkbox className='w-6 h-6 border-slate-300' checked={check || checkAll} onClick={()=>setCheck((check)=> !check)} name={status} value={item.id} />
            </Button>
          </div>

        </Alert>
    </CardContent>
   );
}


const EditableText = ({item, update}:{item:TodoElement, update:any}) => {

  const form = useRef<HTMLFormElement>(null)

  const [enter,] = useOnKey(() => {
    form.current?.requestSubmit();
  }, 'Enter')

  return ( 
    <Dialog>
      <DialogTrigger className='text-start'>
        <Button type='button' variant={'ghost'} className='p-2 text-slate-300 bg-white group'>
              <span className='w-0 opacity-0 transition-all delay-200 group-hover:w-14 group-hover:opacity-100'>Edit</span>
              <PenTool />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]" onKeyDown={enter}> 
        <form ref={form} onSubmit={update}>
        <DialogHeader>
          <DialogTitle>Edit To-Do</DialogTitle>
          <DialogDescription>
            Edit To-Do element here. Click save when you're done.
          </DialogDescription>

        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-start gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input name="title" type='string' required placeholder="edit" defaultValue={item.title} className="col-span-3 valid:bg-slate-100" />
          </div>
          <div className="flex flex-col items-start gap-4">
            <Label htmlFor="username" className="text-right">
              Description
            </Label>
            <Textarea name="description" required placeholder="edit" defaultValue={item.description} className="col-span-3 valid:bg-slate-100" />
          </div>
        </div>
        <DialogFooter>
          <Button type='submit'>Save changes</Button>
        </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
   );
}
 

    
    
    function DialogDemo({setItems}:{ setItems: any }) {
      const { toast } = useToast()
      const form = useRef<HTMLFormElement>(null)

      const [enter,] = useOnKey(() => form.current?.requestSubmit(), 'Enter')

      function addTodo(e: React.SyntheticEvent<HTMLFormElement>){
        e.preventDefault()

        const form = e.target as HTMLFormElement & formElements 
        const after = TodoElementZod.safeParse({title: form.title.value, description: form.description.value, id: nanoid() })
        if (after.success) {
          setItems((items:TodoElement[]) => [after.data, ...(items || [])])
          form.reset()
          toast({ description: "Successfully added new todo element", })
        }
        else {
          toast({ description: after.error.errors[0].message, variant:'destructive' })
        }
      }
      
      return (
        <Dialog>
      <DialogTrigger asChild>
        <Button className='p-2 group transition-all'>
          <span className='w-0 opacity-0 transition-all delay-200 group-hover:w-14 group-hover:opacity-100'>New</span>
          <Plus/>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]" onKeyDown={enter}> 
        <form ref={form} onSubmit={addTodo}>
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
            <Input name="title" type='string' required placeholder="eg: touch some grass" className="col-span-3 valid:bg-slate-100" />
          </div>
          <div className="flex flex-col items-start gap-4">
            <Label htmlFor="username" className="text-right">
              Description
            </Label>
            <Textarea name="description" required placeholder="eg: leave home and talk to people" className="col-span-3 valid:bg-slate-100" />
          </div>
        </div>
        <DialogFooter>
          <Button type='submit'>Save</Button>
        </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}