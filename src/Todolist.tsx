import React, {FC} from 'react';
import {FilterValuesType} from "./App";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: number) => void
    changeFilter: (filter: FilterValuesType) => void
}

export const Todolist: FC<TodolistPropsType> = (props) => {
        const TasksList = props.tasks.length ?
            props.tasks.map(task => {
                return (
                    <li key={
                        task.id
                    }
                    >
                        <input type="checkbox" checked={task.isDone}/>
                        <span>{task.title}</span>
                        <button onClick={() => props.removeTask(task.id)}>x</button>
                    </li>
                )
            })
            : <span>Your todolist is empty!</span>
        return (
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    {TasksList}
                </ul>
                <div>
                    <button onClick={()=>props.changeFilter("all")}>All</button>
                    <button onClick={()=>props.changeFilter("active")}>Active</button>
                    <button onClick={()=>props.changeFilter("completed")}>Completed</button>
                </div>
            </div>
        );
    }
;

