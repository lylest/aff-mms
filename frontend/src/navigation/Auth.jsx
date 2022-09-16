import React from 'react';
import { Routes,Route} from 'react-router-dom'
import Login from '../pages/Login'

function MainNav(){
    return (
        <Routes>
        <Route path="/"  element={<Login />} />
        <Route path="/Login"  element={<Login />} /> 
        </Routes>
    )
}

export default MainNav
