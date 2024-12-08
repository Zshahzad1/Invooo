import React, { useEffect, useState } from "react";
import { FiUserPlus, FiEdit, FiTrash } from "react-icons/fi";
import { useSelector } from "react-redux";

const Newsletters = () => {
  const { currentColor } = useSelector((state) => state.theme);

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-700">All Newsletters</h1>
        <button
          className="text-white font-bold py-2 px-4 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300"
          style={{ backgroundColor: currentColor }}
        >
          Add Newsletter
        </button>
      </div>
    </div>
  );
};

export default Newsletters;
