import { CORRECT_ANSWER, COUNT_OF_TRY_NUMBER, INCORRECT_ANSWER, QUESTION_DONE, SELECTED_FILE, LAST_ANSWER, VISITED_STEP, SELECTED_DRAG, SET_TIME_STOPPED, SET_COURSE, RESET } from "../constants/actionTypes";

export const setDone = (id, type, isCorrect, isVisited) => ({
    type: QUESTION_DONE,
    payload: {
        id: id,
        type: type,
        isCorrect: isCorrect,
        isVisited: isVisited
    }
})

export const setSelectedFile = (id, type, tryNumber, isCorrect, lastAnswer, isVisited, timeStopped) => ({
    type: SELECTED_FILE,
    payload: {
        id: id,
        type: type,
        tryNumber: tryNumber,
        isCorrect: isCorrect,
        lastAnswer: lastAnswer,
        isVisited: isVisited,
        timeStopped: timeStopped
    }
})

export const setSelectedDrag = (id, type, tryNumber, isCorrect, lastAnswer, isVisited, timeStopped) => ({
    type: SELECTED_DRAG,
    payload: {
        id: id,
        type: type,
        tryNumber: tryNumber,
        isCorrect: isCorrect,
        lastAnswer: lastAnswer,
        isVisited: isVisited,
        timeStopped: timeStopped
    }
})


export const setCountNumber = (id) => ({
    type: COUNT_OF_TRY_NUMBER,
    payload: { id }
})

export const setCorrectAnswer = (id) => ({
    type: CORRECT_ANSWER,
    payload: { id }
})

export const setIncorrectAnswer = (id, lastAnswerId) => ({
    type: INCORRECT_ANSWER,
    payload: { id }
})

export const setLastAnswer = (id, lastAnswerId) => ({
    type: LAST_ANSWER,
    payload: { id, lastAnswerId}
})


export const setIsVisited = (id) => ({
    type: VISITED_STEP,
    payload: { id }
})

export const setTime = (id, time) => ({
    type: SET_TIME_STOPPED,
    payload: { id, time }
})

export const setCourse = (obj) => ({
    type: SET_COURSE,
    payload: obj
})

export const resettingLesson = () => ({
    type: RESET,
    payload: []
})