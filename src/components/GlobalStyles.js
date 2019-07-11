import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Roboto', sans-serif;
    src: url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
  }

  * {
    font-family: 'Roboto', system-ui;
    margin-block-start: 0;
    margin-block-end: 0;
  }

  #root {
    display: contents;
  }
`;

export default GlobalStyles;
