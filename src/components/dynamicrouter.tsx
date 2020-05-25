import React, { createElement } from 'react';
import { VIEWS, VIEW_NODES } from './views';
import MainLayout from './mainlayout';
import { useRoutes } from 'react-router-dom';
import { IJourney, IRouteParam } from '../interfaces/journeys';
import { PartialRouteObject } from 'react-router';
import EnsureLogin from './ensurelogin';
import { JOURNEY } from '../consts';

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
