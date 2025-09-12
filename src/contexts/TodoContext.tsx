import { createContext, Dispatch } from "react";

export type Todo = {
    id: number;
    text: string;
    done: boolean;
};

export type TodoContextType = {
    state: Todo[];
    dispatch: Dispatch<any>;
};

const TodoContext = createContext<TodoContextType>({
    state: [],
    dispatch: () => undefined
});

export default TodoContext;