'use client'
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useEffect } from 'react'
import { Todo, fetchTodo } from '@/store/todoSlice';
import { formattedDate } from '@/app/(home)/TodayTodos/toLocaleDateString';
import CreateTodo from './CreateTodo/CreateTodo';
import MonthTodo from './MonthTodo/MonthTodo';
import './MonthTodos.css'

const MonthTodos = ({todoDate}: {todoDate: Date}) => {
  const dispatch = useAppDispatch(); 

  // 포켓베이스에서 RTK로 데이터 가져옴
  useEffect(() => {
    dispatch(fetchTodo()); 
  }, [dispatch]);

  // state.todaytodos: store 정의된 이름
  // RTK -> UI로 전체 할 일 데이터 가져옴 + 오늘 날짜로 필터링
  const allTodos = useAppSelector(state => state.todo); 
  const todos = allTodos?.todos?.filter(todo => {
    return todo.dateTodo.split(' ')[0] === formattedDate(todoDate);
  });

  return (
    <div className='monthtodos_page'>
      <div className='monthtodos_container'>
        <CreateTodo formattedDate={formattedDate(todoDate)}/>
        {todos.length === 0 ? (
            <p className='todaytodos_empty'>할 일이 없습니다</p>
          ) : (
              todos.map((todo: Todo) => (
              <MonthTodo key={todo.id} todo={todo}/>
              ))
          )}
      </div>
    </div>
  )
}

export default MonthTodos
