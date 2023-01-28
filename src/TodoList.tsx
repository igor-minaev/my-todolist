import React, {ChangeEvent, KeyboardEvent, FC, useState} from 'react';
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (newTitle: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
}


export const TodoList: FC<TodoListPropsType> = (props) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState(false)
    const tasksList = props.tasks.length ? props.tasks.map(task => {
            const removeTaskHandler = () => props.removeTask(task.id)
            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked)
            return (
                <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                    <input type="checkbox" checked={task.isDone}
                           onChange={onChangeHandler}/>
                    <span>{task.title}</span>
                    <button onClick={removeTaskHandler}>x</button>
                </li>
            )
        })
        : <span>Your Todolist is empty!</span>

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && addTask()
    }
    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle !== '') {
            props.addTask(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle('')
    }

    const onChangeFilterCreator = (filter: FilterValuesType) => () => props.changeFilter(filter)
    const errorMessage = error && <div className={'error-message'}>Title is required</div>

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input className={error ? 'error' : ''} value={title} onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}/>
                <button onClick={addTask}>+</button>
                {errorMessage}
            </div>
            <ul>
                {tasksList}
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-btn' : ''}
                        onClick={onChangeFilterCreator('all')}>All
                </button>
                <button className={props.filter === 'active' ? 'active-btn' : ''}
                        onClick={onChangeFilterCreator('active')}> Active
                </button>
                <button className={props.filter === 'completed' ? 'active-btn' : ''}
                        onClick={onChangeFilterCreator('completed')}>Completed
                </button>
            </div>
        </div>
    );
};

