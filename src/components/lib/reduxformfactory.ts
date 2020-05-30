import { reduxForm, ConfigProps } from 'redux-form';
import { ComponentType } from 'react';
import { InjectedFormProps } from 'redux-form/lib/reduxForm';

const reduxFormFactory = <FormData, P, ErrorType>(config: ConfigProps<FormData, P, ErrorType>) =>
    (form: ComponentType<P & InjectedFormProps<FormData, P, ErrorType>>) =>
        reduxForm(config)(form);

export default reduxFormFactory;
