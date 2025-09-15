import { useNavigate, useParams } from 'react-router';
import { getTodos } from '../apis/api';
import { useState, useEffect, useContext, useRef } from 'react';
import { Button, Card, Empty, Tag } from 'antd';
import TodoContext, { Todo } from '../contexts/TodoContext';
import Search from 'antd/es/input/Search';

const TodoDetail = () => {
    const { id } = useParams();
    const { state } = useContext(TodoContext);
    const [todo, setTodo] = useState<Todo | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const detailRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const load = async () => {
            if (!id) {
                setTodo(null);
                return;
            }

            const fromState = state.find(item =>
                item.id === Number(id) || String(item.id) === id
            );

            console.log("Looking for todo with ID:", id);
            console.log("State contains:", state.length, "todos");

            if (fromState) {
                console.log("Found in state:", fromState);
                setTodo(fromState);
                return;
            }

            try {
                setLoading(true);
                const response = await getTodos();
                console.log("API returned:", response.data.length, "todos");

                const found = response.data.find((item: Todo) =>
                    item.id === Number(id) || String(item.id) === id
                );

                if (found) {
                    console.log("Found in API:", found);
                    setTodo(found);
                } else {
                    console.log("Todo not found in API either");
                    setTodo(null);
                }
            } catch (error) {
                console.error("Failed to fetch todos:", error);
                setTodo(null);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [id, state]);


    useEffect(() => {
        if (todo && detailRef.current) {
            detailRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [todo]);

    const onSearch = (value: string) => {
        if (!value) {
            return;
        }
        navigate(`/todos/details/${value}`);
    }

    return (
        <div style={{ padding: 20 }}>
            <Search
                placeholder="Enter todo id and press Enter"
                enterButton="Go"
                onSearch={onSearch}
                style={{ maxWidth: 420, marginBottom: 20 }}
            />
            <Button onClick={() => navigate(-1)} style={{ marginBottom: 12 }}>
                Back
            </Button>

            <div ref={detailRef} style={{ marginTop: 24 }}>
                {loading ? (
                    <Card>Loading...</Card>
                ) : todo ? (
                    <Card title={`Todo #${todo.id}`}>
                        <p><strong>Text:</strong> {todo.text}</p>
                        <p>
                            <strong>Status:</strong>{" "}
                            {todo.done ? <Tag color="success">Done</Tag> : <Tag color="error">Pending</Tag>}
                        </p>
                    </Card>
                ) : (
                    <Empty description={id ? `No todo found for id ${id}` : "No todo selected"} />
                )}
            </div>
        </div>
    );
}

export default TodoDetail;