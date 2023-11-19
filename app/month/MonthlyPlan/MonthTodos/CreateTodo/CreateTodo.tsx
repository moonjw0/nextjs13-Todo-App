'use client'
import { useState } from 'react'
import { useAppDispatch } from '@/store/hooks';
import { addTodos } from '../../../../../store/monthtodosSlice'
import './CreateTodo.css'

const CreateTodo = () => {
  const dispatch = useAppDispatch();
  const [todoDate, setTodoDate] = useState<Date>(new Date());
  const [todoContent, setTodoContent] = useState('');

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit'
  };
  const formattedDate = todoDate.toLocaleDateString('ko-KR', options).replace(/\. /g, '-').replace(/\./, '');

  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addTodos({ content: todoContent, dateTodo_str: formattedDate})); 
    setTodoContent('');
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoContent(e.target.value);
  }

  return (
    <form className='createtodo_container' onSubmit={handleSubmit}>
      <input type='text' value={todoContent} placeholder="새로운 할일 추가하기" className='createtodo_input' onChange={handleInput}/>
      <button type='submit' className='todaytodo_register'>저장</button>
    </form>
  )
}

export default CreateTodo