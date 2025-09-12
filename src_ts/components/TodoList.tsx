import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";

const TodoList = () => {
    const {state, dispatch} = useContext(TodoContext);
    return (
        <div>
        <div>This is the TodoList Component.</div>
        {
            state.map(todo => {
                return <div>{todo.text}</div>
            })
        }
        </div>
    );
};

export default TodoList;