import { createGlobalStyle } from 'styled-components';

const GlobalStyled = createGlobalStyle`
  body{
    background: #9B65E6;
    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialiased !important;
    font-family: sans-serif;
  }
`;

export default GlobalStyled;
