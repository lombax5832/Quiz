import React, { useEffect, useState } from 'react';
import { reduxForm, SubmissionError } from 'redux-form';
import { FORM_EDIT_CATEGORY } from '../../consts';
import MyCategoryForm from './myform';
import { useParams, useNavigate } from 'react-router';

let CATEGORIES;

const validate = values => {

  const errors = { slug: undefined };

  const slugExists = Array.isArray(CATEGORIES) && CATEGORIES.find(categ => categ.slug === values.slug);

  if (slugExists) {
    errors.slug = 'Category with same URI slug already exists';

    return errors;
  }
};

const fetchCategory = (id: string | undefined) => {
  if(!id){
    return Promise.resolve(null);
  }
  return new Promise(resolve => {
    setTimeout(function () {
      resolve({
        title: 'Google',
        slug: 'google',
        _id: 'abc',
      });
    }, 100);
  });
};

const processSubmit = (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      if (data.slug === 'ibm') {
        reject(new SubmissionError({ slug: 'This slug already exists' }));
      } else if (data.slug === 'err') {
        reject(new SubmissionError({ _error: 'Server Error. Submission Failed' }));
      } else {
        resolve(true);
      }

    }, 1000);
  });
};


let CategoryForm = (props: any) => {
  const { handleSubmit, pristine, reset, submitting, initialize, error } = props;

  const [loaded, setLoaded] = useState(null);

  const params = useParams();

  console.log("My Params:", params);

  const navigate = useNavigate();

  /**
   * fetch existing categories from api.
   */
  useEffect(() => {
    fetchCategory(params.id).then(category => {
      if (category) {
        initialize(category);
      }
      setLoaded(true);
    });

  }, []);

  

  const submitHandler = handleSubmit((data, dispatch) => {
    console.log('your form detail here', data);
    return processSubmit(data).then(()=>{
      navigate('../success');
    });
  });

  return (
    <MyCategoryForm
      title="New Category"
      loaded={loaded}
      error={error}
      pristine={pristine}
      submitting={submitting}
      reset={reset}
      handleSubmit={submitHandler}
    />
  );

};


export default reduxForm({
  form: FORM_EDIT_CATEGORY,
})(CategoryForm);

