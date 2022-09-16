import React,{useState} from 'react'
import  logo from '../img/logo_light.png'
import {Icon,Drawer,Position,DrawerSize} from '@blueprintjs/core'
import {useNavigate} from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth';
import {getAuth,signOut} from 'firebase/auth'
import app from '../firebase/config'
import { useGlobalContextHook } from '../hook/useGlobalContextHook'

const auth = getAuth()

function Lnavbar() {
  const [isDrawerOpen,setIsDrawerOpen] = useState(false)
  const [user]= useAuthState(auth)
  const navigate = useNavigate()
  const {currentUser} = useGlobalContextHook()
  const {username,email,photoURL} = currentUser
  const logoutFn = async()=>{
    try {
        await signOut(auth);
        await window.location.reload();
        await  navigate('/');
        
    } catch (error) {
          console.log(error.message,'failed to sign out')
       }
}

  return (
    <div className='landig-page-navbar'>
        <img src={logo} alt={"logo"} />
        <h1>Affiliate.kopaleo</h1> 
            <div class="landing-nav-menu" onClick={()=>setIsDrawerOpen(prev=>!prev)} id="triad"> 
            <img src={photoURL} style={{width: '35px', height: '35px',borderRadius: '20px'}} alt="user-img" /></div>
 
        <Drawer 
                isOpen={isDrawerOpen} 
                position={Position.LEFT}
                size={window.innerWidth > 1000 ? DrawerSize.STANDARD : DrawerSize.LARGE} 
                title="Menu"
                canClickOutsideToClose={true} onClose={()=>setIsDrawerOpen(prev=>!prev)}>
            <div className= 'landing-page-drawer'>
            <div className="more-card">
            <img src={photoURL} className="more-card-icon" alt="user-profile-image" />
             <div className="more-card-title">
              <h2>{username}</h2>
               <p>{email}</p>
              </div> 
           </div>
           <button onClick={()=>logoutFn()}>Log out</button>
            </div>
            </Drawer>    
    </div>
  )
}

export default Lnavbar