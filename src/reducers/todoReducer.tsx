import { AddAction, RemoveAction, DoneAction, LoadAction } from "../interfaces/todoActionsInterface";

export const initialState = [
    { id: 1, text: "the first todo", done: false },
    { id: 2, text: "the second todo", done: false },
];

export interface Todo {
    id: number;
    text: string;
    done: boolean;
}

export type TodoAction = AddAction | DoneAction | RemoveAction | LoadAction;

export const todoReducer = (state: Todo[], action: TodoAction): Todo[] => {
    switch (action.type) {
        case 'DONE':
            return state.map(todo => {
                if (todo.id === (action as DoneAction).id) {
                    return { ...todo, done: !todo.done };
                } else {
                    return todo;
                }
            });
        case 'LOAD_TODO':
            return [...(action as LoadAction).todos];
        case 'ADD_TODO':
            return [
                ...state,
                { id: (action as any).id, text: (action as any).text, done: false }
            ];
        case 'REMOVE_TODO':
            return state.filter(todo => todo.id !== (action as RemoveAction).id);
        default:
            return state;
    }
};
