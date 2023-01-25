import React, {ChangeEvent, KeyboardEvent, FC, useState} from 'react';
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (newTaskTitle: string) => void
}

export const Todolist: FC<TodolistPropsType> = (props) => {
    const [title, setTitle] = useState('')

    const tasksList = props.tasks.length ? props.tasks.map(task => {
                const removeTask = () => props.removeTask(task.id)
                return (
                    <li key={task.id}>
                        <input type="checkbox" checked={task.isDone}/>
                        <span>{task.title}</span>
                        <button onClick={removeTask}>x</button>
                    </li>
                )
            }
        )
        : <span>Your Todolist is empty!</span>

    const addTask = () => {
        props.addTask(title)
        setTitle('')
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && addTask()
    }

    /*const onClickHandlerAll = () => props.changeFilter('all')
    const onClickHandlerActive = () => props.changeFilter('active')
    const onClickHandlerCompleted = () => props.changeFilter('completed')*/

    const filterHandlerCreator = (filter: FilterValuesType) => () => props.changeFilter(filter)

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title} onChange={onChangeHandler} onKeyDown={onKeyDownHandler}/>
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {tasksList}
            </ul>
            <div>
                <button onClick={filterHandlerCreator('all')}>All</button>
                <button onClick={filterHandlerCreator('active')}>Active</button>
                <button onClick={filterHandlerCreator('completed')}>Completed</button>
            </div>
        </div>
    );
};

