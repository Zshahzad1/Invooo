import React from "react";
import { Link, NavLink } from "react-router-dom";
import { SiShopware } from "react-icons/si";
import { MdOutlineCancel } from "react-icons/md";

import logo from "../Data/logo.png";
import { links } from "../Data/dummy";
import { useSelector, useDispatch } from "react-redux";
import { setActiveMenu, setScreenSize } from "../features/theme/themeSlice";

const Sidebar = () => {
    const dispatch = useDispatch();
    const { activeMenu, currentColor, screenSize } = useSelector(
      (state) => state.theme
    );

    const handleCloseSidebar = () => {
      if (activeMenu && screenSize <= 900) {
        dispatch(setActiveMenu(false));
      }
    };

  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2";

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              to="/"
              onClick={handleCloseSidebar}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
            >
              <img src={logo} alt="" 
              className="mx-auto h-10 w-auto"
               />
              <span className="text-purple-500">Invoo</span>
            </Link>
            <div content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() => dispatch(setActiveMenu(!activeMenu))}
                style={{ color: currentColor }}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </div>
          </div>
          <div className="mt-10 ">
            {links?.map((item) => (
              <div key={item.title}>
                <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                  {item.title}
                </p>
                {item.links.map((link) => (
                  <NavLink
                    to={`/${link.to}`}
                    key={link.name}
                    onClick={handleCloseSidebar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : "",
                    })}
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    {link.icon}
                    <span className="capitalize ">{link.name}</span>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
