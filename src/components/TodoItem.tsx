import { Dispatch, FormEvent} from 'react';

type RemoveTodoAction = { type: "REMOVE_TODO"; id: number };
interface TodoItemProps {
    id: number;
    text: string;
    done: boolean;
    toggleDone: (id: number) => void;
    dispatch: Dispatch<RemoveTodoAction>;
}

const TodoItem = (props: TodoItemProps) => {
    const { id, text, done, toggleDone } = props;

    const handleRemove = (event: FormEvent) => {
        event.preventDefault();
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