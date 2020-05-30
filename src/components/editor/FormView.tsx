import React, { ComponentType, createElement } from 'react';
import { ConfigProps } from 'redux-form';
import reduxFormFactory from '../lib/reduxformfactory';
import { InjectedFormProps } from 'redux-form/lib/reduxForm';

export interface IFormViewProps<FormData, P, ErrorType> {
  config: ConfigProps<FormData, P, ErrorType>
  component: ComponentType<P & InjectedFormProps<FormData, P, ErrorType>>
}

const FormView = <FormData, P, ErrorType>(props: IFormViewProps<FormData, P, ErrorType>) => {

  const element = reduxFormFactory(props.config)(props.component);

  return createElement(element);
};
