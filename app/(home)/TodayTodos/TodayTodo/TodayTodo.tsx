'use client'
import { Todo } from '@/store/todaytodosSlice'
import React from 'react'
import './TodayTodo.css'

const TodayTodo = ({ id, todo }: {id: number; todo: string}) => {
  const handleSubmit = () => {
    
  }

  const handleCompleted = () => {
  }

  return (
    <div className='todaytodo_container'>
      <form className='todaytodo_left' onSubmit={handleSubmit}>
        <input type='checkbox' className='todaytodo_check' onClick={handleCompleted}/> 
        <input type='text' className='todaytodo_todo' />
      </form>
      <div className='todaytodo_right'>
        <span className='todaytodo_update'>수정</span>
        <span className='todaytodo_delete'>삭제</span>
      </div>
    </div>
  )
}

export default TodayTodo