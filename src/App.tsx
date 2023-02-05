import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [todolistId: string]: TaskType[]
}

function App() {
    /* const todolistTitle = "What to learn"
     const [tasks, setTasks] = useState<TaskType[]>([
         {id: v1(), title: 'HTML', isDone: true},
         {id: v1(), title: 'JS', isDone: true},
         {id: v1(), title: 'REACT', isDone: false},
         {id: v1(), title: 'REDUX', isDone: false},
         {id: v1(), title: 'RTK', isDone: false}
     ])

     const [filterValue, setFilterValue] = useState<FilterValuesType>('all')*/

    const todolistId_1 = v1()
    const todolistId_2 = v1()
    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId_1, title: 'What to learn', filter: 'all'},
        {id: todolistId_2, title: 'What to buy', filter: 'all'}
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistId_1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'REACT', isDone: false},
            {id: v1(), title: 'REDUX', isDone: false},
            {id: v1(), title: 'RTK', isDone: false}
        ],
        [todolistId_2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Bread', isDone: true},
            {id: v1(), title: 'Potato', isDone: false}
        ]
    })

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(t => t.id !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    const removeTask = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})
    }

    const changeTodolistFilter = (todolistId: string, filterValue: FilterValuesType) => {
        setTodolists(todolists.map(t => t.id === todolistId ? {...t, filter: filterValue} : t))
    }

    const addTask = (todolistId: string, title: string) => {
        const newTask: TaskType = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone} : t)})
    }
    const getFilteredTasks = (tasks: TaskType[], filterValue: FilterValuesType) => {
        switch (filterValue) {
            case "active":
                return tasks.filter(t => !t.isDone);
            case "completed":
                return tasks.filter(t => t.isDone);
            default:
                return tasks
        }
    }


    const todolistsList = todolists.length ? todolists.map(t => {
        const filteredTasks: TaskType[] = getFilteredTasks(tasks[t.id], t.filter)
        return (
            <Todolist
                key={t.id}
                id={t.id}
                filterValue={t.filter}
                title={t.title}
                tasks={filteredTasks}
                removeTask={removeTask}
                changeTodolistFilter={changeTodolistFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                removeTodolist={removeTodolist}/>
        )
    })
        : <span>Create your first todolist!</span>

    return (
        <div className="App">
            {todolistsList}
        </div>
    );
}

export default App;