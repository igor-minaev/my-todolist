import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState(false)
    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle !== '') {
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle('')
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addItem()
    const inputClass = error ? 'error' : ''
    const errorMessage = error && <p style={{color: 'red', margin: '0'}}>Title is required!</p>
    return (
        <div>
            <input className={inputClass} value={title} onChange={onChangeHandler} onKeyDown={onKeyDownHandler}/>
            <button onClick={addItem}>+</button>
            {errorMessage}
        </div>
    );
};

