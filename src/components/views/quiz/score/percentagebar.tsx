import React from 'react';
import Grid from '@material-ui/core/Grid';

export interface IPercentageBar {
  bgColor?: string
  fgColor?: string
  val: number
  height?: string
  showLabel?: boolean
  labelColor?: string
}

const PercentageBar = (props: IPercentageBar) => {

  const {
    showLabel = false,
    bgColor = 'lightgrey',
    fgColor = 'blue',
    height = '20px',
    val,
    labelColor = 'white',
  } = props;

  const percentage = Math.floor(val / 10);

  return (
      <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
          style={{ background: bgColor }}
      >
        <Grid item style={
          {
            flexBasis: `${percentage}%`,
            minHeight: height,
            background: fgColor,
            verticalAlign: 'middle',
            textAlign: 'right',
            padding: '10px',

          }
        }>{showLabel && <span style={{ color: labelColor }}>{`${props.val}`}</span>}</Grid>
      </Grid>
  );
};

export default PercentageBar;
