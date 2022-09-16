import React,{useEffect} from 'react'
import './css/main.css'
import {BrowserRouter as Router} from 'react-router-dom'
import MainNav from './navigation/MainNav'
import Auth from './navigation/Auth'
import SnackbarProvider from 'react-simple-snackbar'
import app from './firebase/config'
import { useAuthState } from 'react-firebase-hooks/auth';
import {getAuth} from 'firebase/auth'
import { useGlobalContextHook } from './hook/useGlobalContextHook'
import MainLoader from './components/MainLoader'

const auth = getAuth() 

function App() {
  const {dispatch,currentUser} = useGlobalContextHook()
  const [user]= useAuthState(auth)

  useEffect(() => {
    const checkIfUserExistInDb = async () => {
      if(user === null) { console.log('current no signed up user',user) } else {
        try {
          const response = await fetch(`${import.meta.env.VITE_SITE_URL}/read?action=READ_AFFILIATE_USER&id=${user.uid}`)
          const json = await response.json()
          if(response.ok){
              dispatch({type:'SET_CURRENT_USER',payload:json})}
           if(!response.ok){console.log(json.message)}
          } catch(err){console.log(err)}
        } 
      }
      checkIfUserExistInDb()
    },[user]) 
  return (
   <SnackbarProvider>
    <Router>
      {user === null && currentUser === undefined ? <MainLoader />:
      user === null && currentUser === null ? <Auth /> :
      user !== null && currentUser !== null ?<MainNav /> :<Auth />}
    </Router>
   </SnackbarProvider> 
  )
}

export default App