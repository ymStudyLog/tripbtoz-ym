import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
${reset}

*,
  :after,
  :before {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

html {
  font-family: 'Noto Sans KR', sans-serif;
  word-break: keep-all;

  * {
      -ms-overflow-style: none; 
      scrollbar-width: none; 
      ::-webkit-scrollbar {
        display: none; 
      }
    }
}

body, html, #root {
  width: 100%;
  height: 100%;
}

button {
  cursor: pointer;
  border: none;
  outline: none;
}

:root {
    --color-white: #fff;
    --color-border: #000;
    --color-hover: #e8e8e8;
    --color-subTitle: #9fa1a7;
    --color-main: #ff375c;
  }

`;

export default GlobalStyle;
