import TodoGenerator from "./TodoGenerator";
import TodoContext from "../contexts/TodoContext";
import { Dispatch, useContext, useEffect } from "react";
import { getTodos, updateTodoStatus } from "../apis/api";
import { removeTodo } from "../apis/api";

import { Table, Tag, Button } from 'antd';
import type { TableProps } from "antd";
import { RemoveAction, UpdateAction } from "../interfaces/todoActionsInterface";

interface DataType {
    key: number;
    text: string;
    done: boolean;
}


const TodoGroup = () => {
    const { state, dispatch } = useContext(TodoContext);

    const toggleDone = (id: number, dispatch: Dispatch<UpdateAction>) => {
        const action: UpdateAction = { type: "UPDATE_TODO", id: id, done: !state.find((todo) => todo.id === id)?.done };
        updateTodoStatus(id, !state.find((todo) => todo.id === id)?.done);
        dispatch(action);
    };

    const handleRemove = async (id: number, dispatch: Dispatch<RemoveAction>) => {
        try {
            await removeTodo(id);
        } catch (error) {
            console.error("Failed to remove todo:", error);
            return;
        }
        dispatch({ type: "REMOVE_TODO", id });
    }

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'ID',
            dataIndex: 'key',
            key: 'key',
            render: (id) => <a>{id}</a>,
        },
        {
            title: 'Todo Content',
            dataIndex: 'text',
            key: 'text',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Status',
            dataIndex: 'done',
            key: 'done',
            render: (done) => {
                return done ? <Tag color="success">Done</Tag> : <Tag color="error">Pending</Tag>;
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <>
                    <Button onClick={() => toggleDone(record.key, dispatch)}>
                        {record.done ? "Undo" : "Complete"}
                    </Button>
                    <Button onClick={() => handleRemove(record.key, dispatch)}>
                        X
                    </Button>
                </>
            ),
        }
    ]

    useEffect(() => {
        getTodos().then((todos) => {
            dispatch({ type: "LOAD_TODO", todos: todos.data });
        });
    }, [dispatch]);

    return (
        <div className={"todo-group"}>
            <h1>Todo List</h1>
            {/* <div className={"todo-list"}>
                {state.map(({ id, text, done }: Todo) => {
                    return (
                        <TodoItem
                            id={id}
                            text={text}
                            done={done}
                            toggleDone={toggleDone}
                            dispatch={dispatch}
                        />
                    );
                })}
            </div> */}
            <Table columns={columns} dataSource={state.map((todo) => ({
                key: todo.id,
                text: todo.text,
                done: todo.done,
            }))} />
            <TodoGenerator dispatch={dispatch} />
        </div>
    );
};

export default TodoGroup;
