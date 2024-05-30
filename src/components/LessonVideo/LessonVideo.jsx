import poster from '../../assets/video.png'

import styles from './LessonVideo.module.css'

const LessonVideo = ({ video }) => {
    return (
            <video className={styles.lesson__video} controls poster={poster}>
                <source src='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'/>
            </video>
    )
}

export default LessonVideo;