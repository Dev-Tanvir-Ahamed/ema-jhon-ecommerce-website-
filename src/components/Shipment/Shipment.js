import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../App";
import "./Shipment.css";
const Shipment = () => {
  const { register, errors, handleSubmit } = useForm();
  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };
  console.log(errors);

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="ship-form">
        <label>Name</label>
        <input
          type="text"
          defaultValue={loggedInUser.name}
          // {...register("name", { required: true })}
        />
        {/* {errors.name && "Name is required"} */}
        <label>Email</label>
        <input
          type="text"
          defaultValue={loggedInUser.email}
          {...register("Email", {
            required: true,
            pattern:
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          })}
          // {...register("email", { required: true })}
        />
        {/* {errors.email && "Email is required"} */}

        <input type="submit" />
      </form>
    </div>
  );
};

export default Shipment;
