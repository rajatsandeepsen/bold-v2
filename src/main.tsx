import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from "../components/ui/toaster.tsx"
import App from './App.tsx'
import { Provider } from 'jotai'

import './index.css'



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider>
    <App />
    </Provider>
    <Toaster />
  </React.StrictMode>,
)
