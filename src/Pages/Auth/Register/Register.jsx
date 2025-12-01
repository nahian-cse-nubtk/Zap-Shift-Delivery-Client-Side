
import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth/useAuth";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure/UseAxiosSecure";
import axios from "axios";
import { useLocation, useNavigate } from "react-router";

const Register = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const {createUser,updateUser} =useAuth();
    const axiosSecure = UseAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister = (data) => {
        createUser(data.email,data.password)
        .then(result=>{
            if(result.user){
    const profileImage = data.image[0];
    const formData = new FormData();
    formData.append("image", profileImage);
    axios
      .post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB}`,
        formData
      )
      .then((res) => {
        // console.log(res.data.data.url);
        const userInfo ={
          email: data.email,
          name: data.name,
          photoURL: res.data.data.url
        }
        axiosSecure.post('/users',userInfo)
        .then(res=>{
          console.log(res.data)
        })
        const profile = {
            displayName : data.name,
            photoURL: res.data.data.url
        }
        updateUser(profile)
        .then(()=>{
          navigate(location.state||'/')
          console.log('update is Successful')
        })
        .catch(error=>{
            console.log(error)
        })
      });
  }})
      .catch(error=>{
        console.log(error);
      })
  };
  return (
    <div>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <h1 className="text-3xl font-bold text-center mt-5">Register Now!</h1>
        <div className="card-body">
          <form onSubmit={handleSubmit(handleRegister)}>
            <fieldset className="fieldset">
              <label className="label">Email</label>
              <input
                type="text"
                {...register("name",{required: true})}
                className="input"
                placeholder="Name"
              />
              {
              errors.name?.type === "required" &&<div className="text-rose-500">Please write your name</div>
              }
              <label className="label">Upload an image</label>
              <input
                type="file"
                {...register("image",{required: true})}
                className="file-input"
              />
              {
              errors.image?.type === "required" &&<div className="text-rose-500">Please Select an image</div>
              }
              <label className="label">Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="input"
                placeholder="Email"
              />
              {errors.email?.type == "required" && (
                <div className="text-red-500">Email is required must</div>
              )}
              <label className="label">Password</label>
              <input
                type="password"
                {...register("password", {
                  required: true,
                  pattern:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/,
                })}
                className="input"
                placeholder="Password"
              />
              {
              errors.password?.type === "required" &&<div className="text-rose-500">password must needed</div>
              }
              {
              errors.password?.type === "pattern" &&<div className="text-rose-500">
                  ✔ At least 1 uppercase ✔ At least 1 lowercase ✔ At least 1
                  number ✔ At least 1 special character ✔ Minimum 6 characters
                </div>
              }
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <button className="btn btn-primary mt-4 text-primary-content">
                Register
              </button>
            </fieldset>
          </form>
          <button className="btn bg-white text-black border-[#e5e5e5]">
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
