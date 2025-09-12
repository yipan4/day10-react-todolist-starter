import { createContext, Dispatch } from "react";

type Todo = {
    id: number;
    text: string;
    done: boolean;
};

type TodoContextType = {
    state: Todo[];
    dispatch: Dispatch<any>;
};

const TodoContext = createContext<TodoContextType>({
    state: [],
    dispatch: () => undefined
});

export default TodoContext;