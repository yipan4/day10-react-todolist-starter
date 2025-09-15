import TodoGenerator from "./TodoGenerator";
import TodoContext from "../contexts/TodoContext";
import { useContext, useEffect, useState } from "react";
import { getTodos, updateTodoStatus, updateTodoText } from "../apis/api";
import { removeTodo } from "../apis/api";

import { Table, Tag, Button, Modal, Input } from 'antd';
import type { TableProps } from "antd";
import { EditAction, RemoveAction, UpdateAction } from "../interfaces/todoActionsInterface";

import { CheckOutlined, UndoOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { text } from "stream/consumers";

interface DataType {
    key: number;
    text: string;
    done: boolean;
}


const TodoGroup = () => {
    const { state, dispatch } = useContext(TodoContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [idCache, setIdCache] = useState(0);
    const [textCache, setTextCache] = useState("");
    const [isUpdated, setIsUpdated] = useState(false);

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
                        <Button onClick={() => toggleDone(record.key)}>
                            {record.done ? <UndoOutlined /> : <CheckOutlined />}
                        </Button>
                        <Button onClick={() => {
                            setIsModalOpen(true);
                            setIdCache(record.key);
                            setTextCache(record.text);
                        }}>
                            <EditOutlined />
                        </Button>
                        <Button onClick={() => handleRemove(record.key)}>
                            <DeleteOutlined />
                        </Button>
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

    // useEffect(() => {
    //     const handleEdit = async (id: number, newText: string) => {
    //         try {
    //             await updateTodoText(id, newText);
    //             const action: EditAction = { type: "EDIT_TODO", id, text: newText };
    //             dispatch(action);
    //         } catch (error) {
    //             console.error("Failed to edit todo:", error);
    //             return;
    //         } finally {
    //             setIdCache(0);
    //             setTextCache("");
    //         }
    //     };
    //     if (!isUpdated) {
    //         handleEdit(idCache, textCache);
    //     }
    //     setIsUpdated(false);
    // }, [idCache, textCache, dispatch, isUpdated]);

    useEffect(() => {
        getTodos().then((todos) => {
            dispatch({ type: "LOAD_TODO", todos: todos.data });
        });
    }, [dispatch]);

    return (
        <div className={"todo-group"}>
            <h1>Todo List</h1>
            <TodoGenerator dispatch={dispatch} />
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

export default TodoGroup;
