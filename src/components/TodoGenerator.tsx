import { Dispatch, useState, FormEvent } from "react";
import { AddAction } from "../interfaces/todoActionsInterface";

interface TodoGeneratorProps {
    dispatch: Dispatch<AddAction>;
}

const TodoGenerator = (props: TodoGeneratorProps) => {
    const { dispatch } = props; 
    const [text, setText] = useState("");

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (text.trim() === "") {
            return;
        }
        dispatch({ type: "ADD_TODO", text });
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