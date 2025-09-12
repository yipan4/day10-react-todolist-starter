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
    text: string 
}