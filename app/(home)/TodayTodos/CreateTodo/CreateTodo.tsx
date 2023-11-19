'use client'
import { useState } from 'react'
import { useAppDispatch } from '@/store/hooks';
import { addTodos } from '../../../../store/todaytodosSlice';
import './CreateTodo.css'
import CalendarModal from './CalendarModal/CalendarModal';

const CreateTodo = () => {
  const dispatch = useAppDispatch();
  const [CalendarOpen, setCalendarOpen] = useState(false);
  const [todoDate, setTodoDate] = useState<Date>(new Date());
  const [todoContent, setTodoContent] = useState('');

  // 캘린더에서 선택하는 시간은 한국시간
  // input에 보여지는 시간, 저장되는 시간은 UTC
  // toISOString을 쓰면 UTC 시간으로 변경됨
  // TodayTodos의 오늘 날짜도 UTC
  // Pocketbase에 저장되는 날짜도 UTC라 오늘 할일은 잘 출력되는듯
  // toLocalString()이 있으나 형태 변경을 해야함

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    dispatch(addTodos({ content: todoContent, dateTodo_str: todoDate.toISOString().split('T')[0]})); // 날짜 추가
    setTodoContent('');
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoContent(e.target.value);
  }

  return (
    <form className='createtodo_container' onSubmit={handleSubmit}>
      {CalendarOpen && (
        <CalendarModal setCalendarOpen={setCalendarOpen} setTodoDate={setTodoDate} todoDate={todoDate} /> 
      )}
        <input type='text' value={todoDate.toISOString().split('T')[0]} placeholder='날짜 선택하기' className='createtodo_date' onFocus={() => setCalendarOpen(true)} readOnly/>
      <input type='text' value={todoContent} placeholder="새로운 할일 추가하기" className='createtodo_input' onChange={handleInput}/>
      <button type='submit' className='todaytodo_register'>저장</button>
    </form>
  )
}

export default CreateTodo