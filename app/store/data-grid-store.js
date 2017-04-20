import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import mainReducer from '../reducers/main-reducer'


let logger = (store) => (next) => (action) => {
  let prevState = store.getState()
  next(action)
  let currentState = store.getState()
  console.log([prevState, currentState]);
}

export default createStore(mainReducer, {}, applyMiddleware(thunk, logger))
