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
    const [searchId, setSearchId] = useState<number | null>(null);
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

    const handleSearch = () => {
        if (searchId === null) {
            // Todo: messageApi
        }
        fetchTodoDetail(String(searchId)).then((response) => {
            setDetails(response.data);
        }).catch(() => { 
            setDetails(null); 
        }).finally(() => {
            setSearchId(null);
        });
    }
    
    return (
        <>
            <Input 
                value={details?.text}
                onChange={(e) => setSearchId(Number(e.target.value))}
                onSubmit={handleSearch}
            />
            { details ? (
                <div>
                    <h1>Todo Detail for ID {details.id}</h1>
                    <p>Text: {details.text}</p>
                    <p>Status: {details.done ? "Completed" : "Pending"}</p>
                </div>
            ) : (
                <div>
                    <h1>No Todo Found</h1>
                </div>
            )}
        </>
    );
}

export default TodoDetail;