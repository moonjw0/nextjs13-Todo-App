'use client'
import React, { useEffect } from 'react'
import TodayTodo from './TodayTodo/TodayTodo'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import './TodayTodos.css'
import { Todo, fetchTodayTodos } from '../../../store/todaytodosSlice';
import CreateTodo from './CreateTodo/CreateTodo'

const TodayTodos = () => {
  const dispatch = useAppDispatch(); 
  const today = new Date().toISOString().split('T')[0]; // 2023-11-17

  // 포켓베이스에서 RTK로 데이터 가져옴
  useEffect(() => {
    dispatch(fetchTodayTodos()); 
  }, [dispatch]);

  // state.todaytodos: store 정의된 이름
  // RTK -> UI로 전체 할 일 데이터 가져옴 + 오늘 날짜로 필터링
  const allTodos = useAppSelector(state => state.todaytodos); 
  const todaytodos = allTodos?.todos?.filter(todo => {
    return todo.dateTodo.split(' ')[0] === today;
  });

  return (
    <div className='todaytodos_page'>
      <div className='todaytodos_container'>
        <h2 className='todaytodos_title'>Today Todolist</h2>
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

export default TodayTodos

/*
 * - PocketBase, RTK, UI
 * 
 * 1. 페이지 접속 (PocketBase -> RTK, UI)
 *  PocketBase API 호출 + 데이터 로드 / 데이터 RTK에 저장
 * 
 * 2. 사용자 상호작용 (RTK <-> UI)
 *  UseAppSelector, UseDispatch로 RTK 데이터 업데이트, 조회 등등
 *  
 * 3. 데이터 수정 / 서버 동기화 (RTK <-> PocketBase)
 *  사용자의 수정된 데이터(RTK에는 이미 2번에서 반영) -> PocketBase에 변경요청?? 
 */


/*
 * Pocketbase의 API응답은 JSON 객체 형대로 제공
 */