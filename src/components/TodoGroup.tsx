import TodoGenerator from "./TodoGenerator";
import TodoContext from "../contexts/TodoContext";
import { useContext, useEffect } from "react";
import TodoItem from "./TodoItem";
import { Todo } from "../contexts/TodoContext";
import { getTodos, updateTodoStatus } from "../apis/api";

const TodoGroup = () => {
    const { state, dispatch } = useContext(TodoContext);

    const toggleDone = (id: number) => {
        const action = { type: "DONE", id: id };
        updateTodoStatus(id, !state.find((todo) => todo.id === id)?.done);
        dispatch(action);
    };

    useEffect(() => {
        getTodos().then((todos) => {
            dispatch({ type: "LOAD_TODO", todos: todos.data });
        });
    }, [dispatch]);

    return (
        <div className={"todo-group"}>
            <h1>Todo List</h1>
            <div className={"todo-list"}>
                {state.map(({ id, text, done }: Todo) => {
                    return (
                        <TodoItem
                            id={id}
                            text={text}
                            done={done}
                            toggleDone={toggleDone}
                            dispatch={dispatch}
                        />
                    );
                })}
            </div>
            <TodoGenerator dispatch={dispatch} />
        </div>
    );
};

export default TodoGroup;
