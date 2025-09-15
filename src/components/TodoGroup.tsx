import TodoGenerator from "./TodoGenerator";
import TodoContext from "../contexts/TodoContext";
import { Dispatch, useContext, useEffect } from "react";
import { getTodos, updateTodoStatus } from "../apis/api";
import { removeTodo } from "../apis/api";

import { Table, Tag, Button } from 'antd';
import type { TableProps } from "antd";
import { RemoveAction, UpdateAction } from "../interfaces/todoActionsInterface";

import { CheckOutlined, UndoOutlined, DeleteOutlined } from '@ant-design/icons';

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
            render: (id) => <span>{id}</span>,
        },
        {
            title: 'Todo Content',
            dataIndex: 'text',
            key: 'text',
            render: (text) => <span>{text}</span>,
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
                <div style={{ position: 'relative', width: '100%', minHeight: 40 }}>
                    <div
                        style={{
                            position: 'absolute',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            display: 'flex',
                            gap: '10px',
                            alignContent: 'center',
                        }}
                    >
                        <Button onClick={() => toggleDone(record.key, dispatch)}>
                            {record.done ? <UndoOutlined /> : <CheckOutlined />}
                        </Button>
                        <Button onClick={() => handleRemove(record.key, dispatch)}>
                            <DeleteOutlined />
                        </Button>
                    </div>
                </div>
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
            <Table columns={columns}
                dataSource={state.map((todo) => ({
                    key: todo.id,
                    text: todo.text,
                    done: todo.done,
                }))}
                pagination={{ pageSize: 7 }}
                style={{ paddingLeft: "5%", paddingRight: "5%" }}
            />
            <TodoGenerator dispatch={dispatch} />
        </div>
    );
};

export default TodoGroup;
