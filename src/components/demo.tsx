import { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';

interface TodoItem {
    id: number;
    title: string;
    status: string;
  }
  
  interface TodoProps {
    id: number;
    title: string;
    status: string;
    moveTodo: (id: number, newStatus: string) => void;
  }


const Todo: React.FC<TodoProps> = ({ id, title, status, moveTodo }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { type: 'TODO', id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: 'TODO',
    drop: (item) => moveTodo(item.id, status),
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
      isOver: monitor.isOver(),
    }),
  });

  const isActive = canDrop && isOver;

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        backgroundColor: isActive ? 'lightgreen' : 'white',
        padding: '0.5rem',
        marginBottom: '0.5rem',
      }}
    >
      {title}
    </div>
  );
};

const Column = ({ title, todos, status, moveTodo }) => {
  return (
    <div style={{ width: '200px', padding: '1rem' }}>
      <h2>{title}</h2>
      <div>
        {todos.map((todo) => (
          <Todo key={todo.id} id={todo.id} title={todo.title} status={status} moveTodo={moveTodo} />
        ))}
      </div>
    </div>
  );
};

const App = () => {
  const [todos, setTodos] = useState([
    { id: 1, title: 'Task 1', status: 'planning' },
    { id: 2, title: 'Task 2', status: 'doing' },
    { id: 3, title: 'Task 3', status: 'doing' },
    { id: 4, title: 'Task 4', status: 'done' },
  ]);

  const moveTodo = (id, newStatus) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, status: newStatus } : todo))
    );
  };

  const doneTodos = todos.filter((todo) => todo.status === 'done');
  const doingTodos = todos.filter((todo) => todo.status === 'doing');
  const planningTodos = todos.filter((todo) => todo.status === 'planning');

  return (
    <div style={{ display: 'flex' }}>
      <Column title="Done" todos={doneTodos} status="done" moveTodo={moveTodo} />
      <Column title="Doing" todos={doingTodos} status="doing" moveTodo={moveTodo} />
      <Column title="Planning" todos={planningTodos} status="planning" moveTodo={moveTodo} />
    </div>
  );
};

export default App;
