import { useContext } from "react";
import { TodoContext } from "../contexts/TodoContext";
import './ToDoList.css';

const TodoList = () => {
    const { state, dispatch } = useContext(TodoContext);
    return (
        <div className={'todo-group'}>
        <div>This is the TodoList Component.</div>
        {   
            state.map(todo => {
                return <div className={'todo-item'} key={todo.id}>{todo.text}</div>
            })  
        }
        </div>
    );
};

export default TodoList;