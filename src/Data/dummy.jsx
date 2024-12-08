import React from "react";
import {
  FiMail,
  FiShoppingBag,
  FiUser,
} from "react-icons/fi";

export const links = [
  {
    title: "Dashboard",
    links: [
      // {
      //   name: "Users",
      //   to: "users",
      //   icon: <FiUser />,
      // },
      {
        name: "Products",
        to: "products",
        icon: <FiShoppingBag />,
      },
      {
        name: "Categories",
        to: "categories",
        icon: <FiShoppingBag />,
      },
      {
        name: "Newsletters",
        to: "newsletters",
        icon: <FiShoppingBag />,
      },
      {
        name: "Mails",
        to: "mails",
        icon: <FiMail />,
      },      
    ],
  },
];

export const themeColors = [
  {
    name: "red-theme",
    color: "#7F3FBF",
  },
  {
    name: "indigo-theme",
    color: "#606161",
  },
  {
    name: "orange-theme",
    color: "#f07522",
  },
];
