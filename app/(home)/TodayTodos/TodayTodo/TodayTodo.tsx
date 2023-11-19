'use client'
import { useState } from 'react'
import './TodayTodo.css'
import { useAppDispatch } from '@/store/hooks';
import { deleteTodos, updateCompleted, updateTodos } from '@/store/todaytodosSlice';
import { updateToPocket } from '@/store/updateToPocketSlice';

const TodayTodo = ({ id, todo_content }: {id: number; todo_content: string}) => {
  const dispatch = useAppDispatch();
  const [completed, setCompleted] = useState(false); 
  const [todoContent, setTodoContent] = useState(todo_content);
  const [update, setUpdate] = useState(false); // true: 수정가능, false: 수정불가능
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit'
  };
  const formattedDate = new Date().toLocaleDateString('ko-KR', options).replace(/\. /g, '-').replace(/\./, '');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(update){ // 업데이트가 true일때 제출? = 수정끝
      dispatch(updateTodos({ update_id: id, update_todo: todoContent }));
      const updateTodo = {
        content: todoContent,
        dateTodo: formattedDate,
      }
      const id_str = id.toString();
      dispatch(updateToPocket({id: id_str, updateTodo}))
    }
    setUpdate(!update);
  }     

  const handleCompleted = () => {
    setCompleted(!completed); // e.target.checked
    dispatch(updateCompleted({ update_id: id, update_completed: completed }));
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoContent(e.target.value);
  }

  const handleDelete = () => {
    dispatch(deleteTodos(id));
  }

  return (
    <form className='todaytodo_container' onSubmit={handleSubmit}>
      <div className='todaytodo_left'>
        {update ? 
          <input className='todaytodo_input' value={todoContent || ''} onChange={handleInput}/>
          :
          <>
            <input type='checkbox' checked={completed} className='todaytodo_check' onChange={handleCompleted}/> 
            <div style={{ textDecoration: completed ? 'line-through' : 'none'}}>{todoContent}</div>
          </>
        }
      </div>
      <div className='todaytodo_right'>
        <button type='submit' className='todaytodo_update'>{update ? '저장' : '수정'}</button>
        <button type='button' className='todaytodo_delete' onClick={handleDelete}>삭제</button>
      </div>
    </form>
  )
}

export default TodayTodo



/**
 * Warning: A component is app-index.js:32 
 * changing an uncontrolled input to be 
 * controlled. This is likely caused by 
 * the value changing from undefined to 
 * a defined value, which should not happen.
 * Decide between using a controlled or 
 * uncontrolled input element for the lifetime of the component.
 * More info: https://reactjs.org/Link/controlled-components
 */