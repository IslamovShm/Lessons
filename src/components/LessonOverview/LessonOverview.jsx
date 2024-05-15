import styles from './LessonOverview.module.css'

const LessonOverview = ({
    lessonDescOverview,
    lessonDescOutcome,
    lessonImg
}) => {
    return (
        <>
            <h2 className={styles.overview__title}>Course Overview</h2>

            <div className={styles.overview__wrapper}>
                <div className={styles.overview__img}>
                    <img src={lessonImg} alt="overview" />
                </div>

                <div className={styles.overview__desc}>
                    <h3>Overview</h3>
                    <p>{lessonDescOverview}</p>
                    <h3>Outcome</h3>
                    <p>{lessonDescOutcome}</p>
                </div>
            </div>
        </>
    )
}


export default LessonOverview;