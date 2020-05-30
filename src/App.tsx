import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import './App.css';
import Authentication from './components/authentication';
import routeReducer from './store/routeReducer';
import DynamicRouter from './components/dynamicrouter';
import thunk from 'redux-thunk';

const store = createStore(routeReducer, composeWithDevTools(
    applyMiddleware(thunk),
    ),
);

function App() {
  return (
      <Provider store={store}>
        <Authentication>
          <BrowserRouter>
            <DynamicRouter/>
          </BrowserRouter>
        </Authentication>
      </Provider>
  );
}

export default App;
