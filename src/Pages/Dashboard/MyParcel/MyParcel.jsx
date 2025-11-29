import { useQuery } from "@tanstack/react-query";
import React from "react";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure/UseAxiosSecure";
import useAuth from "../../../hooks/useAuth/useAuth";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyParcel = () => {
  const { user } = useAuth();

  const axiosSecure = UseAxiosSecure();
  const {
    data: parcels = [],
    isPending,
    error,refetch
  } = useQuery({
    queryKey: ["myPercels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
      return res.data;
    },
  });
  console.log(error);
  if (isPending) {
    return <p>Loading...</p>;
  }
  const handleDelete = (id)=>{
    Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {

    axiosSecure.delete(`/parcels/${id}`)
    .then(res=>{
      if(res.data.deletedCount){
        refetch();
      Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
    });
        }
    })

  }
});

  }
  return (
    <div>
      <h1 className="text-4xl text-center font-bold">My Parcels</h1>
      <div>
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Parcel Name</th>
                <th>Parcel Weight</th>
                <th>Cost</th>
                <th>Payment Status</th>
                <th>
                    Action
                </th>
              </tr>
            </thead>
            <tbody>

            {
                parcels.map((parcel,i)=><tr key={parcel._id}>
                <th>{i+1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.parcelWeight}</td>
                <td>{parcel.cost}</td>
                <td>{
                    parcel.paymentStatus==='paid'?<span className="btn">Paid</span>:<Link to={`/dashboard/parecels/${parcel._id}`} className="btn">Pay</Link>

                    }</td>
                <td>
                    <div className="flex">
                        <button onClick={()=>handleDelete(parcel._id)} className="btn mr-2">Delete</button>
                        <button className="btn mr-2">View</button>
                        <button className="btn">Edit</button>
                    </div>
                </td>
              </tr>)
            }


            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyParcel;
