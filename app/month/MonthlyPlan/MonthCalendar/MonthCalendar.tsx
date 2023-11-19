'use client'
import React from 'react'
import Calendar, { TileClassNameFunc, MonthView } from 'react-calendar'
import './MonthCalendar.css'

const MonthCalendar = ({setTodoDate, todoDate}: {setTodoDate: any; todoDate: Date; }) => {
  type ValuePiece = Date | null; // calendar의 날짜 타입
  type Value = ValuePiece | [ValuePiece, ValuePiece]; // 날짜가 1개 혹은 여러개

  const handleTodoDate = (value: Value, event: React.MouseEvent<HTMLButtonElement>) => {
    const newTodoDate = Array.isArray(value) ? value[0] : value;
    if (newTodoDate){
      setTodoDate(newTodoDate);
    }
  }
  // tileClassName={handleColor}
  // const handleColor = ({todoDate, view}: {todoDate: Date, view: TileClassNameFunc}) => {
  //   if (view === 'month' && todoDate && date.getDate() === todoDate.getDate() && date.getMonth() === todoDate.getMonth() && date.getFullYear() === todoDate.getFullYear()) {
  //     return 'custom-tile--active';
  // }

  return (
    <div className='calendar_container'>
      <Calendar locale="ko-KR" onChange={handleTodoDate} value={todoDate} />
    </div>

  )
}

export default MonthCalendar