import { createStore, applyMiddleware } from 'redux'
import mainReducer from '../reducers/main-reducer'

// middlewares
import thunk from 'redux-thunk'
import logger from './middlewares/diff-state-middleware'

//actions


const devMiddleWare = function (configuredState) {
  if (configuredState.config.ENV && configuredState.config.ENV === 'DEV') {
    return [thunk, logger]
  } else {
    return [thunk]
  }
}

const configureStore = (configuredState) => {
  return createStore(mainReducer, configuredState, applyMiddleware(...devMiddleWare(configuredState)))
}

export default configureStore
