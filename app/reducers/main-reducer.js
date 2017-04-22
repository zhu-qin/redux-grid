import { combineReducers } from 'redux'
import todosReducer from './todos-reducer'
import configReducer from './config-reducer'

export default combineReducers({
  config: configReducer,
  todos: todosReducer
})
