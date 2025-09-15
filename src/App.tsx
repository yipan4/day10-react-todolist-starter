import { useReducer } from "react";
import "./App.css";
import { initialState, todoReducer } from "./reducers/todoReducer";
import TodoContext from "./contexts/TodoContext";
import { createBrowserRouter, NavLink, Outlet, RouterProvider, useParams } from "react-router";
import TodoGroup from "./components/TodoGroup";
import ErrorPage from "./pages/ErrorPage";

const DefaultLayout = () => {
    return (
    <>
        <header className="navigation">
            <nav>
                <ul>
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/todos">Todos</NavLink></li>
                    <li><NavLink to="/about">About</NavLink></li>
                </ul>
            </nav>
        </header>
        <main>
            <Outlet />
        </main>
        <footer>footer copyright</footer>
    </>
    )
};


const TodoDetail = () => {
    const {id} = useParams();
    console.log(id);
    return (
        <h1>Todo Detail for ID: {id}</h1>
    );
}

const routes = [
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "",
                element: <h1>Home Page</h1>,
                errorElement: <ErrorPage />
            },
            {
                path: "todos",
                element: <TodoGroup />,
            },
            {
                path: "todos/:id",
                element: <TodoDetail />,
            },
            {
                path: "about",
                element: <h1>About Us</h1>,
            },
        ],
    },
];

function App() {
    const [state, dispatch] = useReducer(todoReducer, []);

    const router = createBrowserRouter(routes);

    return (
        <div className="App">
            <TodoContext.Provider value={{ state, dispatch }}>
                <RouterProvider router={router} />
            </TodoContext.Provider>
        </div>
    );
}

export default App;
