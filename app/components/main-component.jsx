import React from 'react'
import store from '../store/data-grid-store'
import { addTodo, deleteTodo } from '../actions/todo-actions'

class MainComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    let listener = () => this.setState({ todos: store.getState().todos })
    this.unsubscribe = store.subscribe(listener)
  }

  addTodo(e) {
    addTodo(this.state.text)
  }

  deleteTodo(idx, todo, e) {
    deleteTodo(idx, todo)
  }

  handleChange(e) {
    this.setState({text: e.currentTarget.value})
  }

  render() {
    let todos = store.getState().todos.map((todo, idx) => {
      return (
        <div className="todo-wrapper" key={todo + idx}>
          <div >
            {todo}
          </div>
          <button onClick={this.deleteTodo.bind(this, idx, todo)}>
            Delete
          </button>
        </div>
      )
    })

    return (
      <div>
        {todos}
        <input type='text' value={this.state.text} onChange={this.handleChange.bind(this)}></input>
        <button onClick={this.addTodo.bind(this)}>ADD</button>
      </div>
    )
  }
}

export default MainComponent
