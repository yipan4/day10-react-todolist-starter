import { useContext } from "react";
import { TodoContext } from "../contexts/TodoContext";
import './ToDoList.css';

const TodoList = () => {
    const { state, dispatch } = useContext(TodoContext);

    const toggleDone = (id) => {
        const action  = {type: 'DONE', id: id};
        dispatch(action);
    }

    return (
        <div className={'todo-group'}>
        <div>This is the TodoList Component.</div>
        {   
            state.map(({text, done, id}) => {
                return (
                <div 
                    className={'todo-item'} 
                    key={text.id}
                    onClick={() => toggleDone(id)}
                >
                    {text} {done+''}
                </div>
                )
            })  
        }
        </div>
    );
};

export default TodoList;