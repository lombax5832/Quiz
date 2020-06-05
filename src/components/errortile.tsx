import React, { MouseEventHandler } from 'react';
import { Card } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

export interface IErrorNavButton {
  label: string
  uri: string
}

export interface IBtnRetry {
  label: string
  onClick: MouseEventHandler
}

export interface IErrorTileProps {
  title?: string
  message: string
  btnHome?: IErrorNavButton
  btnBack?: IErrorNavButton
  btnRetry?: IBtnRetry
}

const ErrorTile = (props: IErrorTileProps) => (
    <Card>
      <CardHeader>
        <Typography variant="h5">
          {props.title || 'Error'}
        </Typography>
      </CardHeader>
      <CardContent>
        {props.message}
      </CardContent>
      <CardActions>
        {props.btnRetry && <Button
            variant="outlined"
            color="default"
            onClick={props.btnRetry.onClick}>
          {props.btnRetry.label}
        </Button>}
      </CardActions>
    </Card>
);

export default ErrorTile;
