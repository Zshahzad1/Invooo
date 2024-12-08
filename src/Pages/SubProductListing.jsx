import React, { useEffect, useState } from "react";
import { FiUserPlus, FiEdit, FiTrash } from "react-icons/fi";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SubProductListing = () => {
  const { id } = useParams();
  const [subProducts, setSubProducts] = useState([]);
  const [deleteBrandData, setDeleteBrandData] = useState(null);
  const navigate = useNavigate();

  const API =
    "http://157.241.58.61:1337/api/products?populate=postedBy&populate=city";

  useEffect(() => {
    const getProductData = async () => {
      try {
        const response = await axios.get(API);
        setSubProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    getProductData();
  }, []);

  const addBrand = (newBrand) => {
    const updatedBrands = [...subProducts, newBrand];
    setSubProducts(updatedBrands);
    setShowAddModal(false);
  };

  const editBrand = (updatedBrand) => {
    const updatedBrands = subProducts.map((item) =>
      item.id === updatedBrand.id ? updatedBrand : item
    );
    setSubProducts(updatedBrands);
    setShowEditModal(false);
  };

  const deleteBrand = () => {
    const updatedBrands = subProducts.filter(
      (item) => item.id !== deleteBrandData.id
    );
    setSubProducts(updatedBrands);
    setShowDeleteModal(false);
  };


  return (
    <div className="container mx-auto py-6 px-4">
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-700">Products Listings</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-gradient-to-r from-[#f07522] to-[#f29829] text-white font-bold py-2 px-4 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300"
        >
          <div className="flex gap-2 justify-center items-center">
            <FiUserPlus size={18} />
            Add Product
          </div>
        </button>
      </div>

    </div>
  );
};

export default SubProductListing;
