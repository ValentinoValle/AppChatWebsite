import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import { AuthContextProvider } from './context/AuthContext.tsx'
import { ChatContextProvider } from './context/ChatContext.tsx'
import { SidebarContextProvider } from './context/SidebarContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthContextProvider>
    <ChatContextProvider>
      <SidebarContextProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>,
      </SidebarContextProvider>
    </ChatContextProvider>
  </AuthContextProvider>
)
