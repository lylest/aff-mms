import React from 'react';
import { Routes,Route} from 'react-router-dom'
import Home from '../pages/Home'

function MainNav(){
    return (
        <Routes>
        <Route path="/"  element={<Home />} />
        <Route path="/Dashboard"  element={<Home />} /> 
        </Routes>
    )
}

export default MainNav
