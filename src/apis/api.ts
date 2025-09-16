import axios from "axios";

// const url = "https://68c78c8c5d8d9f514732226c.mockapi.io/api/";
const url = "http://localhost:8080"

const instance  = axios.create({
    baseURL: url
});

instance.interceptors.response.use(
    (response) => {
        console.log('Response success:', response);
        console.log('API duration: ', (response.config as any).metadata ? Date.now() - (response.config as any).metadata.startTime : 'N/A', 'ms');
        return response;
    },
    (error) => {
        const { status, data } = error.response;
        if (status === 401) {
            alert(`Response Error ${status} ${data}`);
            window.location.href = "/";
        }
        console.log(error.response);
        return Promise.reject(error);
    }
);

instance.interceptors.request.use(
    (config ) => {
        console.log("Request success:", config);
        (config as any).metadata = {
            startTime: Date.now()
        };
    return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const getTodos = async () => {
    const response = await instance.get("/todos");
    return response;
}

export const addTodo = async (todo: {text: string, done: boolean}) => {
    const response = await instance.post("/todos", todo);
    return response;
}

export const removeTodo = async (id: number) => {
    const response = await instance.delete(`/todos/${id}`);
    return response;
}

export const fetchTodoDetail = async (id: string) => {
    const response = await instance.get(`/todos/search/${id}`);
    return response;
}

export const updateTodoStatus = async (id: number, done: boolean) => {
    const response = await instance.put(`/todos/${id}`, {done: done});
    return response;
}

export const updateTodoText = async (id: number, text: string) => {
    const response = await instance.put(`/todos/${id}`, {text: text});
    return response;
}

export const updateTodo = async (id: number, text: string, done: boolean) => {
    const response = await instance.put(`/todos/${id}`, {text: text, done: done});
    return response;
}