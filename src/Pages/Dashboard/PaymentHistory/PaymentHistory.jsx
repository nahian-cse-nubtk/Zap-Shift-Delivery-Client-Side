import React from "react";
import useAuth from "./../../../hooks/useAuth/useAuth";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = UseAxiosSecure();
  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `http://localhost:4000/payments?email=${user?.email}`
      );
      return res.data;
    },
  });
  
  return (
    <div>
      <h1>Payment History</h1>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Parcel Name</th>
                <th>Amount</th>
                <th>Taransection Id</th>
                <th>Tracking Id</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>

              {
                payments.map((payment,index)=><tr key={payment._id} className="bg-base-200">
                <th>{index+1}</th>
                <td>{payment.parcelName}</td>
                <td>{payment.amount}</td>
                <td>{payment.transectionId}</td>
                <td>{payment.trackingId}</td>
                <td><button>update</button> <button>Delete</button></td>
              </tr>
                )
              }

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
