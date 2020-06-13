import { SAVE_TIME_TABLE } from '../../action/addTimeTable/addTimeTable';


const initState = {
    dataTimeTable: [] 
}

const TimeTableReducer = (state = initState, action) => {
    switch(action.type) {
        case SAVE_TIME_TABLE:
            return {
                ...state,
                dataTimeTable : action.dataTimeTable
            }
        default:
            return state; 
    }
}

export default TimeTableReducer;