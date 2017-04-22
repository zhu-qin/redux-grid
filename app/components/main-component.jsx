import React from 'react'
import { addTodo, deleteTodo } from '../actions/todo-actions'

class MainComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    let listener = () => this.setState({ todos: this.props.store.getState().todos })
    this.unsubscribe = this.props.store.subscribe(listener)
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  addTodo(e) {
    this.props.store.dispatch(addTodo(this.state.text))
  }

  deleteTodo(idx, todo, e) {
    this.props.store.dispatch(deleteTodo(idx, todo))
  }

  setConfig() {
    this.props.store.dispatch({
      type: 'SET_CONFIG',
      config: {
        ENV:'PROD',
        flavor: 'strawberry'
      }
    })
  }

  handleChange(e) {
    this.setState({text: e.currentTarget.value})
  }

  render() {
    let todos = this.props.store.getState().todos.map((todo, idx) => {
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
        <button onClick={this.setConfig.bind(this)}>Hello</button>
      </div>
    )
  }
}

export default MainComponent
