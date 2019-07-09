import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Roboto', sans-serif;
    src: url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
  }

  * {
    font-family: 'Roboto', system-ui;
    color: #f4f4f4;
  }
`;

export default GlobalStyles;
