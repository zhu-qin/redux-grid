import store from '../store/data-grid-store'

let dispatch = store.dispatch

export function addTodo(todo) {
    dispatch({
      type: 'ADD_TODO',
      todo: todo
    })
}

export function deleteTodo(idx, todo) {
  dispatch({
    type: 'DELETE_TODO',
    idx: idx,
    todo: todo
  })
}
