import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import UseAxiosSecure from '../../../hooks/UseAxiosSecure/UseAxiosSecure';

const PaymentSuccess = () => {
    const axoisSecure = UseAxiosSecure()
    const [searchParams] =useSearchParams()
    const sessionId =searchParams.get('session_id')

    useEffect(()=>{
        if(sessionId){
            axoisSecure.patch(`/paymentSuccess?session_id=${sessionId}`)
            .then(res=>{
                console.log(res.data)
            })
        }
    },[axoisSecure, sessionId])
    return (
        <div>
            <h1>The payment is successful</h1>

        </div>
    );
};

export default PaymentSuccess;