import React, { useState } from 'react'

const initialTodo ={
    id: '',
    task: '',
    completed: false
  }

const TodoForm = () => {
    const [todo, setTodo] = useState(initialTodo)
    const [todos, setTodos] = useState([])

    const onChange = evt => {
        const { name, value } = evt.target
        setTodo({...todo, [name]: value})
    }

    const onSubmit = evt => {
        evt.preventDefault()
        const newTodo = {...todo, id: Date.now()}
        setTodos([...todos, newTodo])
        setTodo(initialTodo)
    }

    const completeTask = id => {
        const newTodos = todos.map(td => {
            if(td.id === id) {
                return {...td, completed: !td.completed}
            } else {
                return td
            }
        })
        setTodos(newTodos)
    }

    const deleteCompleted = () => {
        const newTodos = todos.filter(td => !td.completed)
        setTodos(newTodos)
    }

    return (
        <>
            <div>
                <form onSubmit={onSubmit}>
                    <input onChange={onChange} type='text' placeholder='Type todo...' name='task' value={todo.task}></input>
                    <button>Add</button>
                </form>
            </div>
            <div>
                <button onClick={deleteCompleted}>Delete Completed</button>
            </div>
            <div>
                <div className='todoList'>
                    <ul>
                        {todos.map(todo => {
                            return (
                                <div key={todo.id} className={todo.completed ? 'listItems completed' : 'listItems'}>
                                    <li>{todo.task} <button onClick={() => completeTask(todo.id)}>{todo.completed ? 'Undo' : 'Done'}</button></li>
                                </div>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default TodoForm