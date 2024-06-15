import { useEffect, useState, useRef } from 'react';
import cn from 'classnames'
import { useDispatch, useSelector } from 'react-redux'

import { resettingLesson, setDone, setSelectedDrag, setSelectedFile, setTime } from '../../store/actions'
import LessonOverview from '../../components/LessonOverview/LessonOverview';
import LessonVideo from '../../components/LessonVideo/LessonVideo';

import styles from './Lessons.module.css'
import LessonMultipleChoice from '../../components/LessonMultipleChoice/LessonMultipleChoice';
import LessonInput from '../../components/LessonInput/LessonInput';
import LessonOneChoice from '../../components/LessonOneChoice/LessonOneChoice';
import LessonUpload from '../../components/LessonUpload/LessonUpload';
import LessonComplete from '../../components/LessonComplete/LessonComplete';
import { event_log, getQuestion } from '../../service/Lesson';
import { useParams } from 'react-router-dom';


const Lessons = () => {
    const [dataQuestions, setDataQuestions] = useState([])
    const [currentstep, setCurrentStep] = useState()
    const [isComplete, setIsComplete] = useState(0)
    const [isVideo, setIsVideo] = useState(false)
    const [IsCompleteLesson, setIsCompleteLesson] = useState(false)
    const [disableBtn, setDisableBtn] = useState(true)
    const [initializedSteps, setInitializedSteps] = useState(new Set())

    const [timeLeft, setTimeLeft] = useState(0);
    const intervalIdRef = useRef(null);
    const [isTimerRunning, setIsTimerRunning] = useState(true)
    const [mapOfTimerRuning, setMapOfTimerRuning] = useState(new Map())

    const dispatch = useDispatch()

    const storeData = useSelector(state => state.answersReducer)

    const { id } = useParams()

    const handleStepChange = (step, direction) => {
        if(direction == 'Previous'){
            event_log('prev_question', null)
        }else if(direction == 'Next'){
            event_log('next_question', null)
        }

        if(step > dataQuestions.length){
            setIsCompleteLesson(!IsCompleteLesson)
            event_log('module_completed', null)
        }


        setCurrentStep(step);
        setIsVideo(dataQuestions[step - 1]?.type === 'video');
    }

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                let dataquest = await getQuestion(id);
                setDataQuestions(dataquest)
                setCurrentStep(1)
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchQuestions()
        dispatch(resettingLesson())
    }, [id])

    const timerGo = () => {
        if (!intervalIdRef.current) {
            intervalIdRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                  if(!isTimerRunning){
                    return prev
                  }else if (prev <= 1) {
                    console.log(prev)
                    setMapOfTimerRuning(prevmap => {
                        const newMap = new Map(prevmap)
                        newMap.set(dataQuestions[currentstep - 1].id, false)
                        return newMap
                    })
                    clearInterval(intervalIdRef.current)
                    intervalIdRef.current = null
                    return 0
                  }
                  return prev - 1
                })
              }, 1000)
        }
    }

    useEffect(() => {
        if(dataQuestions.length > 0){
            if(!mapOfTimerRuning.get(dataQuestions[currentstep - 1].id)){
                clearInterval(intervalIdRef.current)
                intervalIdRef.current = null
                return
            }
        }
    }, [mapOfTimerRuning])

    useEffect(() => {
        if(dataQuestions.length > 0){
            if(dataQuestions[currentstep - 1]?.type === 'video' || 
               dataQuestions[currentstep - 1]?.type === 'info'){
                setDisableBtn(false)
                dispatch(setDone(dataQuestions[currentstep - 1].id, dataQuestions[currentstep - 1].type, 'correct', true))
            }else{
                setDisableBtn(true)
            }

            if(dataQuestions[currentstep - 1]?.type !== 'video' && 
                dataQuestions[currentstep - 1]?.type !== 'info'){
                if(dataQuestions[currentstep - 1] && !mapOfTimerRuning.has(dataQuestions[currentstep - 1].id) ){
                    setMapOfTimerRuning(prevmap => {
                        const newMap = new Map(prevmap)
                        newMap.set(dataQuestions[currentstep - 1].id, true)
                        return newMap
                    })
                    timerGo()
                }
            }

            if(dataQuestions[currentstep - 1]?.type === 'selected-file'){
                dispatch(setSelectedFile(dataQuestions[currentstep - 1].id, dataQuestions[currentstep - 1].type, parseInt(dataQuestions[currentstep - 1].try_number), '', 0, false, 0))
            }

            if(dataQuestions[currentstep - 1]?.type == 'selected-drag'){
                dispatch(setSelectedDrag(dataQuestions[currentstep - 1].id, dataQuestions[currentstep - 1].type, parseInt(dataQuestions[currentstep - 1].try_number), '', '', false, 0))
            }

            setIsComplete(storeData.filter(obj => obj.isCorrect == 'correct').length)
        }
    }, [currentstep, dataQuestions, dispatch])


    useEffect(() => {
        if (timeLeft <= 0){
            clearInterval(intervalIdRef.current)
        }
    }, [timeLeft])

    useEffect(() => {
        if (dataQuestions.length > 0 && dataQuestions[currentstep - 1]) {
            
            const currentQuestion = dataQuestions[currentstep - 1];
            if (currentQuestion?.type !== 'info' && currentQuestion?.type !== 'video' && !initializedSteps.has(currentQuestion.id)) {
                setTimeLeft(10);
                setInitializedSteps(prev => new Set(prev).add(currentQuestion.id))
                setIsTimerRunning(true)
            }
        }
    }, [currentstep, dataQuestions, initializedSteps]);

    const handleTimerStop = (time) => {
        setMapOfTimerRuning(prevmap => {
            const newMap = new Map(prevmap)
            newMap.set(dataQuestions[currentstep - 1].id, false)
            return newMap
        })
        dispatch(setTime(dataQuestions[currentstep - 1].id, time));
    }

    console.log(dataQuestions)
    return (
        <div className={styles.container}>
            <h1 className={styles.lesson__title}>Front-end Basics</h1>

            {
                !IsCompleteLesson ? 
                (<>
                    <div className={styles.allex__wrapper}>
                        <div className={styles.stepper}>
                            {
                                dataQuestions.map((question, index) => (
                                    <div key={question.id} className={`${styles.step} ${
                                            storeData[index] && storeData[index].isVisited  ? styles.complete : ''
                                        } ${currentstep === index + 1 ? styles.active : ''}`}
                                    >

                                    </div>
                                ))
                            }
                        </div>

                        <p className={styles.lesson__currentpage}>{currentstep}/{dataQuestions.length}</p>
                    </div>


                    <div className={cn(styles.questions__container, {[styles.questions__container_video]: isVideo})} style={isVideo ? {padding: '0px', border: 'none'} : {padding: '32px'}}>
                        {
                            dataQuestions.map((dataQuestion, index) => {
                                if(index+1 == currentstep){
                                    switch (dataQuestion.type) {
                                        case 'info':
                                            return (
                                                <LessonOverview 
                                                    key={dataQuestion.id}
                                                    id={dataQuestion.id}
                                                    question={dataQuestion.question}
                                                />
                                            )
                                        case 'video':
                                            return (
                                                <LessonVideo
                                                    key={dataQuestion.id} 
                                                    video={dataQuestion.other.video}
                                                    id={dataQuestion.id}
                                                />
                                            )
                                        case 'selected-file':
                                            return(
                                                <LessonOneChoice 
                                                    key={dataQuestion.id}
                                                    idQuestion={dataQuestion.id}
                                                    answerId={dataQuestion.other.answer_id}
                                                    fileName={dataQuestion.other.file_name}
                                                    fileText={dataQuestion.other.file_text}
                                                    options={dataQuestion.other.options}
                                                    question={dataQuestion.question}
                                                    setDisableBtn={setDisableBtn}
                                                    countMistakes={storeData.filter(obj => obj.isCorrect == 'incorrect').length}
                                                    countCorrect={isComplete}
                                                    timerQuestion={timeLeft}
                                                    handleTimerStop={handleTimerStop}
                                                    timerOff={mapOfTimerRuning.get(dataQuestions[currentstep - 1].id)}
                                                />
                                            )
                                        case 'selected-drag':
                                            return (
                                                <LessonInput
                                                    key={dataQuestion.id}
                                                    idQuestion={dataQuestion.id}
                                                    answerValue={dataQuestion.other.answer}
                                                    fileName={dataQuestion.other.file_name}
                                                    fileText={dataQuestion.other.file_text}
                                                    options={dataQuestion.other.options}
                                                    question={dataQuestion.question}
                                                    setDisableBtn={setDisableBtn}
                                                    countMistakes={storeData.filter(obj => obj.isCorrect == 'incorrect').length}
                                                    countCorrect={isComplete}
                                                    timerQuestion={timeLeft}
                                                    handleTimerStop={handleTimerStop}
                                                    timerOff={mapOfTimerRuning.get(dataQuestions[currentstep - 1].id)}
                                                />
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
                            onClick={() => handleStepChange(currentstep - 1, 'Previous')}
                        >
                            Previous
                        </button>

                        <button 
                            className={styles.overview__btn_next} 
                            onClick={() => handleStepChange(currentstep + 1, 'Next')}
                            disabled={disableBtn}
                        >
                            {
                                currentstep + 1 > dataQuestions.length ? 'Finish' : 'Next'
                            }
                        </button>

                    </div>
                </>) :
                (
                    <LessonComplete progress={isComplete * 100 / dataQuestions.length} questions={dataQuestions.length}/>
                )
                
            }

        </div>
    )
}

export default Lessons;