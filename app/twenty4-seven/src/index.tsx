import React from 'react';
import ReactDOM from 'react-dom/client';
// import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './CSS/MainStyle.css';
import { ThemeProvider } from './Utils/ThemeContext';
import Authentification from './Pages/Authentification';
import Homepage from './Pages/Homepage';
import NFTpage from './Pages/NFTpage';
import Page404 from './Pages/Page404';
import Cartpage from './Pages/Cartpage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  // <React.StrictMode>
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path='/connexion' element={<Authentification />}></Route>
          <Route path='/' element={<Homepage />}></Route>
          <Route path='/nft' element={<NFTpage />}></Route>
          <Route path='/cart' element={<Cartpage />}></Route>
          <Route path='/404' element={<Page404 />}></Route>
        </Routes>
      </Router>
    </ThemeProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
