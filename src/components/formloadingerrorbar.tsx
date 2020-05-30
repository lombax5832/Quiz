import LinearLoader from './loadingbar';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import ErrorAlert from './erroralert';

const FormMessageBar = ({ loading, error }) => {

  return (
      <Grid item xs={12} style={{ minHeight: '54px' }}>
        {!loading && error && <ErrorAlert severity="error" error={error}/>}
        {loading && <LinearLoader loading={loading}/>}
      </Grid>
  );
};

export default FormMessageBar;
