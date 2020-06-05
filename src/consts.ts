import { IJourney } from './interfaces/journeys';

export const FORM_NAME = 'editQuestion';
export const FORM_NEW_QUIZ = 'newQuiz';
export const FORM_EDIT_CATEGORY = 'editCategory';
export const DRAWER_WIDTH = 240;

export interface ICategory {
  _id: string
  title: string
  slug: string
  description?: string
}

export const JOURNEY: IJourney = {

  rootJourney: [
    {
      path: '',
      elementId: 'main',
      children: [
        { path: '/', elementId: 'welcome', label: 'Home', requireUser: false, icon: 'home' },
        'divider',
        { path: 'counter', elementId: 'counter', label: 'Counter', requireUser: false },
        { path: 'editquestion', elementId: 'editquestion', label: 'Edit Question', requireUser: true },
        { path: 'editcategory', elementId: 'editcategoryview', label: 'Edit Category', requireUser: true,
          children: [
            { path: '/', elementId: 'editcategorylist' },
            { path: 'new', elementId: 'editcategory', requireUser: true },
            { path: 'success', elementId: 'editcategorysuccess' },
            { path: ':id', elementId: 'editcategory' }
          ]
        },
        { path: 'editquiz', elementId: 'editquizoutlet', label: 'Edit Quiz', requireUser: true,
          children: [
            { path: '/', elementId: 'editquizlist' },
            { path: 'new', elementId: 'editquiz', requireUser: true },
            { path: 'success', elementId: 'editquizsuccess' },
            { path: ':id', elementId: 'editquiz' }
          ]
        }
      ],
    },
  ],
};

export const CATEGORIES: ICategory[] = [
  {
    _id: "1abc",
    title: "Movies",
    slug: "movie",
    description: "Movies"
  },
  {
    _id: "2abcd",
    title: "Games",
    slug: "games",
    description: ""
  },
  {
    _id: "f1a",
    title: "JavaScript",
    slug: "javascript",
    description: "Test you JavaScript knowledge"
  }
]



