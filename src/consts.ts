import { IJourney } from './interfaces/journeys';

export const FORM_NAME = 'editQuestion';
export const FORM_NEW_QUIZ = 'newQuiz';
export const FORM_EDIT_CATEGORY = 'editCategory';
export const DRAWER_WIDTH = 240;


export const JOURNEY: IJourney = {

  rootJourney: [
    {
      path: '',
      elementId: 'main',
      children: [
        { path: '/', elementId: 'welcome', label: 'Home', requireUser: false },
        'divider',
        { path: 'counter', elementId: 'counter', label: 'Counter', requireUser: false },
        { path: 'editquestion', elementId: 'editquestion', label: 'Edit Question', requireUser: true },
        { path: 'editcategory', elementId: 'editcategory', label: 'Edit Category', requireUser: true },
        { path: 'newquiz', elementId: 'newquiz', label: 'Edit Quiz', requireUser: true },
      ],
    },
  ],
};



