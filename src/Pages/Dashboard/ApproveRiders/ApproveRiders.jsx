import React from "react";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const ApproveRiders = () => {
  const axiosSecure = UseAxiosSecure();
  const { data: riders = [],refetch } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders?status=pending");
      return res.data;
    },
  });

  const updateStatus = (rider,status)=>{
    const updateInfo = {
        status: status,
        email: rider.riderEmail
    }
    axiosSecure.patch(`/riders/${rider._id}`,updateInfo)
    .then(res=>{
        console.log(res.data)
        if(res.data.modifiedCount){
            refetch()
        }
    })
  }
  const handleRiderApproved =(rider)=>{
    updateStatus(rider,'Approved')
  }
  const handleRiderRejected =(rider)=>{
    updateStatus(rider,'Rejected')
  }
  return (
    <div>
      <h1>Riders Application</h1>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>District</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {riders.map((r, i) => (
                <tr>
                  <th>{i+1}</th>
                  <td>{r.riderName}</td>
                  <td>{r.riderDistrict}</td>
                  <td>{r.status}</td>
                  <td>
                    <div>
                        <button onClick={()=>handleRiderApproved(r)} className="btn mr-3">Approved</button>
                        <button onClick={()=>handleRiderRejected(r)} className="btn mr-3">Rejected</button>
                        <button className="btn ">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ApproveRiders;
