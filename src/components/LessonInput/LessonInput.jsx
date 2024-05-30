import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import LessonTimer from '../LessonTimer/LessonTimer';
import { setCorrectAnswer, setCountNumber, setIncorrectAnswer, setIsVisited, setLastAnswer } from '../../store/actions';

import styles from './LessonInput.module.css'
import LessonAlert from '../LessonAlert/LessonAlert';
import { questionTry } from '../../service/Lesson';

const LessonInput = ({
    idQuestion,
    answerValue,
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
    const [widthInput, setWidthInput] = useState(48)
    const [activeAlert, setActiveAlert] = useState(false)
    const [isCorrectAlert, setIsCorrectAlert] = useState(false)

    const checkAnswer = (answerQuest) => {
        const thisQuestionArray = storeData.filter(obj => obj.id === idQuestion);
        const thisQuestion = thisQuestionArray[0];

        if (thisQuestion && thisQuestion.tryNumber > 0) {
            if (answerQuest === answerValue.slice(3, answerValue.length)) {
                dispatch(setCorrectAnswer(idQuestion));
                setAbleAnswer(true);
                setIsCorrect(answerQuest)
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
                setIsCorrect(answerQuest)
                dispatch(setLastAnswer(idQuestion, answerQuest))
                setActiveAlert(true)
                setIsCorrectAlert(false)
                questionTry(idQuestion, answerQuest, false)
                if (thisQuestion.tryNumber - 1 === 0) {
                    dispatch(setIncorrectAnswer(idQuestion))
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
            setIsCorrect(answerValue.slice(3, answerValue.length))
            setAbleAnswer(true);
            setDisableBtn(false)
            handleChange(answerValue.slice(3, answerValue.length))
            setActiveAlert(true)
            setIsCorrectAlert(true)
        }else if(thisQuestionArray.length > 0 && thisQuestionArray[0].isCorrect === 'incorrect'){
            setIsCorrect(thisQuestionArray[0].lastAnswer)
            setDisableBtn(false)
            handleChange(thisQuestionArray[0].lastAnswer)
            setActiveAlert(true)
            setIsCorrectAlert(false)
        }

        if(thisQuestionArray.length > 0 && thisQuestionArray[0].isCorrect == '' && thisQuestionArray[0].lastAnswer.length > 0){
            handleChange(thisQuestionArray[0].lastAnswer)
            setIsCorrect(thisQuestionArray[0].lastAnswer)
            setActiveAlert(true)
            setIsCorrectAlert(answerValue.slice(3) == thisQuestionArray[0].lastAnswer)
        }
    }, [storeData, idQuestion, answerValue, isCorrect])

    const handleChange = (event) => {
        const value = event.target?.value ?? event
        setWidthInput(`${48 + (value.length * (30 / 2)) / 2}`);
        setAnswer(value);
    }

    const checkTimer = () => {
        const thisQuestionArray = storeData.filter(obj => obj.id === idQuestion);
        const thisQuestion = thisQuestionArray[0];

        if(!timerOff && thisQuestion && thisQuestion.timeStopped >= 0){
            return thisQuestion.timeStopped
        }

        return timerQuestion
    }

    useEffect(() => {
        const thisQuestionArray = storeData.filter(obj => obj.id === idQuestion);
        const thisQuestion = thisQuestionArray[0];

        if(thisQuestion && thisQuestion.timeStopped == 0 && timerQuestion == 0){
            dispatch(setIncorrectAnswer(idQuestion))
            setIsCorrect(answerValue.slice(3, answerValue.length))
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


    return (
        <div className={styles.lesson_input__container}>
            <div className={styles.lesson_input__title__timer_wrapper}>
                <h2 className={styles.lesson_input__title} dangerouslySetInnerHTML={{ __html: question }}></h2>
                
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
                    <div className={styles.option}>
                        <span dangerouslySetInnerHTML={{ __html: fileText }}></span>
                        <input
                            style={{width: `${widthInput}px`}}
                            type="text" 
                            value={answer} 
                            disabled={ableAnswer} 
                            onChange={(event) => handleChange(event)}
                        />
                    </div>
                    {/* <div className={styles.option}>
                        <input type="text" />
                        <label htmlFor="">Video games 
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
                        <input type="text" />
                        <label htmlFor="">Video games 
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
                        <input type="text" />
                        <label htmlFor="">Video games 
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

                <div className={styles.line}></div>

                <div className={styles.controllers}>
                    <div className={styles.btns__wrapper}>
                        <button type='button'>
                            <svg fillRule="evenodd" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 12C21 9.61305 20.0518 7.32387 18.364 5.63604C16.6761 3.94821 14.3869 3 12 3C9.48395 3.00947 7.06897 3.99122 5.26 5.74L3 8" stroke="#161616" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M3 3V8H8" stroke="#161616" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M3 12C3 14.3869 3.94821 16.6761 5.63604 18.364C7.32387 20.0518 9.61305 21 12 21C14.516 20.9905 16.931 20.0088 18.74 18.26L21 16" stroke="#161616" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M16 16H21V21" stroke="#161616" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                        <button type='button'>
                            <svg fillRule="evenodd" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 5H9L2 12L9 19H20C20.5304 19 21.0391 18.7893 21.4142 18.4142C21.7893 18.0391 22 17.5304 22 17V7C22 6.46957 21.7893 5.96086 21.4142 5.58579C21.0391 5.21071 20.5304 5 20 5Z" stroke="#161616" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M18 9L12 15" stroke="#161616" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M12 9L18 15" stroke="#161616" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </div>

                    <button 
                        className={styles.controllers__run}
                        onClick={() => checkAnswer(answer)}
                        disabled={ableAnswer} 
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 3L19 12L5 21V3Z" fill="white"/>
                        </svg>
                        RUN
                    </button>
                </div>
            </div>

            <div className={styles.answers__wrapper}>
                {
                    options.map(option => (
                        <button 
                            key={option.id} 
                            disabled={ableAnswer} 
                            onClick={() => handleChange(option.value.slice(3, option.value.length))}
                            className={isCorrect == option.value.slice(3, option.value.length) ? (isCorrect == answerValue.slice(3, answerValue.length) ? styles.correct_btn : styles.incorrect_btn) : ''}
                        >
                            {option.value.slice(2, option.value.length)}
                        </button>
                    ))
                }
                {/* <button>{'<h3>'}</button>
                <button>{'<h2>'}</button>
                <button>{'<h4>'}</button>
                <button>{'<h1>'}</button>
                <button>{'<h2>'}</button> */}
            </div>

            <LessonAlert activeAlert={activeAlert} isCorrectAlert={isCorrectAlert}/>
        </div>
    )
}

export default LessonInput;