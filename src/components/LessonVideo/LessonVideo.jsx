
import styles from './LessonVideo.module.css'

const LessonVideo = ({ lessonImg }) => {
    return (
        <img className={styles.lesson__video} src={lessonImg} alt="video" />
    )
}

export default LessonVideo;