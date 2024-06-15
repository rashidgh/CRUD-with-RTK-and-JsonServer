import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { useAddDataMutation } from "./api";
import toast from "react-hot-toast";
import AOS from "aos";
import "aos/dist/aos.css";

const AddTask = () => {
  let [state, setState] = useState({
    name: "",
    role: "",
  });
  let navigate = useNavigate();
  let { name, role } = state;

  const [addData] = useAddDataMutation();

  let handleSubmit = async e => {
    e.preventDefault();
    // Check if name or role is empty
    if (!name && !role) {
      toast.error("Credentials can't be empty");
      return;
    }
    if (!name) {
      toast.error("Name can't be empty");
      return;
    }
    if (!role) {
      toast.error("Role can't be empty");
      return;
    }
    try {
      await addData(state).unwrap();
      navigate("/");
      setState({ name: "", role: "" });
      toast.success("employee added");
    } catch (err) {
      console.log(err);
      toast.error("something went wrong");
    }
  };
  let handleChange = e => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  // const extraEndPoint = api.injectEndpoints({
  //   endpoints: builder => ({
  //     addData: builder.mutation({
  //       query: data => ({
  //         url: data,
  //         method: "POST",
  //         body: data,
  //       }),
  //     }),
  //   }),
  // });
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="h-[100vh] w-[100vw] flex justify-center items-center relative flex-col gap-6 ">
      <Link to="/">
        <span
          className="absolute top-[180px] right-[530px] text-2xl text-red-900"
          data-aos="fade-down"
        >
          {" "}
          <RxCross2 />
        </span>
      </Link>
      <p className="font-semibold text-orange-400 " data-aos="fade-left">
        Add Employee Details
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          data-aos="zoom-in"
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          className="p-3 w-[300px] rounded"
          placeholder="Enter Employee name"
        />
        <input
          data-aos="zoom-in"
          type="text"
          name="role"
          value={role}
          onChange={handleChange}
          className="p-3 w-[300px] rounded"
          placeholder="Enter Employee role"
        />

        <button
          className="p-3 w-[300px] rounded bg-orange-300 hover:bg-orange-200 transition-all text-white font-semibold"
          data-aos="fade-right"
        >
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default AddTask;
