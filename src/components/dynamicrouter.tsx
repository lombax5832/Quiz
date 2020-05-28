import React, { createElement, useEffect, useState } from 'react';
import * as views from './views/index';
import { useRoutes } from 'react-router-dom';
import { IJourney, IRouteParam, IRouteParamOrDivider } from '../interfaces/journeys';
import { PartialRouteObject } from 'react-router';
import EnsureLogin from './ensurelogin';
import { connect } from 'react-redux';

const makeElement = (o: IRouteParam) => {
  if (o.requireUser) {
    return (
        <EnsureLogin isRequired={true}>
          {createElement(views[o.elementId])}
        </EnsureLogin>
    );
  } else {
    return createElement(views[o.elementId]);
  }
};

const makeRoutesConfig = (routes: Array<IRouteParamOrDivider>): Array<PartialRouteObject> => {
  /**
   * First filter out 'divider' string, leaving only objects
   */
  console.log('entered makeRoutesConfig');
  const aRouteParams = routes.filter(item => typeof item==='object');
  return (aRouteParams as Array<IRouteParam>)
      .filter(item => views[item.elementId]!==undefined)
      .map(o => {
        let ret: PartialRouteObject = {
          path: o.path,
          element: makeElement(o)
        };
        if (typeof o==='object' && o.children) {
          ret.children = makeRoutesConfig(o.children);
        }

        return ret;
      });
};

const mapStateToProps = (state: { journey: IJourney }) => {
  return {
    routes: state.journey?.rootJourney,
  };
};

const DynamicRouter = (props: { routes?: Array<IRouteParamOrDivider> }) => {
  console.log('entered DynamicRouter FC', window.location.href);
  const { routes } = props;

  const [routesConfig, setRouter] = useState([]);
  useEffect(() => {
    const rc = makeRoutesConfig(props.routes);
    setRouter(rc);
  }, [routes]);

  const element = useRoutes(routesConfig);

  return element;
};

export default connect(mapStateToProps)(DynamicRouter);
