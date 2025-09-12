import { useContext } from 'react';
import TodoContext from '../contexts/TodoContext';

interface TodoItemProps {
    id: number;
    text: string;
    done: boolean;
    toggleDone: (id: number) => void;
}

const TodoItem = (props: TodoItemProps) => {
    const {id, text, done, toggleDone} = props;

    return (
        <div 
            className={`todo-item ${done ? 'done' : ''}`} 
            key={id}
            onClick={() => toggleDone(id)}
        >
            {text}
        </div>
    )
}

export default TodoItem;