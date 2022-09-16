import React from 'react'
import  logo from '../img/logo_light.png'
import { useAuthState } from 'react-firebase-hooks/auth';
import {useNavigate} from 'react-router-dom'
import app from '../firebase/config'
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import {useSnackbar} from 'react-simple-snackbar'
import { useGlobalContextHook } from '../hook/useGlobalContextHook'

const auth = getAuth()
const provider = new GoogleAuthProvider()

function Login() {
  const [openSnackbar] = useSnackbar()
  const [user]= useAuthState(auth)
  const navigate = useNavigate()
  const {dispatch} = useGlobalContextHook()

  const signWithGoogle =async()=>{
		try {
		   const userCredential = await signInWithPopup(auth, provider)
          navigate('/')
          addUserToDb(userCredential)
      } catch(error){
        openSnackbar('Failed to sign in with Google '+error.code)
       }	  
	}
  
  const addUserToDb = async (userCredential) => {
    try{
      const credential = userCredential.user						   
      const userObj = {
       id:credential.reloadUserInfo.localId,
       email:credential.reloadUserInfo.email,
       username:credential.reloadUserInfo.displayName,
       photoURL:credential.reloadUserInfo.photoUrl,
       promoCode:Math.floor(100000 + Math.random() * 900000).toString()
      }
      const response = await fetch(`${import.meta.env.VITE_SITE_URL}/create?action=CREATE_NEW_AFFILIATE_USER&id=${userObj.id}`,{
        method: 'POST',
        body: JSON.stringify(userObj),
        headers: {
          'Content-Type':'application/json'
       }
      })
      const json = await response.json()
      if(response.ok){
        dispatch({type:'SET_CURRENT_USER',payload:json})
        navigate('/')
      }
      if(!response.ok){
        navigate('/')
        dispatch({type:'SET_CURRENT_USER',payload:json})
     }  
    } catch(error){
      openSnackbar('Failed to add user to the db')
      console.log(error)
    }
     
  }
  return (
  <div>
    <div className='landig-page-navbar'>
    <img src={logo} alt={"logo"} />
    <h1>Affiliate.kopaleo</h1> 
   </div>
   <div className="login-wrapper">
   <div className="sign-up-with-google-div">
   <button type="button" class="login-with-google-btn" onClick={()=>signWithGoogle()} >
      Sign in with Google
  </button>
   </div>
   </div>

  </div>
  )
}

export default Login