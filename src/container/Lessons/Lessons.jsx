import { useState } from 'react';
import questions from '../../data';

import LessonOverview from '../../components/LessonOverview/LessonOverview';
import LessonVideo from '../../components/LessonVideo/LessonVideo';

import styles from './Lessons.module.css'
import LessonMultipleChoice from '../../components/LessonMultipleChoice/LessonMultipleChoice';
import LessonInput from '../../components/LessonInput/LessonInput';
import LessonOneChoice from '../../components/LessonOneChoice/LessonOneChoice';
import LessonUpload from '../../components/LessonUpload/LessonUpload';
import LessonComplete from '../../components/LessonComplete/LessonComplete';

const Lessons = () => {
    const [currentstep, setCurrentStep] = useState(1)
    const [isComplete, setIsComplete] = useState(false)
    const [isVideo, setIsVideo] = useState(false)
    const [IsCompleteLesson, setIsCompleteLesson] = useState(false)

    const handleStepChange = (step) => {
        if(step > questions.length){
            setIsCompleteLesson(!IsCompleteLesson)
        }
        setCurrentStep(step);
        setIsVideo(questions[step - 1]?.lessonType === 'Video Lesson');
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.lesson__title}>Front-end Basics</h1>

            {
                !IsCompleteLesson ? 
                (<>
                    <div className={styles.allex__wrapper}>
                        <div className={styles.stepper}>
                            {
                                questions.map((question, index) => (
                                    <div key={question.lessonType} className={`${styles.step} ${
                                            currentstep > index+1 || isComplete ? styles.complete : ''
                                        } ${currentstep === index + 1 ? styles.active : ''}`}
                                    >

                                    </div>
                                ))
                            }
                        </div>

                        <p className={styles.lesson__currentpage}>{currentstep}/{questions.length}</p>
                    </div>


                    <div className={styles.questions__container} style={isVideo ? {padding: '0px', border: 'none'} : {padding: '32px'}}>
                        {
                            questions.map((question, index) => {
                                if(index+1 == currentstep){
                                    switch (question.lessonType) {
                                        case 'Overview':
                                            return (
                                                <LessonOverview 
                                                    key={index}
                                                    lessonDescOverview={question.lessonDescOverview}
                                                    lessonDescOutcome={question.lessonDescOutcome}
                                                    lessonImg={question.lessonImg}
                                                />
                                            )
                                        case 'Video Lesson':
                                            return(
                                                <LessonVideo 
                                                    key={index}
                                                    lessonImg={question.lessonImg}
                                                />
                                            )
                                        case 'Test - multiple choice':
                                            return(
                                                <LessonMultipleChoice 
                                                    key={index}
                                                    question={question.question}
                                                    answerOptions={question.answerOptions}
                                                    correctAnswer={question.correctAnswer}
                                                />
                                            )
                                        case 'input' :
                                            return(
                                                <LessonInput key={question.lessonType} />
                                            )
                                        case 'Test - one choice' : 
                                            return(
                                                <LessonOneChoice key={question.lessonType} />
                                            )
                                        case 'upload file' : 
                                            return(
                                                <LessonUpload key={question.lessonType} />
                                            )
                                        default:
                                            return null;
                                    }
                                }
                            })
                        }
                    </div>

                    <div className={styles.overview__buttons}>

                        <button 
                            className={styles.overview__btn_prev} 
                            style={ currentstep - 1 == 0 ? {display: 'none'} : {display: 'inline-block'}}
                            onClick={() => handleStepChange(currentstep - 1)}
                        >
                            Previous
                        </button>

                        <button 
                            className={styles.overview__btn_next} 
                            onClick={() => handleStepChange(currentstep + 1)}
                        >
                            {
                                currentstep + 1 > questions.length ? 'Finish' : 'Next'
                            }
                        </button>

                    </div>
                </>) :
                (<LessonComplete progress={99} questions={questions.length}/>)
                
            }

        </div>
    )
}

export default Lessons;