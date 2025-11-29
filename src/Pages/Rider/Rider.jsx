import React from "react";
import { useForm, useWatch } from "react-hook-form";
import useAuth from "../../hooks/useAuth/useAuth";
import { useLoaderData } from "react-router";

const Rider = () => {
    const {user}=useAuth();
  const { register, handleSubmit,control } = useForm();
  const serviceCenters = useLoaderData()
  const duplicateRegions = serviceCenters.map(r=>r.region)
  const regions = [...new Set(duplicateRegions)]
  const riderRegion = useWatch({control, name: 'riderRegion'})
  const districtByRegion = (region)=>{
    const regionBasedDistrict = serviceCenters.filter(c=>c.region===region)
    const districts =regionBasedDistrict.map(d=>d.district)
    return districts;
  }

  const handleRegister =(data)=>{
    console.log(data)
  }
  return (
    <div>
      <h1 className="text-4xl font-bold text-center">Be a Rider</h1>
      <h2 className="text-2xl font-bold">Tell Us About Yourself</h2>
      <div className="border border-gray-300 my-3"></div>
      <div>
        <form onSubmit={handleSubmit(handleRegister)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-5">
            <fieldset className="fieldset">
              <label className="label font-bold text-black text-xl">
                Your Name
              </label>
              <input
                type="text"
                {...register("riderName")}
                className="input w-full"
                placeholder="Your Name"
                required
              />
            </fieldset>
            <fieldset className="fieldset">
              <label className="label font-bold text-black text-xl">
                Your Age
              </label>
              <input
                type="number"
                {...register("riderAge")}
                className="input w-full"
                placeholder="Your Age"
                required
              />
            </fieldset>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-5">
            <fieldset className="fieldset">
              <label className="label font-bold text-black text-xl">
                Your Email
              </label>
              <input
                type="text"
                {...register("riderEmail")}
                className="input w-full"
                defaultValue={user?.email}
                readOnly
              />
            </fieldset>
            <fieldset className="fieldset">
              <label className="label font-bold text-black text-xl">
                NID No
              </label>
              <input
                type="number"
                {...register("riderNID")}
                className="input w-full"
                placeholder="Your NID No"
                required
              />
            </fieldset>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-5">
            <fieldset className="fieldset">
              <label className="label font-bold text-black text-xl">
                Contact No
              </label>
              <input
                type="text"
                {...register("riderContact")}
                className="input w-full"
                placeholder="Your Contact Number"
                required
              />
            </fieldset>
            <fieldset className="fieldset">
              <label className="label font-bold text-black text-xl">
                Which Region You Want to Provide Service
              </label>
              <select
                {...register("riderRegion")}
                defaultValue="Pick a Region"
                className="select w-full"
                required
              >
                <option disabled={true}>Pick a Region</option>
                {regions.map((region, i) => (
                  <option key={i} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </fieldset>
          </div>
          <fieldset className="fieldset">
              <label className="label font-bold text-black text-xl">
                Which District You Want to Provide Service
              </label>
              <select
                {...register("riderDistrict")}
                defaultValue="Pick a District"
                className="select w-full"
                required
              >
                <option disabled={true}>Pick a District</option>
                {districtByRegion(riderRegion).map((d, i) => (
                  <option key={i} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </fieldset>
            <button className="btn btn-primary" type="submit">Send Request</button>
        </form>
      </div>
    </div>
  );
};

export default Rider;
