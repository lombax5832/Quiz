import React from 'react'
import EnsureLogin from '../ensurelogin'
import CategoryForm from './categoryform'

const EditCategory = () => {
    return(
        <EnsureLogin isRequired>
            <CategoryForm/>
        </EnsureLogin>
    )
}

export default EditCategory