import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData } from "react-router";
import useAuth from "../../hooks/useAuth/useAuth";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../hooks/UseAxiosSecure/UseAxiosSecure";

const SendParcel = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = useAuth();
  const { register, handleSubmit, control } = useForm();
  const serviceCenters = useLoaderData();
  const duplicateRegions = serviceCenters.map((c) => c.region);
  const regions = [...new Set(duplicateRegions)];
  const senderRegion = useWatch({ control, name: "senderRegion" });
  const receiverRegion = useWatch({ control, name: "receiverRegion" });
  const districtByRegion = (region) => {
    const regionBasedDistrict = serviceCenters.filter(
      (c) => c.region === region
    );
    const districts = regionBasedDistrict.map((d) => d.district);
    return districts;
  };

  const handleParcelSending = (data) => {
    let cost = 0;

    const isDocument = data.parcelType === "document";
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;

    const parcelWeight = parseFloat(data.parcelWeight);
    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight < 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const extraWeight = parcelWeight - 3;
        cost = isSameDistrict
          ? 110 + extraWeight * 40
          : 110 + extraWeight * 40 + 40;
      }
    }
    data.cost = cost;
    axiosSecure.post('/sendParcel',data)
    .then(result=>{
      console.log(result.data)
      if(result.data.insertedId){
      Swal.fire({
      title: "Parcel Creation is Successfull",
      icon: "success",
      draggable: true,
      });

      }



    })


  };
  return (
    <div className="max-w-6xl mx-auto space-y-3 mt-5">
      {/* heading */}
      <h1 className="text-4xl font-bold">Send A Parcel</h1>
      <p className="text-2xl font-bold">Enter your parcel details</p>
      {/* divider */}
      <div className="border border-gray-300 "></div>
      <form onSubmit={handleSubmit(handleParcelSending)}>
        {/* parcel type */}
        <div>
          <fieldset className="fieldset flex ">
            <label className="label text-xl font-bold text-black mr-3">
              <input
                type="radio"
                {...register("parcelType")}

                value="document"
                className="radio"
                defaultChecked
              />
              Document
            </label>
            <label className="label text-xl font-bold text-black ">
              <input
                type="radio"
                {...register("parcelType")}

                value="non-document"
                className="radio"
              />
              Non-Document
            </label>
          </fieldset>
        </div>
        {/* parcel name, weight */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-5">
          <fieldset className="fieldset">
            <label className="label font-bold text-black text-xl">
              Parcel Name
            </label>
            <input
              type="text"
              {...register("parcelName")}
              className="input w-full"
              placeholder="Parcel Name"
              required
            />
          </fieldset>
          <fieldset className="fieldset">
            <label className="label font-bold text-black text-xl">
              Parcel Weight(kg)
            </label>
            <input
              type="number"
              {...register("parcelWeight")}
              className="input w-full"
              placeholder="Parcel Weight"
              required
            />
          </fieldset>
        </div>
        {/* divider */}
        <div className="border border-gray-300"></div>

        {/* sender details and recever details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* sender details */}
          <div>
            <fieldset className="fieldset">
              <label className="label font-bold text-black text-xl">
                Sender Name
              </label>
              <input
                type="text"
                {...register("senderName")}
                className="input w-full"
                placeholder="Sender Name"
                required
              />
            </fieldset>
            <fieldset className="fieldset">
              <label className="label font-bold text-black text-xl">
                Address
              </label>
              <input
                type="text"
                {...register("senderAddress")}
                className="input w-full"
                placeholder="Address"
                required
              />
            </fieldset>
            <fieldset className="fieldset">
              <label className="label font-bold text-black text-xl">
                Sender Phone NO
              </label>
              <input
                type="number"
                {...register("senderPhoneNo")}
                className="input w-full"
                placeholder="Phone No"
                required
              />
            </fieldset>
            <fieldset className="fieldset">
              <label className="label font-bold text-black text-xl">
                Sender Email
              </label>
              <input
                type="email"
                {...register("senderEmail")}
                className="input w-full"
                placeholder="Phone No"
                defaultValue={user?.email}
                readOnly
              />
            </fieldset>
            <fieldset className="fieldset">
              <label className="label font-bold text-black text-xl">
                Select Your Region
              </label>
              <select
                {...register("senderRegion")}
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
            <fieldset className="fieldset">
              <label className="label font-bold text-black text-xl">
                Select Your District
              </label>
              <select
                {...register("senderDistrict")}
                defaultValue="Pick a District"
                className="select w-full"
                required
              >
                <option disabled={true}>Pick a District</option>
                {districtByRegion(senderRegion).map((d, i) => (
                  <option key={i} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Pickup Instruction</legend>
              <textarea
                {...register("pickupInstruction")}
                className="textarea h-24 w-full"
                placeholder="Pickup Instruction"
                required
              ></textarea>
            </fieldset>
          </div>

          {/* receiver details */}
          <div>
            <fieldset className="fieldset">
              <label className="label font-bold text-black text-xl">
                Receiver Name
              </label>
              <input
                type="text"
                {...register("receiverName")}
                className="input w-full"
                placeholder="Receiver Name"
                required
              />
            </fieldset>
            <fieldset className="fieldset">
              <label className="label font-bold text-black text-xl">
                Receiver Address
              </label>
              <input
                type="text"
                {...register("receiverAddress")}
                className="input w-full"
                placeholder="Address"
                required
              />
            </fieldset>
            <fieldset className="fieldset">
              <label className="label font-bold text-black text-xl">
                Receiver Phone NO
              </label>
              <input
                type="number"
                {...register("receiverPhoneNo")}
                className="input w-full"
                placeholder="Phone No"
                required
              />
            </fieldset>
            <fieldset className="fieldset">
              <label className="label font-bold text-black text-xl">
                Select Receiver Region
              </label>
              <select
                {...register("receiverRegion")}
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
            <fieldset className="fieldset">
              <label className="label font-bold text-black text-xl">
                Select Receiver District
              </label>
              <select
                {...register("receiverDistrict")}
                defaultValue="Pick a District"
                className="select w-full"
                required
              >
                <option disabled={true}>Pick a District</option>
                {districtByRegion(receiverRegion).map((d, i) => (
                  <option key={i} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Delivery Instruction</legend>
              <textarea
                {...register("deliveryInstruction")}
                className="textarea h-24 w-full"
                placeholder="Pickup Instruction"
                required
              ></textarea>
            </fieldset>
          </div>
        </div>
        <p>* PickUp Time 4pm-7pm Approx.</p>
        <button type="submit" className="btn btn-primary bg-primary">
          Proceed to Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default SendParcel;
