import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import Cookies from 'universal-cookie'
import Auth from './Auth'
import HomePage from './HomePage'

const Main = () => {
  const cookies = new Cookies()
  const [isAuth,setIsAuth] = useState(cookies.get("auth-token"))
if(!isAuth){
  return(
      <div>
          <Auth/>
      </div>
  )
}
return <div>
   <HomePage/>
</div>
}

export default Main