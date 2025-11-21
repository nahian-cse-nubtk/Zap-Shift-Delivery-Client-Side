import React from "react";
import { useForm } from "react-hook-form";

const SendParcel = () => {
  const { register, handleSubmit } = useForm();

  const handleParcelSending = (data) => {
    console.log(data);
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
                name="radio-1"
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
                name="radio-1"
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
            />
          </fieldset>
        </div>
        {/* divider */}
        <div className="border border-gray-300"></div>

        {/* sender details and recever details */}
        <div>
          {/* sender details */}
          <div>
            <fieldset className="fieldset">
              <label className="label font-bold text-black text-xl">
                Sender Name
              </label>
              <input
                type="number"
                {...register("senderName")}
                className="input w-full"
                placeholder="Sender Name"
              />
            </fieldset>
            <fieldset className="fieldset">
              <label className="label font-bold text-black text-xl">
                Address
              </label>
              <input
                type="number"
                {...register("address")}
                className="input w-full"
                placeholder="Address"
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
              />
            </fieldset>
            <fieldset className="fieldset">
              <label className="label font-bold text-black text-xl">
                Select Your Region
              </label>
              <select defaultValue="Pick a Region" className="select w-full">
                <option disabled={true}>Pick a Region</option>
                <option>Crimson</option>
                <option>Amber</option>
                <option>Velvet</option>
              </select>
            </fieldset>
            <fieldset className="fieldset">
              <label className="label font-bold text-black text-xl">
                Select Your District
              </label>
              <select defaultValue="Pick a District" className="select w-full">
                <option disabled={true}>Pick a District</option>
                <option>Crimson</option>
                <option>Amber</option>
                <option>Velvet</option>
              </select>
            </fieldset>
            <fieldset className="fieldset">
              <label className="label font-bold text-black text-xl">
                Sender Name
              </label>
              <input
                type="number"
                {...register("senderName")}
                className="input w-full"
                placeholder="Sender Name"
              />
            </fieldset>
          </div>

          {/* receiver details */}
          <div></div>
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
