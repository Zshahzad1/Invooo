import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiUsers, FiGrid } from "react-icons/fi";
import utils from "../utils/utils";

const CustomCards = () => {
  const [users, setUsers] = useState([])
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${utils.BASE_URL}users`, {
        headers: {
          Authorization: `Bearer ${utils.token}`,
        },
      });

      const data = response.data;
      setUsers(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <section className="px-5">
      <div
        id="main"
        className="main-content flex-1 bg-gray-100 mt-12 md:mt-2 pb-24 md:pb-5"
      >
        {/* <div className="bg-gray-800 pt-3"> */}
        <div className="rounded-tl-3xl bg-gradient-to-r from-[#f07522] to-[#f29829] p-4 shadow text-2xl text-white">
          <h1 className="font-bold pl-2">Analytics</h1>
        </div>
        {/* </div> */}

        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 xl:w-1/3 p-6 transition hover:scale-105 ease-in-out duration-300 ">
            {/* <!--Metric Card--> */}
            <div className="bg-gradient-to-b from-pink-200 to-pink-100 border-b-4 border-pink-500 rounded-lg shadow-xl p-5">
              <div className="flex flex-row items-center">
                <div className="flex-shrink pr-4">
                  <div className="rounded-full p-5 bg-pink-600 shadow-lg shadow-slate-500/50	">
                    <FiUsers className="text-white text-2xl" />
                  </div>
                </div>
                <div className="flex-1 text-right md:text-center">
                  <h2 className="font-bold uppercase text-gray-600">
                    Total Users
                  </h2>
                  <p className="font-bold text-3xl">
                    {users?.length || 0}
                    <span className="text-pink-500">
                      <FiUsers />
                    </span>
                  </p>
                </div>
              </div>
            </div>
            {/* <!--/Metric Card--> */}
          </div>
          <div className="w-full md:w-1/2 xl:w-1/3 p-6 transition hover:scale-105 ease-in-out duration-300">
            {/* <!--Metric Card--> */}
            <div className="bg-gradient-to-b from-green-200 to-green-100 border-b-4 border-green-600 rounded-lg shadow-xl p-5">
              <div className="flex flex-row items-center">
                <div className="flex-shrink pr-4">
                  <div className="rounded-full p-5 bg-green-600 shadow-lg shadow-slate-500/50">
                    <FiUsers className="text-white text-2xl" />
                  </div>
                </div>
                <div className="flex-1 text-right md:text-center">
                  <h2 className="font-bold uppercase text-gray-600">
                    Active Users
                  </h2>
                  <p className="font-bold text-3xl">
                    {0}
                    <span className="text-green-500">
                      <FiUsers />
                    </span>
                  </p>
                </div>
              </div>
            </div>
            {/* <!--/Metric Card--> */}
          </div>
          <div className="w-full md:w-1/2 xl:w-1/3 p-6 transition hover:scale-105 ease-in-out duration-300">
            {/* <!--Metric Card--> */}
            <div className="bg-gradient-to-b from-yellow-200 to-yellow-100 border-b-4 border-yellow-600 rounded-lg shadow-xl p-5">
              <div className="flex flex-row items-center">
                <div className="flex-shrink pr-4">
                  <div className="rounded-full p-5 bg-yellow-600 shadow-lg shadow-slate-500/50">
                    <FiGrid className="text-white text-2xl" />
                  </div>
                </div>
                <div className="flex-1 text-right md:text-center">
                  <h2 className="font-bold uppercase text-gray-600">
                    Total Coupons
                  </h2>
                  <p className="font-bold text-3xl">
                    {0}
                    <span className="text-yellow-500">
                      <FiGrid />
                    </span>
                  </p>
                </div>
              </div>
            </div>
            {/* <!--/Metric Card--> */}
          </div>
          <div className="w-full md:w-1/2 xl:w-1/3 p-6 transition hover:scale-105 ease-in-out duration-300">
            {/* <!--Metric Card--> */}
            <div className="bg-gradient-to-b from-blue-200 to-blue-100 border-b-4 border-blue-500 rounded-lg shadow-xl p-5">
              <div className="flex flex-row items-center">
                <div className="flex-shrink pr-4">
                  <div className="rounded-full p-5 bg-blue-600 shadow-lg shadow-slate-500/50">
                    <FiGrid className="text-white text-2xl" />
                  </div>
                </div>
                <div className="flex-1 text-right md:text-center">
                  <h2 className="font-bold uppercase text-gray-600">
                    Total Brands
                  </h2>
                  <p className="font-bold text-3xl">
                    {0}
                    <span className="text-blue-500">
                      <FiGrid />
                    </span>
                  </p>
                </div>
              </div>
            </div>
            {/* <!--/Metric Card--> */}
          </div>
          <div className="w-full md:w-1/2 xl:w-1/3 p-6 transition hover:scale-105 ease-in-out duration-300"></div>
          <div className="w-full md:w-1/2 xl:w-1/3 p-6 transition hover:scale-105 ease-in-out duration-300"></div>
        </div>
      </div>
    </section>
  );
};

export default CustomCards;
