'use client'
import { useState } from 'react'
import { useAppDispatch } from '@/store/hooks';
import './CreateTodayTodo.css'
import CalendarModal from './CalendarModal/CalendarModal';
import { postToPocket } from '@/store/postToPocketSlice';
import { addTodos } from '@/store/todaytodosSlice';

const CreateTodayTodo = () => {
  const dispatch = useAppDispatch();
  const [CalendarOpen, setCalendarOpen] = useState(false);
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
    dispatch(addTodos({ content: todoContent, dateTodo_str: formattedDate})); // RTK 추가
    const newTodo = {
      content: todoContent,
      dateTodo: formattedDate,
    }
    dispatch(postToPocket(newTodo)); // pocketbase 추가
    setTodoContent('');
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoContent(e.target.value);
  }

  return (
    <form className='createtodaytodo_container' onSubmit={handleSubmit}>
      {CalendarOpen && (
        <CalendarModal setCalendarOpen={setCalendarOpen} setTodoDate={setTodoDate} todoDate={todoDate} /> 
      )}
        <input type='text' value={formattedDate} placeholder='날짜 선택하기' className='createtodaytodo_date' onFocus={() => setCalendarOpen(true)} readOnly/>
      <input type='text' value={todoContent} placeholder="새로운 할일 추가하기" className='createtodaytodo_input' onChange={handleInput}/>
      <button type='submit' className='todaytodo_register'>저장</button>
    </form>
  )
}

export default CreateTodayTodo