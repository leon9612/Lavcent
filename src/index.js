import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const startApp = ()=>{
  ReactDOM.render(<App />, document.getElementById('root'));
  reportWebVitals();
}

if(window.cordova){
  document.addEventListener('deviceready', startApp, false);
  
}else{
  startApp();
}


