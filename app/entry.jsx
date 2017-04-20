import React from 'react'
import ReactDOM from 'react-dom'
// components
import MainComponent from './components/main-component'

document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById('root');
    ReactDOM.render(<MainComponent/>, root);
});
