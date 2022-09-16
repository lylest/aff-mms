import React,{useState,useEffect} from 'react'
import TopNav from '../components/TopNav'
import {Icon,Card} from '@blueprintjs/core'
import { useSnackbar } from 'react-simple-snackbar'
import { useGlobalContextHook } from '../hook/useGlobalContextHook'

function Home() {
  const [isLinkCopied,setIsLinkCopied] = useState(false)
  const [isPromoCodeCopied,setIsPromoCodeCopied] = useState(false)
  const [openSnackbar] = useSnackbar()
  const {currentUser} = useGlobalContextHook()
  const [linkLeads,setLinkLeads] = useState(0)
  const [totalLinkOpens,setTotalLinkOpens] = useState(0)
  const [refferalEarns,setRefferalEarns] = useState([])
  const {username,email,photoURL,promoCode} = currentUser

  const copyLink = ()=>{
    setIsLinkCopied(true)
    navigator.clipboard.writeText(`https://kopaleo.com/home/${promoCode}`)
    openSnackbar('Link copied!')
  }
  
  const copyPromoCode = ()=>{
    setIsPromoCodeCopied(true)
    navigator.clipboard.writeText(promoCode)
    openSnackbar('promo code copied!')
  }

  const readLinkLead = async()=>{
    try{
      const response = await fetch(`${import.meta.env.VITE_SITE_URL}/read?action=READ_LINK_LEADS&promocode=${promoCode}`)
      const responseBody = await response.json()
      if(response.ok){setLinkLeads(responseBody)}
      if(!response.ok){openSnackbar('Server side error')}
    }catch(e){
      openSnackbar('Failed to read link leads')
    }
  }
  
  const readTotalLinkOpens = async()=>{
    try{
      const response = await fetch(`${import.meta.env.VITE_SITE_URL}/read?action=READ_LINK_VISTORS&promocode=${promoCode}`)
      const responseBody = await response.json()
      if(response.ok){setTotalLinkOpens(responseBody)}
      if(!response.ok){openSnackbar('Server side error')}
    }catch(e){
      openSnackbar('Failed to read link leads')
    }
  }

 const readRefferalEarns = async () => {
  try{
    const response = await fetch(`${import.meta.env.VITE_SITE_URL}/read?action=TOTAL_REFFERAL_EARNS&promocode=${promoCode}`)
    const responseBody = await response.json()
    if(response.ok){setRefferalEarns(responseBody[0])}
    if(!response.ok){openSnackbar('Failed to fetch refferal earns')}
  }catch(e){openSnackbar('Failed to find refferal earns')}
 } 

  useEffect(()=>{
    readLinkLead()
    readTotalLinkOpens()
    readRefferalEarns()
  },[currentUser])
 
  return (
    <div className="main-wapper" >
      <TopNav />
      <div className="main-container">
        <div className="center-container">
        <div className="more-card">
            <img src={photoURL} className="more-card-icon" alt="img" />
             <div className="more-card-title">
              <h2>{username}</h2>
               <p>{email}</p>
              </div> 
           </div>

            <div className="stations-list">

                  <Card interactive={true} elevation={0}  className="station-li" >
                  <div className="station-top">
                  <Icon icon="open-application" color="#10B981" className="icon"  size={30}/>
                  <h3>Opens</h3> <span className="station-span">{totalLinkOpens}</span>
                  </div>
                  </Card>

                  <Card interactive={true} elevation={0} className="station-li" >
                  <div className="station-top" >
                  <Icon icon="flows" color="#07608B" className="icon"  size={30}/>
                  <h3>Subscriptions</h3> <span className="station-span">{linkLeads}</span>
                  </div>
                  </Card>

                  <Card interactive={true} elevation={0} className="station-li" >
                  <div className="station-top">
                  <Icon icon="dollar" color="#F59E0B" className="icon"  size={30}/>
                  <h3>Balance</h3> <span className="station-span">
                    {refferalEarns === undefined ? 0 : 
                     refferalEarns.length <= 0 ? 0 : refferalEarns.totalEarns.toLocaleString()}</span>
                  </div>
                  </Card>

            </div>
        
            <h2 style={{marginLeft:15}}>Affiliate link</h2>
            <div className="link-bar" onClick={()=>copyLink()}>
              <p>{`https://kopaleo.com/home/${promoCode}`}</p>&emsp;{isLinkCopied ? 'link copied!':'copy link'}&emsp;
              <Icon icon="duplicate" color={isLinkCopied ? "#10B981": '#666'} className="icon-link" />
            </div>

            <h2 style={{marginLeft:15}}>Promo code</h2>
            <div className="link-bar" onClick={()=>copyPromoCode()}>
              <p>{promoCode}</p>&emsp;{isPromoCodeCopied ? 'promocode copied!':'copy promo code'}&emsp;
              <Icon icon="duplicate" color={isPromoCodeCopied ? "#10B981": '#666'} className="icon-link" />
            </div>
        </div>
      </div>
    </div>
  )
}

export default Home