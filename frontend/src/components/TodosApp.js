import React, { useEffect, useState } from 'react';

const API_URL = `${process.env.REACT_APP_API_URL}/api/todos`;


const TodoApp = () => {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Fetch todos
    const fetchTodos = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await fetch(API_URL);
            if (!res.ok) throw new Error('Failed to fetch todos');
            const data = await res.json();
            setTodos(data);
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    // Add todo
    const addTodo = async (e) => {
        e.preventDefault();
        setError('');
        if (!title.trim()) return;
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/todos`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title }),
            });
            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.error || 'Failed to add todo');
            }
            setTitle('');
            fetchTodos();
        } catch (err) {
            setError(err.message);
        }
    };

    // Toggle todo
    const toggleTodo = async (id) => {
        setError('');
        try {
            const res = await fetch(`${API_URL}/${id}/toggle`, { method: 'PATCH' });
            if (!res.ok) throw new Error('Failed to toggle todo');
            fetchTodos();
        } catch (err) {
            setError(err.message);
        }
    };

    // Delete todo
    const deleteTodo = async (id) => {
        setError('');
        try {
            const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Failed to delete todo');
            fetchTodos();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: '2rem auto', padding: 20, border: '1px solid #ccc', borderRadius: 8 }}>
            <h2>Todo App</h2>
            <form onSubmit={addTodo} style={{ marginBottom: 20 }}>
                <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Add a new todo"
                    style={{ width: '70%', padding: 8 }}
                />
                <button type="submit" style={{ padding: 8, marginLeft: 8 }}>Add</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {todos.map(todo => (
                        <li key={todo._id} style={{ marginBottom: 10, display: 'flex', alignItems: 'center' }}>
                            <span
                                onClick={() => toggleTodo(todo._id)}
                                style={{
                                    textDecoration: todo.completed ? 'line-through' : 'none',
                                    cursor: 'pointer',
                                    flex: 1,
                                }}
                            >
                                {todo.title}
                            </span>
                            <button onClick={() => deleteTodo(todo._id)} style={{ marginLeft: 10 }}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TodoApp;