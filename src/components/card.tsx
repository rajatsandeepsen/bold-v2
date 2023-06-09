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

type status = 'Planning' | 'Doing' | 'Done'

interface CardEachProps {
    array: number[]
    status: status
    // moveTodo: (id: number, newStatus: string) => void;
    next : status
    prev : status
}
 
const CardEach: React.FunctionComponent<CardEachProps> = ({array, status, next, prev}) => {
    const [items, setItems] = React.useState(array);
    const controls = useDragControls()
    return ( 
        <Card className='w-full h-min'>
        <CardHeader className='flex flex-row  items-center justify-between'>
          <CardTitle><Badge>{status}</Badge></CardTitle>
        </CardHeader>

        <Reorder.Group values={items} onReorder={setItems}>
            {items.map((item)=>(  
                <Reorder.Item key={item} value={item} dragListener={false} dragControls={controls}>
                    <CardContent className=' border p-4 flex justify-between m-2 rounded-md bg-white hover:bg-slate-50'>
                        <p>{item}</p>
                        <Grip className='text-slate-300' onPointerDown={(e) => controls.start(e)} />
                    </CardContent>
              </Reorder.Item>
            ))}
        </Reorder.Group>

        <CardFooter className='flex justify-between gap-2 m-2 p-0'>
            <DialogDemo />

          <div className='flex gap-2'>
            <Button variant={'destructive'}><Trash2 /></Button>
            <Button variant={'outline'}><ChevronLeft /> {prev}</Button>
            <Button variant={'outline'}>{next} <ChevronRight /></Button>
          </div>
        </CardFooter>
      </Card>
     );
    }
    
    export default CardEach;
    
    
    function DialogDemo() {
      const { toast } = useToast()
      return (
        <Dialog>
      <DialogTrigger asChild>
        <Button>New <Plus /></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
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
          <Button onClick={() => {
            toast({
              title: "Scheduled: Catch up",
              description: "Friday, February 10, 2023 at 5:57 PM",
            })
      }}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}