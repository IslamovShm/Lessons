import { CORRECT_ANSWER, COUNT_OF_TRY_NUMBER, INCORRECT_ANSWER, LAST_ANSWER, QUESTION_DONE, SELECTED_DRAG, SELECTED_FILE, SET_TIME_STOPPED, RESET, VISITED_STEP } from "../constants/actionTypes";

const initialState = []

const answersReducer = (state = initialState, action) => {
    switch (action.type) {
        case QUESTION_DONE: 
            if(!state.some(obj => obj.id === action.payload.id)){
                return [...state, action.payload]
            } else {
                return state
            }
        case SELECTED_FILE:
            if(!state.some(obj => obj.id === action.payload.id)){
                return [...state, action.payload]
            } else {
                return state
            }
        case SELECTED_DRAG:
            if(!state.some(obj => obj.id === action.payload.id)){
                return [...state, action.payload]
            } else {
                return state
            }
        case COUNT_OF_TRY_NUMBER: 
            return state.map(obj => {
                if(obj.id === action.payload.id){
                    return {...obj, tryNumber: obj.tryNumber - 1}
                }
                return obj
            });
        case CORRECT_ANSWER: 
            return state.map(obj => {
                if(obj.id === action.payload.id){
                    return {...obj, isCorrect: 'correct'}
                }
                return obj
            });
        case INCORRECT_ANSWER: 
            return state.map(obj => {
                if(obj.id === action.payload.id){
                    return {...obj, isCorrect: 'incorrect'}
                }
                return obj
            });
        case LAST_ANSWER: 
            return state.map(obj => {
                if(obj.id === action.payload.id){
                    return {...obj, lastAnswer: action.payload.lastAnswerId}
                }
                return obj
            });
        case VISITED_STEP: 
            return state.map(obj => {
                if(obj.id === action.payload.id){
                    return {...obj, isVisited: true}
                }
                return obj
            });
        case SET_TIME_STOPPED:
            return state.map(obj => {
                if(obj.id === action.payload.id){
                    return {...obj, timeStopped: action.payload.time}
                }
                return obj
            });
        case RESET:
            console.log('reseted')
            return action.payload
            
        default: 
            return state;
    }
}

export default answersReducer;
