import { SAVE } from '../../action/save/save';


const initState = {
    user: {}
}

const UserSaveReducer = (state = initState, action) => {
    switch(action.type) {
        case SAVE: 
            return {
                ...state,
                user: action.payload
            }
        default:
            return state
    }
}

export default UserSaveReducer;