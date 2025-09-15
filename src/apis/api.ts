import axios from "axios";

const url = "https://68c78c8c5d8d9f514732226c.mockapi.io/api/";


const instance  = axios.create({
    baseURL: url
});

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
    const response = await instance.get(`/todos/${id}`);
    return response;
}

export const updateTodoStatus = async (id: number, done: boolean) => {
    const response = await instance.put(`/todos/${id}`, {done: done});
    return response;
}