/* eslint-disable array-callback-return */
import React, { useState } from 'react'
import './App.css'
import Header from './components/Header'
import backImg from './assets/back.png'

function App() {
	const [inputValue, setInputValue] = useState('')
	const [todos, setTodos] = useState<TodoList[]>([])
	const [searchValue, setSearchValue] = useState('')
	const [displayMode, setDisplayMode] = useState('all')

	type TodoList = {
		inputValue: string
		id: number
		checked: boolean
	}

	const onChangeFunc = (e: { target: { value: any } }) => {
		setInputValue(e.target.value)
	}

	const handleSubmit = (e: { preventDefault: () => void }) => {
		e.preventDefault()
		if (inputValue.trim().length === 0) {
			return
		}

		const newTodoList: TodoList = {
			inputValue: inputValue,
			id: todos.length,
			checked: false,
		}
		setTodos([newTodoList, ...todos])
		setInputValue(' ')
	}

	const handleEdit = (id: number, inputValue: string) => {
		const newTodos = todos.map(todo => {
			if (todo.id === id) {
				todo.inputValue = inputValue
			}
			return todo
		})
		setTodos(newTodos)
	}

	const handleChecked = (id: number, checked: boolean) => {
		const newTodos = todos.map(todo => {
			if (todo.id === id) {
				todo.checked = !checked
			}
			return todo
		})
		setTodos(newTodos)
	}

	const handleDelete = (id: number) => {
		const newTodos = todos.filter(todo => todo.id !== id)
		setTodos(newTodos)
	}

	return (
		<>
			<Header />
			<img src={backImg} alt='back img' className='imgBack' />
			<div className='App'>
				<div>
					<h2>Add tasks</h2>
					<form onSubmit={handleSubmit}>
						<input type='text' onChange={onChangeFunc} className='input' value={inputValue} />
						<input type='submit' value='Add' className='button' />
					</form>
					<div className='search'>
						<input
							type='text'
							className='input inputSearch'
							placeholder='Search 🔎'
							value={searchValue}
							onChange={e => setSearchValue(e.target.value)}
						/>
					</div>
					<div>
						<div>
							<button className={displayMode === 'all' ? 'active' : ''} onClick={() => setDisplayMode('all')}>
								All
							</button>
							<button className={displayMode === 'active' ? 'active' : ''} onClick={() => setDisplayMode('active')}>
								Active
							</button>
							<button className={displayMode === 'completed' ? 'active' : ''} onClick={() => setDisplayMode('completed')}>
								Completed
							</button>
						</div>
					</div>
					<ul className='todoList'>
						{todos
							.filter(todo => {
								if (displayMode === 'all') return true
								else if (displayMode === 'active') return !todo.checked
								else if (displayMode === 'completed') return todo.checked
							})
							.filter(todo => todo.inputValue.toLowerCase().includes(searchValue.toLowerCase()))
							.map(todo => (
								<li key={todo.id}>
									<input
										type='text'
										onChange={e => handleEdit(todo.id, e.target.value)}
										className={todo.checked ? 'input checked' : 'input'}
										value={todo.inputValue}
										disabled={todo.checked}
									/>
									<input type='checkbox' onChange={e => handleChecked(todo.id, todo.checked)} />
									<button onClick={e => handleDelete(todo.id)}>Delete</button>
								</li>
							))}
					</ul>
				</div>
			</div>
		</>
	)
}

export default App
