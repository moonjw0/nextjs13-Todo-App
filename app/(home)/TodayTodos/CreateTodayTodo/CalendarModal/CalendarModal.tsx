'use client'
import  { useRef } from 'react'
import { Calendar } from 'react-calendar';
import useOnClickOutside from './useOnClickOutside';
import './CalendarModal.css'

const CalendarModal = ({setCalendarOpen, setTodoDate, todoDate}: {setCalendarOpen: any; setTodoDate: any; todoDate: Date; }) => {

  // react-calendar의 타입
  type ValuePiece = Date | null; // calendar의 날짜 타입
  type Value = ValuePiece | [ValuePiece, ValuePiece]; // 날짜가 1개 혹은 여러개

  const handleTodoDate = (value: Value, event: React.MouseEvent<HTMLButtonElement>) => {
    const newTodoDate = Array.isArray(value) ? value[0] : value;
    if (newTodoDate){
      setTodoDate(newTodoDate);
      setCalendarOpen(false);
    }
  }

  // const ref = useRef();
  // useOnClickOutside(ref, () => {
  //   setCalendarOpen(false);
  // });
  return (
    <div className='wrapper-modal'>
      {/* <div className='modal' ref={ref}> */}
      <div className='modal'>
        <span className='modal-close' onClick={() => setCalendarOpen(false)}>X</span>
        <Calendar locale="ko-KR" onChange={handleTodoDate} value={todoDate} />
      </div>
    </div>
    
  )
}

export default CalendarModal

