import React, { useEffect } from "react";
import { useDeleteDataMutation, useGetItemsQuery } from "./api";
import toast from "react-hot-toast";
import { FiEdit3 } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Crud = () => {
  const { data, isLoading } = useGetItemsQuery();
  const [deleteData] = useDeleteDataMutation();

  const handleDelete = async id => {
    try {
      await deleteData(id).unwrap();
      toast.success("Employee deleted");
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className="h-[100%] w-[100%] flex flex-col items-center mt-16 gap-2">
      <Link to="/addTask">
        <button
          data-aos="fade-down"
          className="p-3 bg-orange-300 w-[450px] rounded text-white font-semibold hover:bg-orange-200 transition"
        >
          Add Employee +
        </button>
      </Link>
      <table className="">
        <thead>
          <tr className="bg-slate-400 text-white ">
            <th className="p-2 w-[60px]">Id</th>
            <th className="p-2 w-[100px]">Name</th>
            <th className="p-2 w-[150px]">Role</th>
            <th className="p-2 w-[70px]">Delete</th>
            <th className="p-2 w-[70px]">Edit</th>
          </tr>
        </thead>
        <tbody className="text-center text-slate-600">
          {isLoading ? (
            <>Loading...</>
          ) : (
            [...(data || [])]?.reverse().map((li, ind) => {
              const { id, name, role } = li;
              return (
                <tr
                  key={ind}
                  className="bg-yellow-100 hover:bg-orange-200 transition border-2 "
                >
                  <td className="p-2">{id}</td>
                  <td className="p-2">{name}</td>
                  <td className="p-2">{role}</td>
                  <td className="p-2 text-red-800 cursor-pointer ">
                    <span
                      className=" flex justify-center items-center h-[30px]"
                      onClick={() => handleDelete(id)}
                    >
                      <RxCross2 />
                    </span>
                  </td>
                  <td className=" text-blue-700 cursor-pointer ">
                    <Link to={`/updateTask/${id}`}>
                      <span className=" flex justify-center items-center h-[30px]">
                        <FiEdit3 />
                      </span>
                    </Link>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Crud;
