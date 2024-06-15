import { combineReducers } from "redux";
import answersReducer from "./answersReducer";
import courseReducer from "./courseReducer";

export default combineReducers({
    answersReducer,
    courseReducer
})