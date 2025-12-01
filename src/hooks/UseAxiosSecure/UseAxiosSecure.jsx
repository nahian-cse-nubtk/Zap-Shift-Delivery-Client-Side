import axios from 'axios';
import React, {  useEffect } from 'react';
import useAuth from '../useAuth/useAuth';
const instance = axios.create({
    baseURL: 'http://localhost:4000'
})
const UseAxiosSecure = () => {
    const {user} =useAuth()

    useEffect(()=>{
        const reqInterceptor =instance.interceptors.request.use((config)=>{
            config.headers.Authorization=`Bearer ${user?.accessToken}`
            return config;
        },(error)=>{
            console.log(error);
        })
        const resInterceptor = instance.interceptors.response.use((response)=>{
            return response;
        },
        (error)=>{
            console.log(error)
        })
        return ()=>{
            instance.interceptors.request.eject(reqInterceptor);
            instance.interceptors.response.eject(resInterceptor);
        }
    },[user,user?.accessToken])
    return instance;
};

export default UseAxiosSecure;