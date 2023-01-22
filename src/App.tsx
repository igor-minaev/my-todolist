import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

export type FilterValuesType = 'all' | 'active' | 'completed'


function App() {
    const todolistTitle: string = 'What to learn'
    /*const todolistTitle_2: string = 'What to buy'
    const todolistTitle_3: string = 'What to do'*/

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false}
    ])

    const [filter, setFilter] = useState<FilterValuesType>('all')
    /*const tasks_2: Array<TaskType> = [
        {id: 4, title: 'Milk', isDone: true},
        {id: 5, title: 'Potato', isDone: true},
        {id: 5, title: 'Potato', isDone: true},
        {id: 5, title: 'Potato', isDone: true},
        {id: 6, title: 'Bread', isDone: true}
    ]
    const tasks_3: Array<TaskType> = [
        {id: 1, title: 'Go to the shop', isDone: true},
        {id: 2, title: 'Watch the video', isDone: true},
        {id: 3, title: 'Read the book', isDone: false}
    ]*/

    const removeTask = (taskId: number) => {
        setTasks(tasks.filter(task => taskId !== task.id))
        console.log(tasks)
    }

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    const getFilteredTasks = () => {
        switch (filter) {
            case "active":
                return tasks.filter(task => !task.isDone)
            case "completed":
                return tasks.filter(task => task.isDone)
            default:
                return tasks
        }
    }

    const filteredTasksForTodolist: Array<TaskType> = getFilteredTasks()

    return (
        <div className="App">
            <Todolist
                title={todolistTitle}
                tasks={filteredTasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}/>
            {/*<Todolist title={todolistTitle_2} tasks={tasks_2}/>
            <Todolist title={todolistTitle_3} tasks={tasks_3}/>*/}
        </div>
    );
}


export default App;
