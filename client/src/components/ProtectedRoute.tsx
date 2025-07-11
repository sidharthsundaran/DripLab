import React from "react";
import  {Navigate } from 'react-router-dom'
import { useAuth } from "../auth/AuthContext";

const ProtectedRoute:React.FC<{children:React.ReactNode}>=({children})=>{
    const {accessToken} =useAuth()
    return accessToken?<>{children}</> : <Navigate to='/login' />
}
export default ProtectedRoute