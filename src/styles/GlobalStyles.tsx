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
    
    --color-white: #ffffff;
  
  }


`;

export default GlobalStyle;
