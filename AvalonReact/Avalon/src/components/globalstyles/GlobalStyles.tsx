import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-image: linear-gradient(rgba(4, 2, 8, 0.80),rgba(0,0,0,0.99)),url('https://i.imgur.com/X5FqE8V.png'); 
    background-size: cover; 
    background-position: center 0px; 
    background-repeat: no-repeat;
    background-attachment: fixed;
    height: 100vh;
  }
`;

export default GlobalStyles;