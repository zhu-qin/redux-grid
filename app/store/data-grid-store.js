import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import mainReducer from '../reducers/main-reducer'

let isPlainObject = function (obj) {
  if (obj && obj.__proto__.constructor === Object && !Array.isArray(obj)) {
    return true
  } else {
    return false
  }
}

let diffArray = function (arrayOne, arrayTwo) {
  let diff
  if (arrayOne.length != arrayTwo.length) {
    diff = [arrayOne, arrayTwo]
  } else {
    arrayOne.forEach((el, idx) => {
      if (el != arrayTwo[idx]) {
        diff = [arrayOne, arrayTwo]
      } else if (el === arrayTwo[idx] && isPlainObject(el)) {
        diff = diffPlainObject(el, arrayTwo[idx])
      }
    })
  }

  return diff
}

let diffPlainObject = function(objectOne, objectTwo) {
  let diff

  if (isPlainObject(objectOne) && isPlainObject(objectTwo)) {
    let objectOneKeys = Object.keys(objectOne)
    let objectTwoKeys = Object.keys(objectTwo)
    let oneWithMoreKeys = objectOneKeys.length >= objectTwoKeys.length ? objectOneKeys : objectTwoKeys

    oneWithMoreKeys.forEach((key) => {
      if (objectOne[key] != objectTwo[key]) {
        diff = [objectOne[key], objectTwo[key]]
      } else if (objectOne[key] === objectTwo[key] && Array.isArray(objectOne[key])) {
        diff = diffArray(objectOne[key], objectTwo[key])
      } else if (objectOne[key] === objectTwo[key] && isPlainObject(objectOne[key])) {
        diff = diffPlainObject(objectOne[key], objectTwo[key])
      }
    })
  }
  return diff
}

let logger = (store) => (next) => (action) => {
  let prevState = store.getState()
  next(action)
  let currentState = store.getState()
  console.log([action.type, Object.values(action), diffPlainObject(prevState, currentState)]);
}

export default createStore(mainReducer, {}, applyMiddleware(thunk, logger))
