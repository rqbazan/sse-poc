import 'zeit-toast-clone/styles.css'
import 'tailwindcss/tailwind.css'
import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { NotifierPortal } from 'zeit-toast-clone'
import App from './app'

ReactDOM.render(
  <React.StrictMode>
    <NotifierPortal />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
