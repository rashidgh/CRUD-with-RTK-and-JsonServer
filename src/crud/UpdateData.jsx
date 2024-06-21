import toast from "react-hot-toast";
import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetItemsQuery, useUpdateDataMutation } from "./api";

const UpdateData = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  const { id } = useParams();
  const [updateData] = useUpdateDataMutation();
  const { data } = useGetItemsQuery();
  let navigate = useNavigate();

    const employee = data?.find(emp => emp.id === parseInt(id));
    console.log(employee)
  const [formData, setFormData] = useState({
    name: employee?.name || "",
    role: employee?.role || "",
  });

//   useEffect(() => {
//     if (employee) {
//       setFormData({ name: employee.name, role: employee.role });
//     }
//   }, [employee]);

  let handleChange = e => {
    let { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  let handleSubmit = async e => {
    e.preventDefault();
    if (!formData.name && !role) {
      toast.error("Credentials can't be empty");
      return;
    }
    if (!formData.name) {
      toast.error("Name can't be empty");
      return;
    }
    if (!formData.role) {
      toast.error("Role can't be empty");
      return;
    }
    try {
      await updateData({ id, data: formData }).unwrap();
      toast.success("employee updated");
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error("failed to update data");
    }
  };

  return (
    <div className="h-[85vh] w-[100vw] flex flex-col gap-6 justify-center items-center relative">
      <Link to="/">
        <span
          className="absolute top-[160px] right-[530px] text-2xl text-red-900"
          data-aos="fade-down"
        >
          {" "}
          <RxCross2 />
        </span>
      </Link>
      <p className="font-semibold text-blue-400 " data-aos="fade-left">
        Update Employee Details
      </p>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <input
          data-aos="zoom-in"
          type="text"
          name="name"
          className="p-3 w-[300px] rounded"
          placeholder="Enter Employee name"
          onChange={handleChange}
          value={formData.name}
        />
        <input
          data-aos="zoom-in"
          type="text"
          name="role"
          className="p-3 w-[300px] rounded"
          placeholder="Enter Employee role"
          onChange={handleChange}
          value={formData.role}
        />

        <button
          className="p-3 w-[300px] rounded  hover:bg-blue-300 transition-all text-white font-semibold bg-blue-400"
          data-aos="fade-right"
        >
          Update Employee
        </button>
      </form>
    </div>
  );
};

export default UpdateData;
