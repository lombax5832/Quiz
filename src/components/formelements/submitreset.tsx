import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

export type IColor = 'inherit' | 'primary' | 'secondary' | 'default';
export type IBtnVariant = 'text' | 'outlined' | 'contained';
export interface ISubmitResetProps {
  reset: Function
  btnSubmitLabel?: string
  btnResetLabel?: string
  btnResetColor?: IColor
  btnSubmitColor?: IColor
  btnResetVariant?: IBtnVariant
  btnSubmitVariant?: IBtnVariant
}
export default function SubmitReset(props: ISubmitResetProps) {

  const btnSubmitLabel = props.btnSubmitLabel || 'Submit';
  const btnResetLabel = props.btnResetLabel || 'Reset Values';
  const btnSubmitColor:IColor = props.btnSubmitColor || 'primary';
  const btnResetColor:IColor = props.btnResetColor || 'default';
  const btnSubmitVariant:IBtnVariant = props.btnSubmitVariant || 'outlined';
  const btnResetVariant:IBtnVariant = props.btnResetVariant || 'outlined';
  const {reset} = props;

  return <Grid
      container
      spacing={2}
      direction="row"
      justify="flex-end"
      alignItems="center"
  >

    <Grid item>
      <Button
          variant={btnResetVariant}
          color={btnResetColor}
          onClick={() => reset()}>
        {btnResetLabel}
      </Button>
    </Grid>
    <Grid item>
      <Button variant={btnSubmitVariant} type="submit" color={btnSubmitColor}>
        {btnSubmitLabel}
      </Button>
    </Grid>
  </Grid>;
}
