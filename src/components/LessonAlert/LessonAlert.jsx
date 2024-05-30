import cn from 'classnames'
import styles from './LessonAlert.module.css'

const LessonAlert = ({
    activeAlert,
    isCorrectAlert
}) => {
    return (
        <div className={cn(styles.alert, `${activeAlert ? styles.alert__show : styles.alert__hide}`, `${isCorrectAlert ? styles.correct : styles.incorrect}`)}>
            {
                isCorrectAlert == true ? (
                    <>
                        <svg width="22" height="36" viewBox="0 0 22 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.0002 8.83325C5.94016 8.83325 1.8335 12.9399 1.8335 17.9999C1.8335 23.0599 5.94016 27.1666 11.0002 27.1666C16.0602 27.1666 20.1668 23.0599 20.1668 17.9999C20.1668 12.9399 16.0602 8.83325 11.0002 8.83325ZM11.0002 25.3333C6.95766 25.3333 3.66683 22.0424 3.66683 17.9999C3.66683 13.9574 6.95766 10.6666 11.0002 10.6666C15.0427 10.6666 18.3335 13.9574 18.3335 17.9999C18.3335 22.0424 15.0427 25.3333 11.0002 25.3333ZM15.2077 13.9483L9.16683 19.9891L6.79266 17.6241L5.50016 18.9166L9.16683 22.5833L16.5002 15.2499L15.2077 13.9483Z" fill="white"/>
                        </svg>

                        <p>Correct answer!</p>
                    </>
                ) : 
                <>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.0835 13.7502H11.9168V15.5835H10.0835V13.7502ZM10.0835 6.41683H11.9168V11.9168H10.0835V6.41683ZM10.991 1.8335C5.931 1.8335 1.8335 5.94016 1.8335 11.0002C1.8335 16.0602 5.931 20.1668 10.991 20.1668C16.0602 20.1668 20.1668 16.0602 20.1668 11.0002C20.1668 5.94016 16.0602 1.8335 10.991 1.8335ZM11.0002 18.3335C6.9485 18.3335 3.66683 15.0518 3.66683 11.0002C3.66683 6.9485 6.9485 3.66683 11.0002 3.66683C15.0518 3.66683 18.3335 6.9485 18.3335 11.0002C18.3335 15.0518 15.0518 18.3335 11.0002 18.3335Z" fill="white"/>
                    </svg>

                    <p>Wrong answer! Reminder: Please pay attention</p>
                </>
            }
        </div>
    )
}

export default LessonAlert;