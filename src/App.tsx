import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import './App.css';
import Authentication from './components/authentication';
import MainLayout from './components/mainlayout';
import routeReducer from './store/routeReducer';

const store = createStore(routeReducer, composeWithDevTools())

function App() {
  return (
    <Provider store={store}>
      <Authentication>
        <BrowserRouter>
          <MainLayout />
        </BrowserRouter>
      </Authentication>
    </Provider>
  );
}

export default App;
