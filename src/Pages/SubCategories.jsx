import React, { useEffect, useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import utils from "../utils/utils";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { FaPlus } from "react-icons/fa";
import { useParams } from "react-router-dom";

const SubCategories = () => {
  const { id } = useParams();
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [rowsLimit] = useState(10);
  const [rowsToShow, setRowsToShow] = useState([]);
  const [customPagination, setCustomPagination] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [modalAction, setModalAction] = useState("add");

  useEffect(() => {
      fetchSubCategories();
  }, []);

  const fetchSubCategories = async () => {
    try {
      const response = await axios.get(
        `${utils.BASE_URL}subcategories?filters[category][id]=${id}`,
        {
          headers: {
            Authorization: `Bearer ${utils.token}`,
          },
        }
      );

      const data = response?.data?.data;

      const subCategories = data?.map((subCategory) => ({
        id: subCategory.id,
        Name: subCategory.name || "No name provided",
      }));

      setSubCategoryList(subCategories);
      setTotalPage(Math.ceil(subCategories.length / rowsLimit));
      setRowsToShow(subCategories.slice(0, rowsLimit));
      setCustomPagination(
        Array(Math.ceil(subCategories.length / rowsLimit)).fill(null)
      );
    } catch (error) {
      console.error("Error fetching subcategory data:", error);
    }
  };

  const nextPage = () => {
    const startIndex = rowsLimit * (currentPage + 1);
    const newArray = subCategoryList.slice(startIndex, startIndex + rowsLimit);
    setRowsToShow(newArray);
    setCurrentPage(currentPage + 1);
  };

  const previousPage = () => {
    const startIndex = (currentPage - 1) * rowsLimit;
    const newArray = subCategoryList.slice(startIndex, startIndex + rowsLimit);
    setRowsToShow(newArray);
    setCurrentPage(currentPage - 1);
  };

  const changePage = (value) => {
    const startIndex = value * rowsLimit;
    const newArray = subCategoryList.slice(startIndex, startIndex + rowsLimit);
    setRowsToShow(newArray);
    setCurrentPage(value);
  };

  const handleEditClick = (subCategory) => {
    setSelectedSubCategory(subCategory);
    setModalAction("edit");
    setIsModalOpen(true);
  };

  const handleAddClick = () => {
    setModalAction("add");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSubCategory(null);
  };

  const handleSaveSubCategory = (subCategoryData) => {
    if (modalAction === "edit") {
      console.log("Updated subcategory:", subCategoryData);
    } else if (modalAction === "add") {
      console.log("New subcategory:", subCategoryData);
    }
    handleCloseModal();
  };

  const handleDeleteSubCategory = (subCategoryId) => {
    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this subcategory?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              await axios.delete(`${utils.BASE_URL}subcategories/${subCategoryId}`, {
                headers: {
                  Authorization: `Bearer ${utils.token}`,
                },
              });
              setSubCategoryList(
                subCategoryList.filter((subCategory) => subCategory.id !== subCategoryId)
              );
              alert("Subcategory deleted successfully");
            } catch (error) {
              console.error("Error deleting subcategory:", error);
              alert("Failed to delete subcategory");
            }
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-700">All SubCategories</h1>
        <button className="bg-gradient-to-r from-[#f07522] to-[#f29829] text-white font-bold py-2 px-4 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300">
          <div
            className="flex gap-2 justify-center items-center"
            onClick={handleAddClick}
          >
            <FaPlus />
            Add SubCategory
          </div>
        </button>
      </div>

      {/* Table */}
      <div className="h-full bg-white flex items-center justify-center">
        <div className="w-full">
          <div className="w-full overflow-x-scroll md:overflow-auto max-w-7xl 2xl:max-w-none">
            <table className="table-auto w-full text-left font-inter border">
              <thead className="rounded-lg text-base text-white font-semibold w-full">
                <tr className="bg-[#222E3A]/[6%]">
                  <th className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap">
                    ID
                  </th>
                  <th className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap">
                    SubCategory Name
                  </th>
                  {/* <th className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap">
                    Description
                  </th> */}
                  <th className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {rowsToShow.map((subCategory, index) => (
                  <tr
                    key={subCategory.id}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-[#222E3A]/[6%]"
                    }`}
                  >
                    <td className="py-2 px-3 font-normal text-base whitespace-nowrap">
                      {subCategory.id}
                    </td>
                    <td className="py-2 px-3 font-normal text-base whitespace-nowrap">
                      {subCategory.Name}
                    </td>
                    {/* <td className="py-2 px-3 font-normal text-base whitespace-nowrap">
                      {subCategory.Description}
                    </td> */}
                    <td className="py-2 px-3 font-normal text-base whitespace-nowrap">
                      <div className="flex gap-2">
                        <button
                          className="text-blue-500"
                          onClick={() => handleEditClick(subCategory)}
                        >
                          <FiEdit size={18} />
                        </button>
                        <button
                          className="text-red-500"
                          onClick={() => handleDeleteSubCategory(subCategory.id)}
                        >
                          <FiTrash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="w-full flex justify-center sm:justify-between flex-col sm:flex-row gap-5 mt-1.5 px-1 items-center">
            <div className="text-lg">
              Showing {currentPage === 0 ? 1 : currentPage * rowsLimit + 1} to{" "}
              {currentPage === totalPage - 1
                ? subCategoryList.length
                : (currentPage + 1) * rowsLimit}{" "}
              of {subCategoryList.length} entries
            </div>
            <div className="flex">
              <ul
                className="flex justify-center items-center gap-x-[10px]"
                role="navigation"
                aria-label="Pagination"
              >
                <li
                  className={`prev-btn flex items-center justify-center w-[36px] rounded-[6px] h-[36px] border-[1px] border-solid border-[#E4E4EB] ${
                    currentPage === 0
                      ? "bg-[#cccccc] pointer-events-none"
                      : "cursor-pointer"
                  }`}
                  onClick={previousPage}
                >
                  <img src="https://www.tailwindtap.com/assets/travelagency-admin/leftarrow.svg" />
                </li>
                {customPagination.map((_, index) => (
                  <li
                    key={index}
                    className={`flex items-center justify-center w-[36px] rounded-[6px] h-[34px] border-[1px] border-solid bg-[#FFFFFF] cursor-pointer ${
                      currentPage === index
                        ? "text-blue-600 border-sky-500"
                        : "border-[#E4E4EB] text-[#212B36]"
                    }`}
                    onClick={() => changePage(index)}
                  >
                    {index + 1}
                  </li>
                ))}
                <li
                  className={`next-btn flex items-center justify-center w-[36px] rounded-[6px] h-[36px] border-[1px] border-solid border-[#E4E4EB] ${
                    currentPage === totalPage - 1
                      ? "bg-[#cccccc] pointer-events-none"
                      : "cursor-pointer"
                  }`}
                  onClick={nextPage}
                >
                  <img src="https://www.tailwindtap.com/assets/travelagency-admin/rightarrow.svg" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <SubCategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveSubCategory}
        actionType={modalAction}
        subCategoryData={selectedSubCategory}
      />
    </div>
  );
};

export default SubCategories;

const SubCategoryModal = ({
  isOpen,
  onClose,
  onSave,
  actionType,
  subCategoryData,
}) => {
  const [formData, setFormData] = useState({
    Name: "",
    Description: "",
  });

  useEffect(() => {
    if (actionType === "edit" && subCategoryData) {
      setFormData({
        Name: subCategoryData.Name,
        Description: subCategoryData.Description,
      });
    } else if (actionType === "add") {
      setFormData({
        Name: "",
        Description: "",
      });
    }
  }, [actionType, subCategoryData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-2xl font-semibold">
              {actionType === "edit" ? "Edit SubCategory" : "Add SubCategory"}
            </h2>
            <div className="mt-4">
              <label className="block text-sm">SubCategory Name</label>
              <input
                type="text"
                name="Name"
                value={formData.Name}
                className="border p-2 w-full mt-2"
                onChange={handleInputChange}
                placeholder="Enter subcategory name"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm">Description</label>
              <textarea
                name="Description"
                value={formData.Description}
                className="border p-2 w-full mt-2"
                onChange={handleInputChange}
                placeholder="Enter subcategory description"
              />
            </div>
            <div className="mt-4 flex justify-end gap-4">
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleSave}
              >
                {actionType === "edit" ? "Save Changes" : "Add SubCategory"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
