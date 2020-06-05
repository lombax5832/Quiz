import React, { MouseEventHandler } from 'react';
import Button from '@material-ui/core/Button';
import CachedIcon from '@material-ui/icons/Cached';
import { PropTypes } from '@material-ui/core';

export interface IRetryButton {
  label: string
  onClick: MouseEventHandler
  variant?: "outlined" | "text" | "contained"
  color?: PropTypes.Color
  size?: 'small' | 'medium' | 'large'
}

const RetryButton = (props: IRetryButton) => {

  const {variant='outlined', color='default', size='small'} = props
  return (

      <Button
          variant={variant}
          color={color}
          size={size}
          onClick={props.onClick}
          startIcon={<CachedIcon/>}>
        {props.label}

      </Button>
  );
};

export default RetryButton;
