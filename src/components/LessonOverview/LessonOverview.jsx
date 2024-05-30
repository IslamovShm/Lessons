import styles from './LessonOverview.module.css'
import lessonImg from '../../assets/imglesson.png'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setIsVisited } from '../../store/actions'

const LessonOverview = ({
    question,
    id
}) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setIsVisited(id))
    }, [])
    return (
        <>
            <h2 className={styles.overview__title}>Course Overview</h2>

            <div className={styles.overview__wrapper}>
                {/* <div className={styles.overview__img}>
                    <img src={lessonImg} alt="overview" />
                </div> */}

                <div className={styles.overview__desc}>
                    <p dangerouslySetInnerHTML={{ __html: question }}></p>
                </div>
            </div>
        </>
    )
}


export default LessonOverview;