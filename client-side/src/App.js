import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import SnackBarMsg from './components/sharedComponents/SnackBarMsg';
import BlogState from './context/blogContext/BlogState';
import MainState from './context/mainContext/MainState';
import Routes from './Routes/Routes';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <MainState>
          <BlogState>
            <Header />
            <Routes />
            <SnackBarMsg />
          </BlogState>
        </MainState>
      </BrowserRouter>
    </div>
  );
}

export default App;
