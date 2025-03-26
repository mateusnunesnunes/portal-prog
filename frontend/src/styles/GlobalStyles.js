// src/styles/GlobalStyles.js
import styled, { createGlobalStyle } from 'styled-components';

// Regras globais para garantir que o overflow horizontal seja evitado
export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    overflow-x: hidden;  /* Evitar rolagem horizontal */
    height: 100%;  /* Garantir que o body ocupe a altura total */
  }

  html, body, #root {
    height: 100%;
  }
`;

// Container ajustado para o conteúdo principal
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(191, 191, 191);  /* Cor de fundo */
  height: calc(100vh - 60px);  /* Ajusta a altura para considerar a sidebar */
  width: 100%;
  padding: 20px;  /* Adiciona espaçamento ao redor do conteúdo */
  overflow-y: auto;  /* Permite rolagem vertical quando necessário */
  overflow-x: hidden;  /* Evita o scroll horizontal */
`;
