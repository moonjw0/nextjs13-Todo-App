'use client'
import { useState } from 'react'
import './MonthTodo.css'
import { useAppDispatch } from '@/store/hooks';
import { Todo, deleteTodo, updateTodo } from '../../../../../store/todoSlice';

const MonthTodo = ({todo}: {todo: Todo}) => {
  const dispatch = useAppDispatch();
  const [completed, setCompleted] = useState(false); 
  const [todoContent, setTodoContent] = useState(todo.content);
  const [update, setUpdate] = useState(false); // true: 수정가능, false: 수정불가능

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(update){ // 업데이트가 true일때 제출? = 수정끝
      const updatedTodo: Todo = {
        id: todo.id,
        content: todoContent,
        dateTodo: todo.dateTodo,
        completed: false,
      }
      console.log(todo.id, updatedTodo);
      dispatch(updateTodo({id: todo.id, updatedTodo}))
    }
    setUpdate(!update);
  }

  const handleCompleted = () => {
    setCompleted(!completed); // e.target.checked
    const updatedTodo = {
      id: todo.id,
      content: todoContent,
      dateTodo: todo.dateTodo,
      completed: completed,
    }
    dispatch(updateTodo({id: todo.id, updatedTodo}));
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoContent(e.target.value);
  }

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
  }

  return (
    <form className='todaytodo_container' onSubmit={handleSubmit}>
      <div className='todaytodo_left'>
        {update ? 
          <input className='todaytodo_input' value={todoContent || ''} onChange={handleInput}/>
          :
          <>
            <input type='checkbox' checked={completed} className='todaytodo_check' onChange={handleCompleted}/> 
            <div style={{ textDecoration: completed ? 'line-through' : 'none'}}>{todoContent}</div>
          </>
        }
      </div>
      <div className='todaytodo_right'>
        <button type='submit' className='todaytodo_update'>{update ? '저장' : '수정'}</button>
        <button type='button' className='todaytodo_delete' onClick={handleDelete}>삭제</button>
      </div>
    </form>
  )
}

export default MonthTodo



/**
 * Warning: A component is app-index.js:32 
 * changing an uncontrolled input to be 
 * controlled. This is likely caused by 
 * the value changing from undefined to 
 * a defined value, which should not happen.
 * Decide between using a controlled or 
 * uncontrolled input element for the lifetime of the component.
 * More info: https://reactjs.org/Link/controlled-components
 */