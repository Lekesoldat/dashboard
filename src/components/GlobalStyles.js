import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Roboto', sans-serif;
    src: url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
  }

  * {
    font-family: 'Roboto', system-ui;
  }
`;

export default GlobalStyles;
