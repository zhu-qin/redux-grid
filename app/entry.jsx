import React from 'react'
import ReactDOM from 'react-dom'
// components
import MainComponent from './components/main-component'
import configureStore from './store/data-grid-store'

const RunReduxGridStore = (initialState, root) => {
  let store = configureStore(initialState)
  document.addEventListener("DOMContentLoaded", () => {
      ReactDOM.render(<MainComponent store={store}/>, root);
  })
}

window.RunReduxGridStore = RunReduxGridStore
