import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    id: string
    filter: FilterValuesType
    tasks: TaskType[]
    removeTask: (todolistId: string, taskId: string) => void
    changeTodolistFilter: (todolistId: string, filter: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
}

export const Todolist: React.FC<TodolistPropsType> = (props) => {


    const tasksList = props.tasks.length
        ? props.tasks.map(task => {
            const removeTask = () => props.removeTask(props.id, task.id)
            const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(props.id, task.id, e.currentTarget.checked)
            const changeTaskTitle = (title: string) => {
                props.changeTaskTitle(props.id, task.id, title)
            }
            const taskClass = task.isDone ? 'done' : 'task'
            return (
                <li key={task.id} className={taskClass}>
                    <input type="checkbox" checked={task.isDone} onChange={changeTaskStatus}/>
                    <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
                    <button onClick={removeTask}>x</button>
                </li>
            )
        })
        : <span>Your task list is empty!</span>

    const addTask = (title: string) => {
        props.addTask(props.id, title)
    }


    const onClickHandlerCreator = (filter: FilterValuesType) => () => props.changeTodolistFilter(props.id, filter)

    const removeTodolist = () => props.removeTodolist(props.id)
    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.id, title)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodolistTitle}/>
                <button onClick={removeTodolist}>x</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {tasksList}
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-btn' : ''}
                        onClick={onClickHandlerCreator("all")}>All
                </button>
                <button className={props.filter === 'active' ? 'active-btn' : ''}
                        onClick={onClickHandlerCreator("active")}>Active
                </button>
                <button className={props.filter === 'completed' ? 'active-btn' : ''}
                        onClick={onClickHandlerCreator("completed")}>Completed
                </button>
            </div>
        </div>
    );
};

