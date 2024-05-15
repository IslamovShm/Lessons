
import styles from './LessonTimer.module.css'

const LessonTimer = () => {
    return (
        <div className={styles.timer__container}>
            <span>Timer:</span>
            <p>0h <span>:</span> 19m <span>:</span> 59s</p>
        </div>
    )
}

export default LessonTimer;