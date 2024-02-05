import React from "react";
import { NavLink } from "react-router-dom";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import { IoFastFoodOutline } from "react-icons/io5";
const DBLeftSection = () => {
  return (
    <div className="h-full pt-12 flex flex-col  bg-gradient-to-br from-black to-gray-900 backdrop-blur-md  shadow-md min-w-210 w-300 gap-3">
      <NavLink to={"/"} className="flex items-center justify-center gap-4">
        <h1 className="text-3xl md:text-4xl  flex items-center justify-center gap-2 font-logo text-orange-500">
          Foody Bong{" "}
          <span>
            <IoFastFoodOutline />
          </span>
        </h1>
      </NavLink>
      <hr />

      <ul className="flex flex-col gap-4">
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 bg-gray-700 border-l-8 border-red-500`
              : isNotActiveStyles
          }
          to={"/dashboard/home"}
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 bg-gray-700 border-l-8 border-red-500`
              : isNotActiveStyles
          }
          to={"/dashboard/orders"}
        >
          Orders
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 bg-gray-700 border-l-8 border-red-500`
              : isNotActiveStyles
          }
          to={"/dashboard/items"}
        >
          Items
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 bg-gray-700 border-l-8 border-red-500`
              : isNotActiveStyles
          }
          to={"/dashboard/newitems"}
        >
          Add New Item
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 bg-gray-700 border-l-8 border-red-500`
              : isNotActiveStyles
          }
          to={"/dashboard/users"}
        >
          Users
        </NavLink>
      </ul>
    </div>
  );
};

export default DBLeftSection;
