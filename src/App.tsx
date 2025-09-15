import { useReducer } from "react";
import "./App.css";
import { todoReducer } from "./reducers/todoReducer";
import TodoContext from "./contexts/TodoContext";
import { createBrowserRouter, Outlet, RouterProvider, useNavigate, useLocation } from "react-router";
import TodoGroup from "./components/TodoGroup";
import ErrorPage from "./pages/ErrorPage";
import TodoDetail from "./components/TodoDetail";

import { Menu, Layout } from 'antd';
import { HomeOutlined, TeamOutlined, QuestionCircleOutlined } from "@ant-design/icons";

const { Header, Footer, Content } = Layout;

const headerItems = [
    { key: '/', label: "Home", icon: <HomeOutlined /> },
    { key: '/todos', label: "Todos", icon: <TeamOutlined /> },
    { key: '/about', label: "About", icon: <QuestionCircleOutlined /> },
]

const DefaultLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Layout style={{ minHeight: '100vh' }}>
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
                            style={{ color: 'white', backgroundColor: '#001529' }}
                        >{item.icon} {item.label}</Menu.Item>
                    ))}
                </Menu>
            </Header>
            <Content style={{ minHeight: '80vh', paddingTop: 20, paddingBottom: 20 }}>
                <Outlet />
            </Content>
            <Footer style={{paddingTop: 0}}>
                footer copyright
            </Footer>
        </Layout>
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
