import { Dispatch, FormEvent } from 'react';
import { RemoveAction } from '../interfaces/todoActionsInterface';

import '../styles/ToDoList.css';
import { removeTodo } from '../apis/api';

interface TodoItemProps {
    id: number;
    text: string;
    done: boolean;
    toggleDone: (id: number) => void;
    dispatch: Dispatch<RemoveAction>;
}

const TodoItem = (props: TodoItemProps) => {
    const { id, text, done, toggleDone } = props;

    const handleRemove = async (event: FormEvent) => {
        event.preventDefault();
        try {
            await removeTodo(id);
        } catch (error) {
            console.error("Failed to remove todo:", error);
            return;
        }
       
        props.dispatch({ type: "REMOVE_TODO", id });
    }

    return (
        <div className={`todo-item-container`}>
            <div
                className={`todo-item ${done ? 'done' : ''}`}
                key={id}
                onClick={() => toggleDone(id)}
            >
                {text}
            </div>
            <button onClick={handleRemove}>
                X
            </button>
        </div>
    )
}

export default TodoItem;