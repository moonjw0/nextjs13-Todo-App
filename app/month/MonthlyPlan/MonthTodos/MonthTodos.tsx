'use client'
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Todo, fetchTodos } from '@/store/todaytodosSlice';
import React, { useEffect } from 'react'
import TodayTodo from '@/app/(home)/TodayTodos/TodayTodo/TodayTodo';
import './MonthTodos.css'
import CreateTodo from './CreateTodo/CreateTodo';

const MonthTodos = ({todoDate}: {todoDate: Date}) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit'
  };
  const formattedDate = todoDate.toLocaleDateString('ko-KR', options).replace(/\. /g, '-').replace(/\./, '');


  const dispatch = useAppDispatch(); 

  // 포켓베이스에서 RTK로 데이터 가져옴
  useEffect(() => {
    dispatch(fetchTodos()); 
  }, [dispatch]);

  // state.todaytodos: store 정의된 이름
  // RTK -> UI로 전체 할 일 데이터 가져옴 + 오늘 날짜로 필터링
  const allTodos = useAppSelector(state => state.todaytodos); 
  const todaytodos = allTodos?.todos?.filter(todo => {
    return todo.dateTodo.split(' ')[0] === formattedDate;
  });

  return (
    <div className='monthtodos_page'>
      <div className='monthtodos_container'>
        <CreateTodo />
        {todaytodos.length === 0 ? (
            <p className='todaytodos_empty'>할 일이 없습니다</p>
          ) : (
            todaytodos.map((todaytodo: Todo) => (
            <TodayTodo key={todaytodo.id} id={todaytodo.id} todo_content={todaytodo.content}/>
          ))
          )}
      </div>
    </div>
  )
}

export default MonthTodos