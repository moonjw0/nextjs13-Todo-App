'use client'
import { useState } from 'react'
import { useAppDispatch } from '@/store/hooks';
import './CreateTodo.css'
import { postTodo } from '@/store/todoSlice';

const CreateTodo = ({formattedDate}: {formattedDate: string}) => {
  const dispatch = useAppDispatch();
  const [todoContent, setTodoContent] = useState('');

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit'
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTodo = {
      content: todoContent,
      dateTodo: formattedDate,
      completed: false,
    }
    // console.log(newTodo);
    dispatch(postTodo(newTodo)); // pocketbase 추가
    setTodoContent('');
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoContent(e.target.value);
  }

  return (
    <form className='createtodo_container' onSubmit={handleSubmit}>
      <input type='text' value={todoContent} placeholder={`[${formattedDate}]  새로운 할일 추가하기`}className='createtodo_input' onChange={handleInput}/>
      <button type='submit' className='todaytodo_register'>저장</button>
    </form>
  )
}

export default CreateTodo