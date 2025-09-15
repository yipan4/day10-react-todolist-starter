import { Dispatch, useState, FormEvent } from "react";
import { AddAction } from "../interfaces/todoActionsInterface";
import { addTodo } from "../apis/api";

interface TodoGeneratorProps {
    dispatch: Dispatch<AddAction>;
}

const TodoGenerator = (props: TodoGeneratorProps) => {
    const { dispatch } = props; 
    const [text, setText] = useState("");

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (text.trim() === "") {
            return;
        }
        const newTodo = {
            text: text,
            done: false
        }
        await addTodo(newTodo).then((response) => {
            const action: AddAction = { type: "ADD_TODO", text: response.data.text as string, id: response.data.id as number};
            dispatch(action);
        });
        setText("");
    }

    return (
        <div>
            <form className="todo-generator">
                <input 
                    type="text"
                    value={text}
                    onChange={(event) => setText(event.target.value)} />
                <button 
                    type="submit"
                    onClick={handleSubmit}
                >
                    Add
                </button>
            </form>
        </div>
    )
}

export default TodoGenerator;