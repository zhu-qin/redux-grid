let isPlainObject = function (obj) {
  if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
    return true
  } else {
    return false
  }
}

let diffArray = function (arrayOne, arrayTwo) {
  let diffs = {}
  if (arrayOne.length != arrayTwo.length) {
    diffs['diffLen'] = [arrayOne, arrayTwo]
  } else {
    arrayOne.forEach((el, idx) => {
      if (el != arrayTwo[idx]) {
        diffs[idx] = [arrayOne, arrayTwo]
      } else if (el === arrayTwo[idx] && isPlainObject(el)) {
        diffs[idx] = diffPlainObject(el, arrayTwo[idx])
      }
    })
  }

  return diffs
}

let diffPlainObject = function(objectOne, objectTwo) {
  let diffs = {}
  if (isPlainObject(objectOne) && isPlainObject(objectTwo)) {
    let objectOneKeys = Object.keys(objectOne)
    let objectTwoKeys = Object.keys(objectTwo)
    let oneWithMoreKeys = objectOneKeys.length >= objectTwoKeys.length ? objectOneKeys : objectTwoKeys

    oneWithMoreKeys.forEach((key) => {
      if (objectOne[key] != objectTwo[key]) {
        diffs[key] = [objectOne[key], objectTwo[key]]
      } else if (objectOne[key] === objectTwo[key] && Array.isArray(objectOne[key])) {
        let arrayDiff = diffArray(objectOne[key], objectTwo[key])
        if (Object.keys(arrayDiff).length > 0) {
          diffs[key] = arrayDiff
        }
      } else if (objectOne[key] === objectTwo[key] && isPlainObject(objectOne[key])) {
        let plainDiff = diffPlainObject(objectOne[key], objectTwo[key])
        if (Object.keys(plainDiff).length > 0) {
          diffs[key] = plainDiff
        }
      }
    })
  }

  return diffs
}

const logger = (store) => (next) => (action) => {
  let prevState = store.getState()
  next(action)
  let currentState = store.getState()
  let diff = diffPlainObject(prevState, currentState)
  console.log([action.type, action, diff]);
}

export default logger
