import React from 'react';
import { Button } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Add, AddCircle } from '@material-ui/icons';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TypeMenu from './typemenu';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';

const AddAnswer = (props: any) => {

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
                <TypeMenu/>
              </Grid>
              <Grid item>
                <Button
                    variant="outlined"
                    size="small"
                    color="default"
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


export default AddAnswer;
