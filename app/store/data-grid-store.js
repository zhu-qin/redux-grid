import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import mainReducer from '../reducers/main-reducer'
import logger from './diff-state-middleware'


export default createStore(mainReducer, {}, applyMiddleware(thunk, logger))
