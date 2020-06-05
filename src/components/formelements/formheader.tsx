import React from 'react'
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';

export interface IFormHeaderProps {
  title: string
}
export default function FormHeader(props: IFormHeaderProps){

  return (
      <Box mb={1}>
        <Typography variant="h4">
          {props.title}
        </Typography>
      </Box>
  )
}
