import React from 'react';
import useAuth from '../useAuth/useAuth';
import UseAxiosSecure from '../UseAxiosSecure/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const UseRole = () => {
    const {user}=useAuth()
    const axiosSecure = UseAxiosSecure()
    const {data:role='user',isPending}=useQuery({
        queryKey: ['user-role',user?.email],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/users?email=${user?.email}`)

            return res.data?.[0]?.role||'user'
        }
    })
    if(isPending){
        return <p>Losding....</p>
    }
    console.log(role)
    return {role,isPending}
};

export default UseRole;