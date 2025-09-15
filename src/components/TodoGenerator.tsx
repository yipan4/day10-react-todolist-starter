import { Dispatch, useState } from "react";
import { AddAction } from "../interfaces/todoActionsInterface";
import { addTodo } from "../apis/api";

import { Input } from "antd";
const { Search } = Input;

interface TodoGeneratorProps {
    dispatch: Dispatch<AddAction>;
}

const TodoGenerator = (props: TodoGeneratorProps) => {
    const { dispatch } = props; 
    const [text, setText] = useState("");

    const handleSearch = async (value: string) => {
        const input = value ?? text;
        if (input.trim() === "") {
            return;
        }
        const newTodo = {
            text: input,
            done: false
        }
        const response = await addTodo(newTodo);
        const action: AddAction = { type: "ADD_TODO", text: response.data.text as string, id: response.data.id as number};
        dispatch(action);
        setText("");
    }

    return (
        <div>
            <Search
                placeholder="input todo content"
                enterButton="Add"
                size="large"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onSearch={handleSearch}
                style={{ paddingLeft: "20%", paddingRight: "20%" }}
            />
        </div>
    )
}

export default TodoGenerator;