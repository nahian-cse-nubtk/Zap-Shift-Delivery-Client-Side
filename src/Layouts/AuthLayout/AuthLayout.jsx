import React from 'react';
import Logo from "../../Components/Logo/Logo";
import { Outlet } from 'react-router';
import authImage from '../.../../../assets/authImage.png'
import { ToastContainer } from 'react-toastify';
const AuthLayout = () => {
    return (
        <div className='max-w-7xl mx-auto my-5'>
            <Logo></Logo>
            <div className='flex items-center'>
                <div className='flex-1'>
                <Outlet></Outlet>
                </div>
                <div className='flex-1'>
                    <img src={authImage} alt="Authenication" />
                </div>
            </div>
            <ToastContainer/>
        </div>
    );
};

export default AuthLayout;