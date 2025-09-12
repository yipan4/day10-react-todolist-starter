interface TodoGeneratorProps {
    onTodoItemSubmit: (text: string) => void;
}

const TodoGenerator = (props: TodoGeneratorProps) => {
    return (
        <div>
            <form className="todo-generator">
                <input type="text" />
                <button type="submit">Add</button>
            </form>
        </div>
    )
}

export default TodoGenerator;