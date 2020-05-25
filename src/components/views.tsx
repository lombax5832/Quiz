import React from 'react';
import Counter from './counter';
import EditQuestion from './editquestion';
import CategoryForm from './editcategory/categoryform';
import NewQuiz from './newquiz';
import Welcome from './welcome';
import MainLayout from './mainlayout';

const VIEW_NODES = {
  'main': MainLayout,
  'counter': Counter,
  'editquestion': EditQuestion,
  'editcategory': CategoryForm,
  'newquiz': NewQuiz,
  'welcome': Welcome,
}

const VIEWS = {
  'main': <MainLayout/>,
  'counter': React.createElement(Counter),
  'editquestion': <EditQuestion/>,
  'editcategory': <CategoryForm/>,
  'newquiz': <NewQuiz/>,
  'welcome': <Welcome/>,
};

export {VIEWS, VIEW_NODES};
