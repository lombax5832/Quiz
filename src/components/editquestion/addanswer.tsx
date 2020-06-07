import { Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import { AddCircle } from '@material-ui/icons';
import React from 'react';
import { connect } from 'react-redux';
import { arrayPush } from 'redux-form';
import { FORM_NAME } from '../../consts';
import TypeMenu from './typemenu';

const AddAnswer = (props: { arrayPush: Function,  qtype: string}) => {
  const { arrayPush, qtype = '' } = props;
  return (
      <Box mb={1}>
        <Card>
          <CardActions>
            <Grid
                container
                spacing={2}
                direction="row"
                justify="flex-end"
                alignItems="center"
            >
              <Grid item>
                <TypeMenu />
              </Grid>
              <Grid item>
                <Button
                    variant="outlined"
                    size="small"
                    color="default"
                    onClick={() => {
                      console.log('addAnswer onClick');
                      arrayPush(FORM_NAME, 'answers', { body: '' });
                    }}
                    startIcon={<AddCircle/>}
                >
                  Add Answer
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </Box>
  );
};


export default connect(null, { arrayPush })(AddAnswer);
