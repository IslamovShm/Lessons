
import { useEffect, useRef, useState } from 'react'
import styles from './LessonTimer.module.css'

const formatTime = (time) => {
    let minutes = Math.floor(time / 60)
    let seconds = Math.floor(time - minutes * 60)

    if(minutes <= 10) minutes - '0' + minutes
    if(seconds <= 10) seconds - '0' + seconds

    return minutes + ':' + seconds
}

const LessonTimer = ({ seconds }) => {
    // const [countdown, setCountDown] = useState(seconds)
    // const timerId = useRef()

    // useEffect(() => {
    //     timerId.current = setInterval(() => {
    //         setCountDown(prev => prev -1)
    //     }, 1000)
    //     return () => clearInterval(timerId.current)
    // }, [])

    // useEffect(() => {
    //     if (countdown <= 0){
    //         clearInterval(timerId.current)
    //     }
    // }, [countdown])
    return (
        <div className={styles.timer__container}>
            <span>Timer:</span>
            <p>{formatTime(seconds)}</p>
        </div>
    )
}

export default LessonTimer;