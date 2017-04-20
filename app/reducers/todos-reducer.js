export default function (state = ['hello'], action) {
  switch (action.type) {
    case 'ADD_TODO':

      return [
        ...state,
        action.todo
      ]

    case 'DELETE_TODO':

      let clone = Object.assign([], state)
      clone.splice(action.idx, 1)
      return clone

    default:

      return state

  }
}
