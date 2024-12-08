import React, { useEffect, useState } from "react";
import axios from "axios";
import utils from "../../utils/utils";

const AddJobProfiles = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: { category: 1, subcategory: 49 },
    year: 1,
    kilometer: 10,
    postedBy: "",
    location: { Latitude: "", Longitude: "", Address: "" },
    city: 1,
    condition: "Used",
    color: "Blue",
    transmission: "Automatic Transmission",
    bodyType: "SUV",
    feulType: "Petrol",
    availability: "Available",
    seat: 5,
    picture: [],
  });

  const [users, setUsers] = useState([]); // State for storing user data
  //Get User
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${utils.BASE_URL}users`, {
        headers: {
          Authorization: `Bearer ${utils.token}`,
        },
      });
      const data = response.data;
      setUsers(data);
      console.log("Fetched users:", data); // Use the data as needed
      return data; // Return the data for further use
    } catch (error) {
      console.error(
        "Error fetching users:",
        error.response?.data || error.message
      );
      throw error; // Re-throw the error if it needs to be handled by the caller
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Check if the name includes 'location', meaning it's a nested object
    if (name.startsWith("location.")) {
      const field = name.split(".")[1]; // Get the nested field name, e.g. 'Address'
      setFormData((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          [field]: value, // Update only the specific field inside 'location'
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle file uploads
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

  // Submit form data
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
          location: formData.location.Address,
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

      const response = await axios.post(
        "http://157.241.58.61:1337/api/jobprofiles",
        formPayload,
        {
          headers: {
            Authorization: `Bearer ${utils.token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Job Profile listing added successfully!");
        setFormData({
          title: "",
          description: "",
          price: "",
          category: { category: 1, subcategory: 49 },
          year: 1,
          kilometer: 10,
          postedBy: "",
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
    } catch (err) {
      setError("Failed to add the job profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Add Job Profile</h1>
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
            <option value="1">Find Jobs</option>
            <option value="2">Hire Jobs</option>
          </select>
        </div>
        {/* Posted By (User ID) */}
        <div className="flex flex-col">
          <label
            htmlFor="postedBy"
            className="mb-2 font-semibold text-gray-700"
          >
            Posted By (User ID)
          </label>
          <select
            name="postedBy"
            id="postedBy"
            value={formData.postedBy}
            onChange={handleInputChange}
            className="p-3 border border-gray-300 rounded-md shadow-sm"
          >
            <option value="">Select a User</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.id}
              </option>
            ))}
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
            className="p-3 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        {/* Condition, Transmission, etc. */}
        <div className="flex space-x-4">
          <div className="flex-1">
            <label
              htmlFor="condition"
              className="mb-2 font-semibold text-gray-700"
            >
              Condition
            </label>
            <select
              name="condition"
              id="condition"
              value={formData.condition}
              onChange={handleInputChange}
              className="p-3 border border-gray-300 rounded-md shadow-sm"
            >
              <option value="Used">Used</option>
              <option value="New">New</option>
            </select>
          </div>

          <div className="flex-1">
            <label
              htmlFor="transmission"
              className="mb-2 font-semibold text-gray-700"
            >
              Transmission
            </label>
            <select
              name="transmission"
              id="transmission"
              value={formData.transmission}
              onChange={handleInputChange}
              className="p-3 border border-gray-300 rounded-md shadow-sm"
            >
              <option value="Automatic Transmission">
                Automatic Transmission
              </option>
              <option value="Manual Transmission">Manual Transmission</option>
            </select>
          </div>
        </div>

        {/* File Upload */}
        <div className="flex flex-col">
          <label
            htmlFor="pictures"
            className="mb-2 font-semibold text-gray-700"
          >
            Upload Pictures
          </label>
          <input
            type="file"
            id="pictures"
            name="pictures"
            multiple
            onChange={handleFileChange}
            className="p-3 border border-gray-300 rounded-md shadow-sm"
          />
          <div className="mt-2">
            {formData.picture.map((pic, index) => (
              <img
                key={index}
                src={pic}
                alt="preview"
                className="w-20 h-20 mr-2 mb-2 rounded"
              />
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 mt-6 bg-blue-600 text-white rounded-md hover:bg-blue-500"
        >
          {isLoading ? "Submitting..." : "Submit Listing"}
        </button>
      </form>
    </div>
  );
};

export default AddJobProfiles;
