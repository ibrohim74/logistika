import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./assets/css/index.css"
import {LanguageProvider} from "./utils/lang/LangContext.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <LanguageProvider>
            <App/>
        </LanguageProvider>

    </React.StrictMode>,
)
