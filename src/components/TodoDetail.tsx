import { useParams } from 'react-router';
import { fetchTodoDetail } from '../apis/api';
import { useState, useEffect } from 'react';

const TodoDetail = () => {
    const [text, setText] = useState("");
    const {id} = useParams();

    useEffect(() => {
        if (!id) {
            return;
        }
        let cancelled = false;
        fetchTodoDetail(id).then((response) => {
            if (!cancelled) {
                setText(response.data.text);
            }
        })
        .catch(() => {
            if (!cancelled) {
                setText("");
            }
        });

        return () => { cancelled = true;};
    }, [id]);
    
    return (
        <h1>Todo Detail for ID {id}: {text}</h1>
    );
}

export default TodoDetail;