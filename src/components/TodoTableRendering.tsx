import TodoGenerator from "./TodoGenerator";
import TodoContext, { Todo } from "../contexts/TodoContext";
import { useContext, useEffect, useState } from "react";
import { getTodos, updateTodoStatus, updateTodoText } from "../apis/api";
import { removeTodo } from "../apis/api";

import { Table, Tag, Button, Modal, Input, Tooltip } from 'antd';
import type { TableProps } from "antd";
import { EditAction, RemoveAction, UpdateAction } from "../interfaces/todoActionsInterface";

import { CheckOutlined, UndoOutlined, DeleteOutlined, EditOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from "react-router";

interface DataType {
    key: number;
    text: string;
    done: boolean;
}


const TodoTableRendering = (pending: boolean) => {
    const { state, dispatch } = useContext(TodoContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [idCache, setIdCache] = useState(0);
    const [textCache, setTextCache] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const toggleDone = (id: number) => {
        const done = !state.find((todo) => todo.id === id)?.done;
        const action: UpdateAction = { type: "UPDATE_TODO", id: id, done };
        updateTodoStatus(id, done);
        dispatch(action);
    };

    const handleRemove = async (id: number) => {
        try {
            await removeTodo(id);
        } catch (error) {
            console.error("Failed to remove todo:", error);
            return;
        }
        const action: RemoveAction = { type: "REMOVE_TODO", id };
        dispatch(action);
    };

    const viewDetails = (id: number) => {
        navigate(`/todos/details/${id}`, { state: { background: location } });
    };

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
                        <Tooltip title={record.done ? "Mark as Pending" : "Mark as Done"}>
                            <Button onClick={() => toggleDone(record.key)}>
                                {record.done ? <UndoOutlined /> : <CheckOutlined />}
                            </Button>
                        </Tooltip>
                        <Tooltip title="Edit Todo">
                            <Button onClick={() => {
                                setIsModalOpen(true);
                                setIdCache(record.key);
                                setTextCache(record.text);
                            }}>
                                <EditOutlined />
                            </Button>
                        </Tooltip>
                        <Tooltip title="View details">
                            <Button onClick={() => viewDetails(record.key)}>
                                <UnorderedListOutlined />
                            </Button>
                        </Tooltip>
                        <Tooltip title="Delete Todo">
                            <Button onClick={() => handleRemove(record.key)}>
                                <DeleteOutlined />
                            </Button>
                        </Tooltip>
                    </div>
                </div>
            ),
        }
    ]

    const handleEdit = async () => {
        try {
            await updateTodoText(idCache, textCache);
            const action: EditAction = { type: "EDIT_TODO", id: idCache, text: textCache };
            dispatch(action);
        } catch (error) {
            console.error("Failed to edit todo:", error);
            return;
        } finally {
            setIdCache(0);
            setTextCache("");
        }
    };

    useEffect(() => {
        getTodos().then((todos) => {
            const filteredTodos = pending ? todos.data.filter((todo: Todo) => !todo.done) : todos.data.filter((todo: Todo) => todo.done);
            dispatch({ type: "LOAD_TODO", todos: filteredTodos });
        });
    }, [dispatch, pending]);

    return (
        <div className={"todo-group"}>
            {pending ? <h1>Pending Todo List</h1> : <h1>Completed Todo List</h1>}
            {pending ? <TodoGenerator dispatch={dispatch} /> : null}
            <Table columns={columns}
                dataSource={state.map((todo) => ({
                    key: todo.id,
                    text: todo.text,
                    done: todo.done,
                }))}
                pagination={{ pageSize: 7 }}
                style={{ marginTop: 30, paddingLeft: "5%", paddingRight: "5%" }}
            />
            <Modal
                title="Edit Todo Content"
                open={isModalOpen}
                onOk={() => {
                    setIsModalOpen(false);
                    handleEdit();
                }}
                onCancel={() => {
                    setIsModalOpen(false);
                }}
            >
                <Input
                    placeholder="Edit todo content"
                    value={textCache}
                    onChange={(e) => setTextCache(e.target.value)}
                />
            </Modal>
        </div>
    );
};

export default TodoTableRendering;
