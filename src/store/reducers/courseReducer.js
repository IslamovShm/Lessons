import { SET_COURSE } from "../constants/actionTypes";

const course = JSON.parse(localStorage.getItem('course'))
const initialState = course ? course : {}

const courseReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_COURSE:
            localStorage.setItem('course', JSON.stringify(action.payload))
            return {
                ...action.payload
            }
        default: 
            return state;
    }
}

export default courseReducer;
