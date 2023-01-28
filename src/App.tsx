import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed'


function App() {
    const todoListTitle: string = 'What to learn'
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false}
    ])
    const [filter, setFilter] = useState<FilterValuesType>('all')

    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(t => t.id !== taskId))
    }

    const changeFilter = (filter: FilterValuesType) => setFilter(filter)

    const getFilteredTasks = () => {
        switch (filter) {
            case 'active':
                return tasks.filter(t => !t.isDone)
            case 'completed':
                return tasks.filter(t => t.isDone)
            default:
                return tasks
        }
    }

    const addTask = (newTitle: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: newTitle,
            isDone: false
        }
        setTasks([newTask, ...tasks])
    }

    const changeTaskStatus = (taskId: string, isDone: boolean) =>
        setTasks(tasks.map(t => t.id === taskId ? {...t, isDone} : t))


    return (
        <div className="App">
            <TodoList
                title={todoListTitle}
                filter={filter}
                tasks={getFilteredTasks()}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}/>
        </div>
    );
}

export default App;