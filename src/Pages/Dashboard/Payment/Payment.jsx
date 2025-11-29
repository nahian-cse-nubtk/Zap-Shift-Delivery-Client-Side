import React from 'react';
import UseAxiosSecure from './../../../hooks/UseAxiosSecure/UseAxiosSecure';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';

const Payment = () => {
    const axiosSecure =UseAxiosSecure();
    const {parcelId} = useParams();
    console.log(parcelId)
    const {data:parcel,isPending}=useQuery({
        queryKey: ['parcel',parcelId],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/parcels/${parcelId}`)
            return res.data;
        }
    })
    if(isPending){
        return <p>Loading...</p>
    }
    const handlePayment = async()=>{
        const paymentInfo = {
            cost: parcel.cost,
            parcelId: parcel._id,
            senderEmail: parcel.senderEmail,
            parcelName: parcel.parcelName
        }
        const res = await axiosSecure.post('/create-checkout-session',paymentInfo)
        window.location.href=res.data.url;
    }
    return (
        <div>
            <h1 className='text-3xl'>Please pay for: {parcel.parcelName}</h1>
            <button onClick={handlePayment} className='btn bg-amber-100'>Pay</button>

        </div>
    );
};

export default Payment;