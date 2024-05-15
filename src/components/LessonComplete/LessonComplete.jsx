import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import styles from './LessonComplete.module.css'

const LessonComplete = ({ progress, questions }) => {

    return(
        <div className={styles.lesson__complete_container}>
            <div className={styles.allEx__wrapper}>
                <div className={styles.done}></div>
                <div className={styles.count__ex}>{questions} / {questions}</div>
            </div>
    
            <div className={styles.progress__block}>
                <h2>Session completed!</h2>
                <p>One step closer to reaching your daily goal Keep it up!</p>
                <div className={styles.progress}>
                    <CircularProgressbar
                        value={progress}
                        circleRatio={0.7}
                        strokeWidth={3}
                        styles={{
                            trail: {
                                strokeLinecap: 'round',
                                transform: 'rotate(-126deg)',
                                transformOrigin: 'center center'
                            },
                            path: {
                                strokeLinecap: 'round',
                                transform: 'rotate(-126deg)',
                                transformOrigin: 'center center',
                                stroke: '#63C174'
                            },
                        }}
                    />
                    <p>
                        <span className={styles.progress_count}>{progress}</span>
                        <span className={styles.progress__all}>/ 100</span>
                    </p>
                </div>
                <p className={styles.daily__goal}>daily goal</p>

                <div className={styles.earned_coins}>
                    <span>
                        <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.08366 12.5833C7.63619 12.5833 8.1661 12.3638 8.5568 11.9731C8.9475 11.5824 9.16699 11.0525 9.16699 10.5C9.16699 9.35 8.75033 8.83333 8.33366 8C7.44033 6.21417 8.14699 4.62167 10.0003 3C10.417 5.08333 11.667 7.08333 13.3337 8.41667C15.0003 9.75 15.8337 11.3333 15.8337 13C15.8337 13.766 15.6828 14.5246 15.3896 15.2323C15.0965 15.9401 14.6668 16.5831 14.1251 17.1248C13.5834 17.6665 12.9404 18.0961 12.2326 18.3893C11.5249 18.6824 10.7664 18.8333 10.0003 18.8333C9.23428 18.8333 8.47574 18.6824 7.76801 18.3893C7.06027 18.0961 6.41721 17.6665 5.87554 17.1248C5.33386 16.5831 4.90418 15.9401 4.61103 15.2323C4.31788 14.5246 4.16699 13.766 4.16699 13C4.16699 12.0392 4.52783 11.0883 5.00033 10.5C5.00033 11.0525 5.21982 11.5824 5.61052 11.9731C6.00122 12.3638 6.53112 12.5833 7.08366 12.5833Z" stroke="#FF8B3E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        EARNED
                    </span>
                    <span>
                        9 COINS
                    </span>
                </div>

                <button type='button' className={styles.continue}>Continue</button>
            </div>
        </div>
    )
}

export default LessonComplete;