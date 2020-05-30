import React from 'react';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';

const LinearLoader = () => (
    <Grid
        container
        spacing={0}
        direction="row"
        alignItems="center"
        justify="center"
    >
      <Grid item style={{ width: '100%' }}>
        <LinearProgress variant="query"/>
      </Grid>
    </Grid>
)

export default LinearLoader;
