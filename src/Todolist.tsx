import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    id: string
    title: string
    tasks: TaskType[]
    removeTask: (todolistId: string, taskId: string) => void
    changeTodolistFilter: (todolistId: string, filterValue: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    filterValue: FilterValuesType
    removeTodolist: (todolistId: string) => void
}

export const Todolist = (props: TodolistPropsType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)
    const listTasksItem = props.tasks.length ? props.tasks.map(t => {
            const removeTask = () => {
                props.removeTask(props.id, t.id)
            }
            const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(props.id, t.id, e.currentTarget.checked)
            const taskClass = t.isDone ? 'isDone' : ''
            return (
                <li key={t.id} className={taskClass}>
                    <input type="checkbox" checked={t.isDone}
                           onChange={changeTaskStatus}/>
                    <span>{t.title}</span>
                    <button onClick={removeTask}>x</button>
                </li>
            )
        })
        : <span>Your todolist is empty!</span>

    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle !== '') {
            props.addTask(props.id, trimmedTitle)
        } else {
            setError(true)
        }
        setTitle('')
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && addTask()
    }

    const changeFilterHandlerCreator = (filterValue: FilterValuesType) => () => props.changeTodolistFilter(props.id, filterValue)
    const errorMessage = error && <p className='error'>Title is required!</p>
    const inputClass = error ? 'inputError' : ''
    const removeTodolist = () => props.removeTodolist(props.id)

    return (
        <div>
            <h3>
                {props.title}
                <button onClick={removeTodolist}>x</button>
            </h3>
            <div>
                <input className={inputClass} value={title} onChange={onChangeHandler} onKeyDown={onKeyDownHandler}/>
                <button onClick={addTask}>+</button>
                {errorMessage}
            </div>
            <ul>
                {listTasksItem}
            </ul>
            <div>
                <button className={props.filterValue === 'all' ? 'active' : ''}
                        onClick={changeFilterHandlerCreator('all')}>All
                </button>
                <button className={props.filterValue === 'active' ? 'active' : ''}
                        onClick={changeFilterHandlerCreator('active')}>Active
                </button>
                <button className={props.filterValue === 'completed' ? 'active' : ''}
                        onClick={changeFilterHandlerCreator('completed')}>Completed
                </button>
            </div>
        </div>
    );
};

