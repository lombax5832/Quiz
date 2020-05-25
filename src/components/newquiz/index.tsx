import React from 'react'
import EnsureLogin from '../ensurelogin'
import NewQuizForm from './newquizform'

const NewQuiz = () => {
    return(
        <EnsureLogin isRequired>
            <NewQuizForm/>
        </EnsureLogin>
    )
}

export default NewQuiz