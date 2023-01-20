import React from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";

function App() {
    const todolistTitle_1: string = 'What to learn'
    const todolistTitle_2: string = 'What to buy'
    const todolistTitle_3: string = 'What to do'
    const tasks_1: Array<TaskType> = [
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false}
    ]
    const tasks_2: Array<TaskType> = [
        {id: 4, title: 'Milk', isDone: true},
        {id: 5, title: 'Bread', isDone: false},
        {id: 6, title: 'Potato', isDone: false}
    ]
    const tasks_3: Array<TaskType> = [
        {id: 7, title: 'Read the book', isDone: true},
        {id: 8, title: 'Go to the shop', isDone: true},
        {id: 9, title: 'Watch the video', isDone: true}
    ]
    return (
        <div className="App">
            <TodoList title={todolistTitle_1} tasks={tasks_1}/>
            <TodoList title={todolistTitle_2} tasks={tasks_2}/>
            <TodoList title={todolistTitle_3} tasks={tasks_3}/>
        </div>
    );
}

export default App;
