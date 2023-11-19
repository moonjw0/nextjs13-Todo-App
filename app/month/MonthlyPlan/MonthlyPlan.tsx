'use client'
import React, { useState } from 'react'
import MonthCalendar from './MonthCalendar/MonthCalendar'
import MonthTodos from './MonthTodos/MonthTodos'
import './MonthlyPlan.css'

const MonthlyPlan = () => {
  const [todoDate, setTodoDate] = useState<Date>(new Date());

  return (
    <div className='monthlyPlan_container'>
      <MonthCalendar setTodoDate={setTodoDate} todoDate={todoDate}/>
      <MonthTodos todoDate={todoDate} />
    </div>
  )
}

export default MonthlyPlan