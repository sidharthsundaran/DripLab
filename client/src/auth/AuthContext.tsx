import React, {createContext ,  useState,useEffect,useContext} from "react";
import API from "../api/axios";

interface AuthContextProps {
    accessToken:string|null
    login:(email:string,password:string)=>Promise<void>
    logout:()=>void
}

const AuthContext = createContext<AuthContextProps |null>(null)

export const AuthProvider:React.FC<{children:React.ReactNode}>= ({children})=>{
    const  [accessToken,setAccessToken] = useState<string |null> (null)
    const login = async(email:string ,password:string)=>{
        const res = await API.post('/api/users/login',{email,password})
        setAccessToken(res.data.accessToken)
    }
    const refresh=async ()=>{
        try {
            const res= await API.get('/api/users/refresh-token')
            setAccessToken(res.data.accessToken)
        } catch (error) {
            setAccessToken(null)
        }
    }
    const  logout = ()=>{
        API.post('/api/users/logout');
        setAccessToken(null)
    }
    useEffect(()=>{
        refresh()
    },[])

    return(
        <AuthContext.Provider value= {{accessToken,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth=()=>useContext(AuthContext)!;