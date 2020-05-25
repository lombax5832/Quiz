import React, { createElement } from 'react';
import { VIEWS, VIEW_NODES } from './views';
import MainLayout from './mainlayout';
import { useRoutes } from 'react-router-dom';
import { IJourney, IRouteParam } from '../interfaces/journeys';
import { PartialRouteObject } from 'react-router';
import EnsureLogin from './ensurelogin';


const JOURNEY: IJourney = {

  rootJourney: [
    {
      path: '',
      label: '',
      elementId: 'main',
      children: [
        { path: '/', elementId: 'welcome', label: 'Home', requireUser: false },
        { path: 'counter', elementId: 'counter', label: 'Counter', requireUser: false },
        { path: 'editquestion', elementId: 'editquestion', label: 'Edit Question', requireUser: true },
        { path: 'editcategory', elementId: 'editcategory', label: 'Edit Category', requireUser: true },
        { path: 'newquiz', elementId: 'newquiz', label: 'Edit Quiz', requireUser: true },
      ],
    },
  ],
};


const makeRoutesConfig = (routes: Array<IRouteParam>): Array<PartialRouteObject> => {

  return routes.map(o => {
    let ret: PartialRouteObject = {
      path: o.path,
      element: createElement(EnsureLogin,
          {
            isRequired: o.requireUser,
            children: [createElement(VIEW_NODES[o.elementId])],
          },
      ),

    };
    if (o.children) {
      ret.children = makeRoutesConfig(o.children);
    }

    return ret;
  });
};

const DynamicRouter = (props: any) => {

  const routesConfig = makeRoutesConfig(JOURNEY.rootJourney);

  let element = useRoutes(routesConfig);

  return element;
};

export default DynamicRouter;
