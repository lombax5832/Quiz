import React, { MouseEventHandler } from 'react';
import { Card } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import RetryButton from './formelements/retrybutton';
import Box from '@material-ui/core/Box';

export interface IErrorNavButton {
  label: string
  uri: string
}

export interface IBtnRetry {
  label: string
  onClick: MouseEventHandler
}

export interface IErrorTileProps {
  errorTitle?: string
  message: string
  btnHome?: IErrorNavButton
  btnBack?: IErrorNavButton
  btnRetry?: IBtnRetry
}

const ErrorTile = (props: IErrorTileProps) => {
  return (
      <Box mt={1}>
      <Card title={props.errorTitle}>
        <CardHeader title={props.errorTitle || 'Error occurred'}/>
        <CardContent>
          {props.message}
        </CardContent>
        <CardActions>
          {props.btnRetry && <RetryButton label={props.btnRetry.label} onClick={props.btnRetry.onClick}/>}
        </CardActions>
      </Card>
      </Box>
  );
};

export default ErrorTile;
