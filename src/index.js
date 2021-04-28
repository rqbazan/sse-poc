import 'zeit-toast-clone/styles.css'
import 'react-circular-progressbar/dist/styles.css'
import 'tailwindcss/tailwind.css'
import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { NotifierPortal } from 'zeit-toast-clone'
import App from './app'

ReactDOM.render(
  <>
    <NotifierPortal />
    <App />
  </>,
  document.getElementById('root')
)
