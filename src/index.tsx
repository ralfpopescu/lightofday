import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import styled from 'styled-components';

const GlobalStyle = styled.div`
font-family: 'Space Mono', monospace;
font-size: 20px;
`

ReactDOM.render(
  <React.StrictMode>
    <style>
@import url('https://fonts.googleapis.com/css2?family=EB+Garamond&family=Open+Sans+Condensed:wght@300&family=Oxygen&family=Space+Mono&family=Yanone+Kaffeesatz:wght@300&display=swap');
</style>
    <GlobalStyle>
      <App />
    </GlobalStyle>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
