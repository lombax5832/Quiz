import React from 'react';
import { IQuizWithCategory } from '../../interfaces/IQuiz';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

export interface IQuizSelectorMenuProps {
  categories: Array<IQuizWithCategory>
  label: string
  onChange: (value: IQuizWithCategory) => void
  autoCompleteStyle?: any
  quiz_id?: string
}

const QuizSelectorMenu = (props: IQuizSelectorMenuProps) => {

  const { categories, label, onChange, quiz_id, autoCompleteStyle } = props;
  let value: IQuizWithCategory;

  if(quiz_id){
    const matches = categories.filter(quiz => quiz._id === quiz_id);
    value = matches && matches[0]
  }

  return (
      <Autocomplete
          id="quiz_id_selector"
          options={categories}
          groupBy={(option) => option.categoryName}
          getOptionLabel={(option) => option.title}
          style={{ width: 300 }}
          disableClearable
          renderInput={(params) => <TextField {...params} label={label} variant="outlined"/>}
          getOptionSelected={(option, value) => option._id===value._id}
          value={value}
          onChange={(event: any, newValue: IQuizWithCategory | null) => {
            onChange(newValue);
          }}
      />
  );
};

export default QuizSelectorMenu;
