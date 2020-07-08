import React from 'react';
import { Outlet } from 'react-router-dom';

const QuizzesOutlet = () => {
  return (
      <div id="quizzes">
        <Outlet/>
      </div>
  );
};

export default QuizzesOutlet;
