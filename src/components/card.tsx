import * as React from 'react';
import { Reorder, useDragControls } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { ChevronLeft, ChevronRight, Grip, Trash2 } from 'lucide-react';

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
        <Card className='w-full h-auto'>
        <CardHeader>
          <CardTitle>{status}</CardTitle>
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

        <CardFooter className='flex float-right gap-2 m-2 p-0'>
          <Button variant={'destructive'}><Trash2 /></Button>
          <Button variant={'outline'}><ChevronLeft /> {prev}</Button>
          <Button>{next} <ChevronRight /></Button>
        </CardFooter>
      </Card>
     );
}
 
export default CardEach;