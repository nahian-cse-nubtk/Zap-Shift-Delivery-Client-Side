import React from 'react';
import NavBar from '../../Pages/Shared/NavBar/NavBar';
import { Outlet } from 'react-router';
import Footer from '../../Pages/Shared/Footer/Footer';
import { ToastContainer } from 'react-toastify';

const RootLayouts = () => {
    return (
        <div className='max-w-7xl mx-auto'>
            <NavBar></NavBar>
            <Outlet></Outlet>
            <Footer></Footer>

            <ToastContainer/>
        </div>
    );
};

export default RootLayouts;