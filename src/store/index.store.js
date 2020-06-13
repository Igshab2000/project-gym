import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { reducer as formReducer } from "redux-form";
import  UserSaveReducer  from './reducer/user/user';
import GymReducer from './reducer/gym/gym';
import TrainersReducer from './reducer/trainers/trainers';
import SubscriotionReducer from './reducer/subscription/subscription';
import TimeTableReducer from './reducer/timeTable/timeTable';
import thunk from 'redux-thunk';

const reducer = combineReducers({
    userSave: UserSaveReducer,
    gym: GymReducer,
    trainers: TrainersReducer,
    subscription: SubscriotionReducer,
    timeTable: TimeTableReducer,
    form: formReducer
});

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;

const store = createStore(reducer, composeEnhancers(
    applyMiddleware(thunk)
));

export default store;

