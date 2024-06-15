import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LessonTimer from '../LessonTimer/LessonTimer';

import styles from './LessonOneChoice.module.css'
import { setCorrectAnswer, setCountNumber, setIncorrectAnswer, setIsVisited, setLastAnswer, setTime } from '../../store/actions';
import LessonAlert from '../LessonAlert/LessonAlert';
import { questionTry } from '../../service/Lesson';

const LessonOneChoice = ({
    idQuestion,
    answerId,
    fileName,
    fileText,
    options,
    question,
    setDisableBtn,
    countMistakes,
    countCorrect,
    timerQuestion,
    handleTimerStop,
    timerOff
}) => {
    const dispatch = useDispatch()
    const storeData = useSelector(state => state.answersReducer)
    const [ableAnswer, setAbleAnswer] = useState(false)
    const [answer, setAnswer] = useState('')
    const [isCorrect, setIsCorrect] = useState(null)
    const [activeAlert, setActiveAlert] = useState(false)
    const [isCorrectAlert, setIsCorrectAlert] = useState(false)
    const [optionId, setOptionId] = useState()
    const [optionValue, setOptionValue] = useState()

    const setAnswers = (id, value) => {
        setOptionId(id)
        setOptionValue(value)
    }

    const checkAnswer = (id, answerQuest) => {
        const thisQuestionArray = storeData.filter(obj => obj.id === idQuestion);
        const thisQuestion = thisQuestionArray[0];

        if (thisQuestion && thisQuestion.tryNumber > 0) {
            if (id === answerId) {
                dispatch(setCorrectAnswer(idQuestion));
                setAbleAnswer(true);
                setIsCorrect(id)
                setAnswer(answerQuest)
                setDisableBtn(false)
                dispatch(setIsVisited(idQuestion))
                handleTimerStop(timerQuestion)
                setActiveAlert(true)
                setIsCorrectAlert(true)
                questionTry(idQuestion, answerQuest, true)
            } else {
                dispatch(setCountNumber(idQuestion));
                setAnswer(answerQuest)
                setIsCorrect(id)
                dispatch(setLastAnswer(idQuestion, id))
                setActiveAlert(true)
                setIsCorrectAlert(false)
                questionTry(idQuestion, answerQuest, false)
                if (thisQuestion.tryNumber - 1 === 0) {
                    dispatch(setIncorrectAnswer(idQuestion));
                    setAbleAnswer(true);
                    setDisableBtn(false)
                    dispatch(setIsVisited(idQuestion))
                    handleTimerStop(timerQuestion)
                    setIsCorrectAlert(false)
                    questionTry(idQuestion, answerQuest, false)
                }
            }
        } else {
            dispatch(setIncorrectAnswer(idQuestion));
            setAbleAnswer(true);
        }
    };

    useEffect(() => {
        const thisQuestionArray = storeData.filter(obj => obj.id === idQuestion);
        if (thisQuestionArray.length > 0 && thisQuestionArray[0].isCorrect === 'correct') {
            setIsCorrect(answerId);
            setAbleAnswer(true);
            setDisableBtn(false)
            let correctAnswer = options.filter(option => option.id == answerId)
            setAnswer(correctAnswer[0].value.slice(2, correctAnswer[0].value.length))
            setActiveAlert(true)
            setIsCorrectAlert(true)
        }else if(thisQuestionArray.length > 0 && thisQuestionArray[0].isCorrect === 'incorrect'){
            setIsCorrect(thisQuestionArray[0].lastAnswer)
            setDisableBtn(false)
            let correctAnswer = options.filter(option => option.id == thisQuestionArray[0].lastAnswer)
            if(correctAnswer.length > 0 && thisQuestionArray[0].lastAnswer > 0){
                setAnswer(correctAnswer[0].value.slice(2, correctAnswer[0].value.length))
            }
            setActiveAlert(true)
            setIsCorrectAlert(false)
        }
        
        if (thisQuestionArray.length > 0 && thisQuestionArray[0].isCorrect == ''){
            let correctAnswer = options.find(option => option.id == thisQuestionArray[0].lastAnswer)
            if (correctAnswer) {
                setIsCorrectAlert(correctAnswer.id == answerId)
                setAnswer(correctAnswer.value.slice(2));
                setIsCorrect(correctAnswer.id);
                setActiveAlert(true)
            }
        }

    }, [])

    useEffect(() => {
        const thisQuestionArray = storeData.filter(obj => obj.id === idQuestion);
        const thisQuestion = thisQuestionArray[0];

        if(thisQuestion && thisQuestion.timeStopped == 0 && timerQuestion == 0){
            dispatch(setIncorrectAnswer(idQuestion))
            handleTimerStop(0)
            setAbleAnswer(true)
            setDisableBtn(false)
            setActiveAlert(true)
            setIsCorrectAlert(false)
        }

        if(timerOff == false){
            setAbleAnswer(true)
            dispatch(setIsVisited(idQuestion))
        }
    }, [timerOff])

    const checkTimer = () => {
        const thisQuestionArray = storeData.filter(obj => obj.id === idQuestion);
        const thisQuestion = thisQuestionArray[0];

        if(!timerOff && thisQuestion && thisQuestion.timeStopped >= 0){
            return thisQuestion.timeStopped
        }

        return timerQuestion
    }

    return (
        <div className={styles.onechoice__container}>
            <div className={styles.lesson_oneshoice__title__timer_wrapper}>
                <h2 className={styles.lesson_oneshoice__title} dangerouslySetInnerHTML={{ __html: question }}></h2>
                
                <div className={styles.timer__answers_wrapper}>
                    <LessonTimer seconds={checkTimer()}/>
                    <div className={styles.correct__answers}>
                        <span>
                            {countCorrect}
                            <svg fillRule="evenodd" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M9.9999 19.6C15.3018 19.6 19.5999 15.302 19.5999 10C19.5999 4.69809 15.3018 0.400024 9.9999 0.400024C4.69797 0.400024 0.399902 4.69809 0.399902 10C0.399902 15.302 4.69797 19.6 9.9999 19.6ZM14.4484 8.44855C14.9171 7.97992 14.9171 7.22013 14.4484 6.7515C13.9798 6.28287 13.22 6.28287 12.7514 6.7515L8.7999 10.703L7.24843 9.1515C6.7798 8.68287 6.02 8.68287 5.55137 9.1515C5.08275 9.62013 5.08275 10.3799 5.55137 10.8486L7.95137 13.2486C8.42 13.7172 9.1798 13.7172 9.64843 13.2486L14.4484 8.44855Z" fill="#4CC38A"/>
                            </svg>
                        </span>
                        |
                        <span>
                            {countMistakes}
                            <svg fillRule="evenodd" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M11.9999 21.6C17.3018 21.6 21.5999 17.302 21.5999 12C21.5999 6.69809 17.3018 2.40002 11.9999 2.40002C6.69797 2.40002 2.3999 6.69809 2.3999 12C2.3999 17.302 6.69797 21.6 11.9999 21.6ZM10.4484 8.7515C9.9798 8.28287 9.22 8.28287 8.75137 8.7515C8.28275 9.22013 8.28275 9.97992 8.75137 10.4486L10.3028 12L8.75137 13.5515C8.28275 14.0201 8.28275 14.7799 8.75137 15.2486C9.22 15.7172 9.9798 15.7172 10.4484 15.2486L11.9999 13.6971L13.5514 15.2486C14.02 15.7172 14.7798 15.7172 15.2484 15.2486C15.7171 14.7799 15.7171 14.0201 15.2484 13.5515L13.697 12L15.2484 10.4486C15.7171 9.97992 15.7171 9.22013 15.2484 8.7515C14.7798 8.28287 14.02 8.28287 13.5514 8.7515L11.9999 10.303L10.4484 8.7515Z" fill="#F2555A"/>
                            </svg>

                        </span>
                    </div>
                </div>
            </div>

            <div className={styles.html__container}>
                <p className={styles.html__container_title}>
                    {/* <svg fillRule="evenodd" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.3335 15L18.3335 10L13.3335 5" stroke="#FF8B3E" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M6.6665 5L1.6665 10L6.6665 15" stroke="#FF8B3E" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg> */}
                    
                    <span>{fileName}</span>
                </p>

                <div className={styles.line}></div>

                <div className={styles.options__wrapper}>
                    <div className={styles.answers}>
                        <span>{fileText.slice(0, 7)}</span>
                        <span className={styles.answer_span}>{answer}</span>
                    </div>
                    {/* <div className={styles.option}>
                        <label htmlFor="">
                            <span style={{color: '#3C84CC'}}>
                                <span style={{color: '#A0A0A0'}}>
                                    {'</'}
                                </span>
                                {'h1'}
                                <span style={{color: '#A0A0A0'}}>
                                    {'>'}
                                </span>
                            </span>
                            Video games 
                            <span style={{color: '#3C84CC'}}>
                                <span style={{color: '#A0A0A0'}}>
                                    {'</'}
                                </span>
                                {'h1'}
                                <span style={{color: '#A0A0A0'}}>
                                    {'>'}
                                </span>
                            </span>
                        </label>
                    </div>

                    <div className={styles.option}>
                        <label htmlFor="">
                            <span style={{color: '#3C84CC'}}>
                                <span style={{color: '#A0A0A0'}}>
                                    {'</'}
                                </span>
                                {'h1'}
                                <span style={{color: '#A0A0A0'}}>
                                    {'>'}
                                </span>
                            </span>
                            Video games 
                            <span style={{color: '#3C84CC'}}>
                                <span style={{color: '#A0A0A0'}}>
                                    {'</'}
                                </span>
                                {'h1'}
                                <span style={{color: '#A0A0A0'}}>
                                    {'>'}
                                </span>
                            </span>
                        </label>
                    </div>

                    <div className={styles.option}>
                        <label htmlFor="">
                            <span style={{color: '#3C84CC'}}>
                                <span style={{color: '#A0A0A0'}}>
                                    {'</'}
                                </span>
                                {'h1'}
                                <span style={{color: '#A0A0A0'}}>
                                    {'>'}
                                </span>
                            </span>
                            Video games 
                            <span style={{color: '#3C84CC'}}>
                                <span style={{color: '#A0A0A0'}}>
                                    {'</'}
                                </span>
                                {'h1'}
                                <span style={{color: '#A0A0A0'}}>
                                    {'>'}
                                </span>
                            </span>
                        </label>
                    </div> */}
                </div>
            </div>

            <div className={styles.answers__wrapper}>
                {
                    options.map(option => (
                        <button 
                            key={option.id} 
                            onClick={() => setAnswers(option.id, option.value.slice(2, option.value.length))}
                            disabled={ableAnswer}
                            className={isCorrect == option.id ? (isCorrect == answerId ? styles.correct_btn : styles.incorrect_btn) : ''}
                        >
                            {/* <span>{option.value.slice(0, 2)}</span> */}
                            {option.value}
                        </button>
                    ))
                }
                {/* <button>
                    <span>1</span>
                    Option-1
                </button>
                <button>
                    <span>2</span>
                    Option-2
                </button>
                <button>
                    <span>3</span>
                    Option-3
                </button>
                <button>
                    <span>4</span>
                    Option-4
                </button>
                <button>
                    <span>5</span>
                    Option-5
                </button> */}
            </div>

            <button 
                className={styles.submit}
                disabled={ableAnswer} 
                onClick={() => checkAnswer(optionId, optionValue)}
            >
                Submit
            </button>

            <LessonAlert activeAlert={activeAlert} isCorrectAlert={isCorrectAlert}/>
        </div>
    )
}

export default LessonOneChoice;