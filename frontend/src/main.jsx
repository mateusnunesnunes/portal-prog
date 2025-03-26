// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { GlobalStyle } from './styles/GlobalStyles';  // Importe o GlobalStyle

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalStyle />  {/* Aplica as regras globais */}
    <App />
  </StrictMode>,
);
