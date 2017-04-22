export function addTodo(todo) {
    return {
      type: 'ADD_TODO',
      todo: todo
    }
}

export function deleteTodo(idx, todo) {
    return {
      type: 'DELETE_TODO',
      idx: idx,
      todo: todo
    }
}
