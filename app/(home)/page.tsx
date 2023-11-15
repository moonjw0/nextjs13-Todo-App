import Image from 'next/image'
import styles from './page.module.css'
import TodayTodos from './TodayTodos/TodayTodos'

export default function Home() {
  return (
    <div className='TodayTodos'>
      <TodayTodos />
    </div>
  )
}
