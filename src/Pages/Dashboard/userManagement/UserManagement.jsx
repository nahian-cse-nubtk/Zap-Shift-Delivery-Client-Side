import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure/UseAxiosSecure";
import { toast } from "react-toastify";

const UserManagement = () => {
    const [searchText, setSearchText] =useState('')
  const axiosSecure = UseAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users",searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?searchText=${searchText}`);
      return res.data;
    },
  });
  const handleMakeUser = (user) => {
    const roleInfo = { role: "admin" };
    axiosSecure.patch(`/users/${user._id}`, roleInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        toast("Admint Creation is successful");
      }
    });
  };
  const handleRemoveAdmin = (user) => {
    const roleInfo = {
      role: "user",
    };
    axiosSecure.patch(`/users/${user._id}`, roleInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        toast("Admint Creation is successful");
      }
    });
  };
  return (
    <div>
      <h1 className="text-3xl font-bold my-5">users Info</h1>
      <div>
        <label className="input">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input onChange={(e)=>setSearchText(e.target.value)} type="search" required placeholder="Search" />
        </label>
      </div>
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
              {users.map((user, i) => (
                <tr>
                  <th>{i + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.role}</td>
                  <td>
                    {user.role === "admin" ? (
                      <button
                        onClick={() => handleRemoveAdmin(user)}
                        className="btn"
                      >
                        Remove Admin
                      </button>
                    ) : (
                      <button
                        onClick={() => handleMakeUser(user)}
                        className="btn"
                      >
                        Make Admin
                      </button>
                    )}
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

export default UserManagement;
