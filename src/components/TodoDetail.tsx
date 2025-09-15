import { useParams } from 'react-router';
import { fetchTodoDetail } from '../apis/api';
import { useState, useEffect } from 'react';
import { Input } from 'antd';

interface TodoDetailProps {
    id: number;
    text: string;
    done: boolean;
}

const TodoDetail = () => {
    const [details, setDetails] = useState<TodoDetailProps | null>(null);
    const {id} = useParams();

    useEffect(() => {
        if (!id) {
            return;
        }
        let cancelled = false;
        fetchTodoDetail(id).then((response) => {
            if (!cancelled) {
                setDetails(response.data);
            }
        })
        .catch(() => {
            if (!cancelled) {
                setDetails(null);
            }
        });

        return () => { cancelled = true;};
    }, [id]);
    
    return (
        <>
        // TODO implement the detail page
            {/* <Input value={text} onChange={(e) => setText(e.target.value)}></Input>
            <h1>Todo Detail for ID {id}: {text}</h1> */}
        </>
    );
}

export default TodoDetail;