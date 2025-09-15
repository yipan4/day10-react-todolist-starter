import { useReducer } from "react";
import "./App.css";
import { todoReducer } from "./reducers/todoReducer";
import TodoContext from "./contexts/TodoContext";
import { createBrowserRouter, Outlet, RouterProvider, useNavigate, useLocation } from "react-router";
import TodoGroup from "./components/TodoGroup";
import ErrorPage from "./pages/ErrorPage";
import TodoDetail from "./components/TodoDetail";

import { Menu, Layout } from 'antd';

const { Header, Footer, Content } = Layout;

const headerItems = [
    { key: '/', label: "Home"},
    { key: '/todos', label: "Todos"},
    { key: '/about', label: "About"},
]

const DefaultLayout = () => {
    const navigate = useNavigate(); 
    const location = useLocation();

    return (
        <>  
            <Header
                className="navigation"
                style={{ display: 'flex', alignItems: 'center' }}
            >
                <Menu
                    theme="dark"
                    mode="horizontal"
                    style={{ flex: 1 }}
                    onClick={(event) => navigate(event.key)}
                    selectedKeys={[location.pathname]}
                >
                    {headerItems.map((item) => (
                        <Menu.Item 
                            key={item.key}
                            style={{ color: 'white', backgroundColor: '#001529'}}
                        >{item.label}</Menu.Item>
                    ))}
                </Menu>
            </Header>
            <Content>
                <Outlet />
            </Content>
            <Footer>footer copyright</Footer>
        </>
    )
};




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
