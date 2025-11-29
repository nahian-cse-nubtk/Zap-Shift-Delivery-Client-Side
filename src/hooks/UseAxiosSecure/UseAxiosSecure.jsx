import axios from 'axios';
import React from 'react';
const instance = axios.create({
    baseURL: 'http://localhost:4000'
})
const UseAxiosSecure = () => {
    return instance;
};

export default UseAxiosSecure;