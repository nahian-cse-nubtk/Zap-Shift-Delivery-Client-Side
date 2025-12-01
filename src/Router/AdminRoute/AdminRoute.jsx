import React from 'react';
import UseRole from '../../hooks/UseRole/UseRole';
import AccessForbidden from '../../Components/AccessForbidden/AccessForbidden';
import useAuth from '../../hooks/useAuth/useAuth';

const AdminRoute = ({children}) => {
    const {loading} = useAuth()
    const {role, isPending}=UseRole()
    if(loading || isPending){
        return
    }
    if(role !== 'admin'){
        return <AccessForbidden></AccessForbidden>
    }
    return children;
};

export default AdminRoute;