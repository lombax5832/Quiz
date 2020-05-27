import React, { createElement, useEffect, useState } from 'react';
import { VIEW_NODES } from './views';
import { useRoutes } from 'react-router-dom';
import { IJourney, IRouteParam, IRouteParamOrDivider } from '../interfaces/journeys';
import { PartialRouteObject } from 'react-router';
import EnsureLogin from './ensurelogin';
import { connect } from 'react-redux';

const makeRoutesConfig = (routes: Array<IRouteParamOrDivider>): Array<PartialRouteObject> => {
  /**
   * First filter out 'divider' string, leaving only objects
   */
  console.log('entered makeRoutesConfig');
  const aRouteParams = routes.filter(item => typeof item==='object');
  return (aRouteParams as Array<IRouteParam>)
      .filter(item => VIEW_NODES[item.elementId]!==undefined)
      .map(o => {
        let ret: PartialRouteObject = {
          path: o.path,
          element: (
              <EnsureLogin isRequired={o.requireUser}>
                {createElement(VIEW_NODES[o.elementId])}
              </EnsureLogin>
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
