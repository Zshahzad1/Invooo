import React, { useState, useEffect } from "react";
import utils from "../utils/utils";
import axios from "axios";
import { motion } from "framer-motion";

// Import components
import MotorsComponent from "../Components/MotorsComponent/MotorsComponent";
import ClassifiedsComponent from "../Components/ClassifiedsComponent/ClassifiedsComponent";
import FurnitureHomeGarden from "../Components/FurnitureHomeGarden/FurnitureHomeGarden";
import JobsComponent from "../Components/JobsComponent/JobsComponent";
import MobilePhonesComponent from "../Components/MobilePhonesComponent/MobilePhonesComponent";
import PropertyForRentComponent from "../Components/PropertyForRentComponent/PropertyForRentComponent";
import PropertyForSaleComponent from "../Components/PropertyForSaleComponent/PropertyForSaleComponent";
import CommunityComponent from "../Components/CommunityComponent/CommunityComponent";
import { useSelector } from "react-redux";

const Products = () => {
  const [category, setCategory] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [subCategory, setSubCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState("ALL");
  const { currentColor } = useSelector((state) => state.theme);
  // Map of components
  const componentsMap = {
    Classifieds: ClassifiedsComponent,
    Community: CommunityComponent,
    "Furniture, Home & Garden": FurnitureHomeGarden,
    Jobs: JobsComponent,
    "Mobile Phones & Tablets": MobilePhonesComponent,
    Motors: MotorsComponent,
    "Property for Rent": PropertyForRentComponent,
    "Property for Sale": PropertyForSaleComponent,
  };

  // Fetch categories
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${utils.BASE_URL}categories?populate[icon][fields]=url`,
        {
          headers: {
            Authorization: `Bearer ${utils.token}`,
          },
        }
      );
      const data = response?.data?.data;
      const categoriesData = data?.map((data) => ({
        id: data.id,
        name: data.name,
        icon: `${utils.IMG_BASE_URL}${data?.icon?.url}`,
      }));
      setCategory(categoriesData);

      // Automatically select the first category
      if (categoriesData.length > 0) {
        setSelectedCategory(categoriesData[0]);
        setSelectedCategoryId(categoriesData[0].id);
        fetchSubCategories(categoriesData[0].id); // Fetch subcategories for the first category
      }
    } catch (error) {
      console.log("Error while fetching category data", error);
    }
  };

  // Fetch Subcategories
  const fetchSubCategories = async (categoryId) => {
    try {
      const response = await axios.get(
        `${utils.BASE_URL}subcategories?filters[category][id]=${categoryId}`,
        {
          headers: {
            Authorization: `Bearer ${utils.token}`,
          },
        }
      );
      const data = response?.data?.data;
      const subCategoriesData = data?.map((data) => ({
        id: data.id,
        name: data.name,
        icon: `${utils.IMG_BASE_URL}${data?.icon?.url}`,
      }));

      // Include "ALL" as the first subcategory
      const allOption = { id: "ALL", name: "ALL", icon: "" };
      const updatedSubCategories = [allOption, ...subCategoriesData];
      setSubCategory(updatedSubCategories);

      // Automatically select "ALL" for default view
      setSelectedSubCategory("ALL");
    } catch (error) {
      console.log("Error while fetching subcategory data", error);
    }
  };

  const handleCategoryClick = (data) => {
    setSelectedCategory(data); // Set selected category
    setSelectedCategoryId(data.id); // Update selected category ID
    setSelectedSubCategory("ALL"); // Reset subcategory selection to "ALL"
    fetchSubCategories(data.id); // Fetch subcategories for selected category
  };

  const gridVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Heading */}
      <motion.h1
        className="text-2xl font-bold text-gray-800 mb-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Explore Categories & Subcategories
      </motion.h1>

      {/* Categories Section */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
        initial="hidden"
        animate="visible"
        variants={gridVariants}
      >
        {category?.map((data) => (
          <motion.div
            key={data.id}
            onClick={() => handleCategoryClick(data)}
            className={`cursor-pointer p-4 rounded-lg flex items-center gap-5 shadow-md ${
              selectedCategory?.id === data.id
                ? `text-white`
                : "text-gray-700"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              backgroundColor:
                selectedCategory?.id === data.id ? currentColor : "white",
            }}
          >
            <img className="w-10 h-10" src={data.icon} alt={data.name} />
            <p className="text-center font-medium">{data.name}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Subcategories Section */}
      <motion.div
        className="mt-8"
        initial="hidden"
        animate="visible"
        variants={gridVariants}
      >
        <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">
          Subcategories of {selectedCategory?.name || "Category"}
        </h2>
        <div className="flex flex-wrap gap-4 justify-center">
          {subCategory?.map((data) => (
            <motion.div
              key={data.id}
              onClick={() => setSelectedSubCategory(data.name)}
              className={`cursor-pointer px-6 py-3 rounded-lg shadow-md ${
                selectedSubCategory === data.name
                  ? "text-white"
                  : "text-gray-700"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                backgroundColor:
                  selectedSubCategory === data.name ? currentColor : "white",
              }}
            >
              {data.name}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Content Section */}
      <motion.div
        className="mt-8 p-6 bg-gray-200 rounded-lg shadow-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-xl font-semibold text-gray-800">
          {selectedCategory?.name || "Category"} - {selectedSubCategory}
        </h3>

        {/* Dynamically render the selected component */}
        {selectedCategory &&
          componentsMap[selectedCategory.name] &&
          React.createElement(componentsMap[selectedCategory.name], {
            subCategory: selectedSubCategory,
          })}
      </motion.div>
    </div>
  );
};

export default Products;
