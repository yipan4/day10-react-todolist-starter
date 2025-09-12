import { useReducer } from "react";
import './App.css';
import TodoList from "./components/TodoList";
import { initialState, todoReducer } from "./reducers/todoReducer";
import { TodoContext } from "./contexts/TodoContext";

function App() {
    // the Hooks API manage component data state
    const [state, dispatch] = useReducer(todoReducer, initialState);
        
    return (
        <div className="App">
        <TodoContext.Provider value={{state, dispatch}}>
            <TodoList/>
        </TodoContext.Provider>
        </div>
    );
}

export default App;
