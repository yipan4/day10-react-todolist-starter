import { Todo } from "../contexts/TodoContext";

export interface DoneAction {
    type: 'DONE';
    id: number;
}

export interface RemoveAction {
    type: "REMOVE_TODO";
    id: number;
}

export interface AddAction { 
    type: "ADD_TODO"; 
    text: string;
    id: number;
}

export interface LoadAction {
    type: "LOAD_TODO";
    todos: Todo[];
}

export interface UpdateAction {
    type: "UPDATE_TODO";
    id: number;
    done: boolean;
}