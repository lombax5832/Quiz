import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import './App.css';
import Authentication from './components/authentication';
import MainLayout from './components/mainlayout';
import routeReducer from './store/routeReducer';
import Typography from '@material-ui/core/Typography';
import Welcome from './components/welcome';
import Counter from './components/counter';
import EditQuestion from './components/editquestion';
import CategoryForm from './components/editcategory/categoryform';
import NewQuiz from './components/newquiz';
import DynamicRouter from './components/dynamicrouter';

const store = createStore(routeReducer, composeWithDevTools());

const VIEWS = {
  'counter': <Counter/>,
  'editquestion': <EditQuestion/>,
  'editcategory': <CategoryForm/>,
  'newquiz': <NewQuiz/>,
  'welcome': <Welcome/>,
}

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
