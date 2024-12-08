import React, { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";

import userPlaceholderImg from "../Data/userPlaceholderImg.jpg";
import { UserProfile } from ".";
import { useDispatch, useSelector } from 'react-redux';
import { setActiveMenu, setIsClicked, setScreenSize } from '../features/theme/themeSlice'; 


const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <div content={title} position="BottomCenter">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
   </div>
);

const Navbar = () => {
  const dispatch = useDispatch();
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);
  const { currentColor, activeMenu,  screenSize } = useSelector((state) => state.theme);
  
  const handleToggleUserProfile = () => {
    setIsUserProfileOpen((prev) => !prev);
  };
  useEffect(() => {
    const handleResize = () => dispatch(setScreenSize(window.innerWidth));

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      dispatch(setActiveMenu(false));
    } else {
      dispatch(setActiveMenu(true));
    }
  }, [dispatch]);

  const handleActiveMenu = () => dispatch(setActiveMenu(!activeMenu));


  return (
    <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">
      <NavButton
        title="Menu"
        customFunc={handleActiveMenu}
        color={currentColor}
        icon={<AiOutlineMenu />}
      />
      <div className="flex">
        <div content="Profile" position="BottomCenter">
          <div
            className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
            onClick={handleToggleUserProfile}
          >
            <img
              className="rounded-full w-8 h-8"
              src={userPlaceholderImg}
              alt="user-profile"
            />
            <p>
              <span className="text-gray-400 text-14">Hi,</span>{" "}
              <span className="text-gray-400 font-bold ml-1 text-14">
                Admin
              </span>
            </p>
            <MdKeyboardArrowDown className="text-gray-400 text-14" />
          </div>
        </div>

        {isUserProfileOpen && (
          <UserProfile onClose={handleToggleUserProfile} />
        )}
      </div>
    </div>
  );
};

export default Navbar;
