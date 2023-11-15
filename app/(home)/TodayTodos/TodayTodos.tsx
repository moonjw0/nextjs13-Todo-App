'use client'
import React from 'react'
import TodayTodo from './TodayTodo/TodayTodo'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import './TodayTodos.css'
import { Todo } from '../../../store/todaytodosSlice';

const TodayTodos = () => {
  const dispatch = useAppDispatch();
  const todaytodos = useAppSelector(state => state.todaytodos); // store 정의된 이름
  console.log(todaytodos);

  return (
    <div className='todaytodos_page'>
      <div className='todaytodos_container'>
        <h2 className='todaytodos_title'>Today Todolist</h2>
        {todaytodos.todos.length === 0 ? (
          <p className='todaytodos_empty'>할 일이 없습니다</p>
        ) : (
          todaytodos.todos.map((todaytodo: Todo) => (
          <TodayTodo key={todaytodo.id} id={todaytodo.id} todo={todaytodo.content}/>
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