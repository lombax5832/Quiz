import { CheckboxProps, createStyles, TextField, Theme } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import green from '@material-ui/core/colors/green';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import makeStyles from '@material-ui/core/styles/makeStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import React from 'react';

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
    }),
);

const renderFromHelper = ({ touched, error }) => {
  if (!(touched && error)) {
    return;
  } else {
    return <FormHelperText>{touched && error}</FormHelperText>;
  }
};

const renderTextField = ({
                           label,
                           input,
                           autocomplete,
                           meta: { touched, invalid, error },
                           ...custom
                         }) => (
    <TextField
        label={label}
        placeholder={label}
        autoComplete={autocomplete}
        error={touched && invalid}
        helperText={touched && error}
        {...input}
        {...custom}
    />
);


const renderTextArea = ({
                          label,
                          input,
                          meta: { touched, invalid, error },
                          ...custom
                        }) => (
    <TextField
        {...input}
        id="filled-textarea"
        variant="outlined"
        label={label}
        multiline
        fullWidth={true}
        rowsMax={10}
        error={touched && invalid}
        helperText={touched && error}
        {...custom}
        placeholder={label}

    />
);

const renderSelectField = ({
                             input,
                             label,
                             meta: { touched, error },
                             children,
                             ...custom
                           }) => (
    <FormControl error={touched && error}>
      <InputLabel htmlFor="color-native-simple">{label}</InputLabel>
      <Select
          native
          {...input}
          {...custom}
          inputProps={{
            name: input.name,
            id: 'color-native-simple',
          }}
      >
        {children}
      </Select>
      {renderFromHelper({ touched, error })}
    </FormControl>
);

const renderCheckbox = ({ input, label }) => (
    <div>
      <FormControlLabel
          control={
            <Checkbox
                color="primary"
                checked={input.value ? true:false}
                onChange={input.onChange}
            />
          }
          label={label}
      />
    </div>
);

export { renderTextField, renderTextArea, renderSelectField, renderCheckbox };

