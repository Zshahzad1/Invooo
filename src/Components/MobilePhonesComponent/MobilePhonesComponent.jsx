import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import utils from "../../utils/utils";
import { MdDelete, MdEditSquare } from "react-icons/md";
import { MdMoreVert } from "react-icons/md";
import { FaPlus } from "react-icons/fa";

const MobilePhonesComponent = () => {
  const [motors, setMotors] = useState([]);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState({});

  useEffect(() => {
    const fetchMotors = async () => {
      try {
        const response = await axios.get(
          `${utils.BASE_URL}phones?populate=postedBy&populate=city`,
          {
            headers: {
              Authorization: `Bearer ${utils.token}`,
            },
          }
        );
        const motorsList = response.data.data.map((item) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          price: item.price,
          year: item.year,
          picture: item.picture?.picture?.[0] || null,
        }));
        setMotors(motorsList);
      } catch (error) {
        console.error("Error fetching Motors:", error);
      }
    };

    fetchMotors();
  }, []);

  // Navigate to the Edit Form
  const openEditForm = (motorId) => {
    navigate(`/edit-motor/${motorId}`);
  };

  // Navigate to Add New Motor page
  const addListing = () => {
    navigate("/add-motors");
  };

  return (
    <>
      <div className="flex justify-end mb-6">
        <button
          onClick={addListing}
          className="px-6 py-2 flex items-center gap-[6px] text-white bg-gray-500 rounded-md hover:opacity-90 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white"
        >
          <FaPlus />
          Add Listing
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {motors?.map((motor) => (
          <div
            key={motor.id}
            className="relative flex flex-col items-center overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800"
          >
            {/* <img
              className="w-24 h-24 mb-3 rounded-full shadow-lg"
              src={
                motor.picture
                  ? `${utils.IMG_BASE_URL}${motor.picture}`
                  : "/placeholder-image.jpg"
              }
              alt={motor.title || "Motor Image"}
            />
            <h5 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
              {motor.title || "Unknown Motor"}
            </h5>
            <p className="mt-2 text-sm font-bold text-gray-700 dark:text-gray-200">
              Price: ${motor.price || "N/A"}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Year: {motor.year || "N/A"}
            </p>
            <div className="flex justify-center items-center flex-col">
              <button
                onClick={() => openEditForm(motor.id)}
                className="absolute top-2 right-2 inline-flex items-center text-[#f29829] hover:opacity-95 hover:scale-105 rounded-lg p-2 transition"
              >
                <MdEditSquare className="w-6 h-6" />
              </button>
              <button className="absolute top-10 right-2 inline-flex items-center text-red-400  hover:opacity-95 hover:scale-105  rounded-lg p-2 transition">
                <MdDelete className="w-6 h-6" />
              </button>
            </div> */}

            <img
              className="w-full max-h-[130px] object-cover mb-3"
              src={
                motor.picture
                  ? `${utils.IMG_BASE_URL}${motor.picture}`
                  : "/placeholder-image.jpg"
              }
              alt={motor.title || "Motor Image"}
            />
            <div className="p-4  w-full">
              <h5 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
                {motor.title || "Unknown Motor"}
              </h5>
              <p className="mt-2 text-sm font-bold text-gray-700 dark:text-gray-200">
                Price: ${motor.price || "N/A"}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Year: {motor.year || "N/A"}
              </p>
              <div className="flex justify-center items-center gap-1 flex-col absolute top-2 right-2">
                <button
                  onClick={() => openEditForm(motor.id)}
                  className=" inline-flex items-center text-white hover:opacity-95 hover:scale-105 bg-gray-500 rounded-full p-1 transition"
                >
                  <MdEditSquare className="w-5 h-5" />
                </button>
                <button className=" inline-flex items-center bg-gray-500 rounded-full text-white  hover:opacity-95 hover:scale-105 p-1 transition">
                  <MdDelete className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MobilePhonesComponent;
