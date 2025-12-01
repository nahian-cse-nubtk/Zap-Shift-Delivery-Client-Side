import { useQuery } from "@tanstack/react-query";
import React from "react";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure/UseAxiosSecure";
import { toast } from "react-toastify";

const UserManagement = () => {
  const axiosSecure = UseAxiosSecure();
  const { data: users = [],refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });
  const handleMakeUser =(user)=>{
        const roleInfo = { role: 'admin'}
        axiosSecure.patch(`/users/${user._id}`,roleInfo)
        .then(res=>{
            if(res.data.modifiedCount){
                refetch()
                toast('Admint Creation is successful')
            }
        })
  }
  const handleRemoveAdmin =(user)=>{
    const roleInfo = {
        role: 'user'
    }
    axiosSecure.patch(`/users/${user._id}`,roleInfo)
        .then(res=>{
            if(res.data.modifiedCount){
                refetch()
                toast('Admint Creation is successful')
            }
        })

  }
  return (
    <div>
      <h1>users Info</h1>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>role</th>
                <th>Admin Action</th>
                <th>Others Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
             {
                users.map((user,i)=> <tr>
                <th>{i+1}</th>
                <td>{user.name}</td>
                <td>{user.role}</td>
                <td>{user.role==='admin'?<button onClick={()=>handleRemoveAdmin(user)} className="btn">Remove Admin</button>:<button onClick={()=>handleMakeUser(user)} className="btn">Make Admin</button>}</td>
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

export default UserManagement;
