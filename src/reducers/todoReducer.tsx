export const initialState = [
    { id: 1, text: "the first todo", done: false },
    { id: 2, text: "the second todo", done: false },
];

// reducer is a pure function that define and gather all state update logic
export interface Todo {
    id: number;
    text: string;
    done: boolean;
}

export interface DoneAction {
    type: 'DONE';
    id: number;
}

export interface RemoveAction {
    type: "REMOVE_TODO";
    id: number;
}

export type TodoAction = DoneAction | RemoveAction | { type: string };

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
        case 'ADD_TODO':
            return [
                ...state,
                { id: state.length + 1, text: (action as any).text, done: false }
            ]
        case 'REMOVE_TODO':
            return state.filter(todo => todo.id !== (action as RemoveAction).id);
        default:
            return state;
    }
};
