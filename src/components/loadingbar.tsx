import React from 'react';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';

const LinearLoader = ({ loading }) => {

  return (
      <Grid
          container
          spacing={0}
          direction="row"
          alignItems="center"
          justify="center"
      >
        <Grid item style={{ width: '100%' }}>
          { loading && <LinearProgress variant="query"/> }
        </Grid>
      </Grid>
  );
};

export default LinearLoader;
