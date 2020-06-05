import React from 'react'
import { Outlet } from 'react-router-dom';

const EditCategoryView = (props: any) => {
    return (
        <div>
            <Outlet />
        </div>
    )
}

export default EditCategoryView;