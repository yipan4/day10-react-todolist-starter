import TodoGenerator from "./TodoGenerator"
import TodoContext from "../contexts/TodoContext"
import { useContext } from "react"
import TodoItem from "./TodoItem";

    
const TodoGroup = () => {
    const { state, dispatch } = useContext(TodoContext);

    const toggleDone = (id: number) => {
        const action  = {type: 'DONE', id: id};
        dispatch(action);
    }
    return (
        <div className={'todo-group'}>
        <h1>Todo List</h1>
        <div className={'todo-list'}>
            {   
                state.map(({id, text, done}: any) => {
                    return (
                        <TodoItem 
                            id={id}
                            text={text}
                            done={done}
                            toggleDone={toggleDone}
                            dispatch={dispatch}
                        />
                    )
                })  
            }
        </div>
            <TodoGenerator dispatch={dispatch}/>
        </div>
    )
}

export default TodoGroup;