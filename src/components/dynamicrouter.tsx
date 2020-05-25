import React, { createElement } from 'react';
import { VIEW_NODES } from './views';
import { useRoutes } from 'react-router-dom';
import { IJourney, IRouteParam, IRouteParamOrDivider } from '../interfaces/journeys';
import { PartialRouteObject } from 'react-router';
import EnsureLogin from './ensurelogin';
import { connect } from 'react-redux';

const makeRoutesConfig = (routes: Array<IRouteParamOrDivider>): Array<PartialRouteObject> => {

  const aRouteParams = routes.filter(item => typeof item==='object');
  return (aRouteParams as Array<IRouteParam>)
      .filter(item => VIEW_NODES[item.elementId] !== undefined)
      .map(o => {
    let ret: PartialRouteObject = {
      path: o.path,
      element: createElement(EnsureLogin,
          {
            isRequired: o.requireUser,
            children: [createElement(VIEW_NODES[o.elementId])],
          },
      ),

    };
    if (typeof o==='object' && o.children) {
      ret.children = makeRoutesConfig(o.children);
    }

    return ret;
  });
};

const mapStateToProps = (state: { journey: IJourney }) => {
  return {
    routes: state.journey.rootJourney,
  };
};

const DynamicRouter = (props: { routes?: Array<IRouteParam> }) => {

  const routesConfig = makeRoutesConfig(props.routes);

  let element = useRoutes(routesConfig);

  return element;
};

export default connect(mapStateToProps)(DynamicRouter);
