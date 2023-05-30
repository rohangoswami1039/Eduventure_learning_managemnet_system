import { USER_CLASSROOM_STATE_CHANGE, USER_POST_STATE_CHANGE, USER_STATE_CHANGE } from "../constant"

const initialState={
    currentUser:null,
    classrooms:[],
    assignment:[],


}
export const user =(state=initialState,action)=>{
    switch(action.type){
        case USER_STATE_CHANGE:
            return {
                ...state,
                currentUser:action.currentUser
            }
        case USER_CLASSROOM_STATE_CHANGE:
            return {
                ...state,
                classrooms:action.classroom
            }
        
        default :
            return state ;
    }
   
}