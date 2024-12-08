import React, { useState, useEffect } from "react";
import axios from "axios";
import utils from "../../utils/utils";
import { useParams } from "react-router-dom";
const EditMotorForm = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: { category: 1, subcategory: 49 },
    year: 1,
    kilometer: 10,
    postedBy: 1,
    location: { Latitude: "", Longitude: "", Address: "" },
    city: 1,
    condition: "Used",
    color: "Blue",
    transmission: "Automatic Transmission",
    bodyType: "SUV",
    fuelType: "Petrol",
    availability: "Available",
    seat: 5,
    picture: [],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      // Fetch the motor data if an `id` is provided (edit mode)
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `http://157.241.58.61:1337/api/motors/${id}`,
            {
              headers: {
                Authorization: `Bearer ${utils.token}`,
              },
            }
          );
          setFormData(response.data.data); // assuming your response has a `data` property
        } catch (err) {
          setError("Failed to fetch motor data. Please try again.");
        }
      };
      fetchData();
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    const uploadedImages = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setFormData((prev) => ({
      ...prev,
      picture: uploadedImages,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const formPayload = {
        data: {
          title: formData.title,
          description: formData.description,
          price: formData.price,
          category: formData.category,
          year: formData.year,
          kilometer: formData.kilometer,
          postedBy: formData.postedBy,
          location: formData.location,
          city: formData.city,
          condition: formData.condition,
          color: formData.color,
          transmission: formData.transmission,
          bodyType: formData.bodyType,
          fuelType: formData.fuelType,
          availability: formData.availability,
          seat: formData.seat,
          picture: { picture: formData.picture }, // Attach the picture
        },
      };

      if (id) {
        // If `id` exists, perform an update (PUT request)
        const response = await axios.put(
          `http://157.241.58.61:1337/api/motors/${id}`,
          formPayload,
          {
            headers: {
              Authorization: `Bearer ${utils.token}`,
            },
          }
        );
        if (response.status === 200) {
          alert("Motor listing updated successfully!");
        }
      } else {
        // If no `id`, perform a create (POST request)
        const response = await axios.post(
          "http://157.241.58.61:1337/api/motors",
          formPayload,
          {
            headers: {
              Authorization: `Bearer ${utils.token}`,
            },
          }
        );
        if (response.status === 200) {
          alert("Motor listing added successfully!");
          setFormData({
            title: "",
            description: "",
            price: "",
            category: { category: 1, subcategory: 49 },
            year: 1,
            kilometer: 10,
            postedBy: 1,
            location: { Latitude: "", Longitude: "", Address: "" },
            city: 1,
            condition: "Used",
            color: "Blue",
            transmission: "Automatic Transmission",
            bodyType: "SUV",
            fuelType: "Petrol",
            availability: "Available",
            seat: 5,
            picture: [],
          });
        }
      }
    } catch (err) {
      setError("Failed to submit the form. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        {/* {id ? "Edit Motor" : "Add New Motor"} */}
        {"Edit Motor"}
      </h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div className="flex flex-col">
          <label htmlFor="title" className="mb-2 font-semibold text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="p-3 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label
            htmlFor="description"
            className="mb-2 font-semibold text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            className="p-3 border border-gray-300 rounded-md shadow-sm"
            rows="4"
          ></textarea>
        </div>

        {/* Price */}
        <div className="flex flex-col">
          <label htmlFor="price" className="mb-2 font-semibold text-gray-700">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
            className="p-3 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        {/* Category */}
        <div className="flex flex-col">
          <label
            htmlFor="category"
            className="mb-2 font-semibold text-gray-700"
          >
            Category
          </label>
          <select
            name="category"
            id="category"
            value={formData.category.category}
            onChange={handleInputChange}
            className="p-3 border border-gray-300 rounded-md shadow-sm"
          >
            <option value="1">Motorcycles</option>
            <option value="2">Cars</option>
            <option value="3">Trucks</option>
          </select>
        </div>

        {/* Other fields (Year, Kilometer, etc.) */}
        <div className="flex space-x-4">
          <div className="flex-1">
            <label htmlFor="year" className="mb-2 font-semibold text-gray-700">
              Year
            </label>
            <input
              type="number"
              id="year"
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              className="p-3 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="flex-1">
            <label
              htmlFor="kilometer"
              className="mb-2 font-semibold text-gray-700"
            >
              Kilometer
            </label>
            <input
              type="number"
              id="kilometer"
              name="kilometer"
              value={formData.kilometer}
              onChange={handleInputChange}
              className="p-3 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>

        {/* Location */}
        <div className="flex flex-col">
          <label htmlFor="address" className="mb-2 font-semibold text-gray-700">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="location.Address"
            value={formData.location.Address}
            onChange={handleInputChange}
            required
            className="p-3 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        {/* Picture */}
        <div className="flex flex-col">
          <label htmlFor="picture" className="mb-2 font-semibold text-gray-700">
            Upload Pictures
          </label>
          <input
            type="file"
            id="picture"
            name="picture"
            accept="image/*"
            onChange={handleFileChange}
            multiple
            className="p-3 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isLoading ? "Submitting..." : id ? "Update Motor" : "Add Motor"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditMotorForm;
