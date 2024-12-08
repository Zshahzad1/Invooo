import React from "react";
import { MdOutlineCancel } from "react-icons/md";
import userPlaceholderImg from "../Data/userPlaceholderImg.jpg";
import { useDispatch, useSelector } from "react-redux";
import { setIsClicked } from "../features/theme/themeSlice";
import { logOut } from "../features/auth/authSlice";

const UserProfile = ({onClose}) => {
  const dispatch = useDispatch();
  const { currentColor, isClicked } = useSelector(
    (state) => state.theme
  );
  const { user } = useSelector((state) => state.auth);

  const handleClick = (type) => {
    dispatch(setIsClicked({ [type]: !isClicked[type] }));
  };

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/signin");
    onClose();
  };

  return (
    <div className="nav-item absolute right-1 top-16 bg-white shadow-md dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">
          Admin Profile
        </p>
        <div
          onClick={onClose}
          className="text-2xl hover:bg-light-gray  p-1 cursor-pointer shadow-sm rounded-full text-[rgb(153,171,180)]"
        >
          <MdOutlineCancel />
        </div>
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <img
          className="rounded-full h-24 w-24"
          src={userPlaceholderImg}
          alt="user-profile"
        />
        <div>
          <p className="font-semibold text-xl dark:text-gray-200">
            Super Admin
          </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">
            {user?.email || "info@coupon.com"}
          </p>
        </div>
      </div>
      <div></div>
      <div className="mt-5">
        <button
          style={{ backgroundColor: currentColor }}
          onClick={handleLogout}
          className={`rounded-[10px] w-full p-3 hover:drop-shadow-xl text-white`}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
