import React from 'react'
import { Outlet } from 'react-router-dom';

const EditQuizOutlet = () => {
  return (
      <div id="quiz_editor">
        <Outlet />
      </div>
  )
}

export default EditQuizOutlet;
