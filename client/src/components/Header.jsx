import React, { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { buttonClick, slideTop } from "../animations";
import { Avatar } from "../assets/img/index";
import { MdLogout, MdShoppingCart } from "../assets/icons";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import { getAuth } from "firebase/auth";
import { app } from "../config/firebase.config";
import { useNavigate } from "react-router-dom";
import { setUserNull } from "../context/actions/userActions";
import { setCartOn } from "../context/actions/displayCartAction";
const Header = () => {
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);

  const [isMenu, setIsMenu] = useState(false);
  const fireBaseAuth = getAuth(app);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signOut = () => {
    fireBaseAuth
      .signOut()
      .then(() => {
        dispatch(setUserNull());
        navigate("/login", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <header className="fixed backdrop-blur-md z-50 inset-x-0 top-0 flex items-center justify-between px-12 md:px-20 py-6">
      <NavLink to={"/"} className="flex items-center justify-center gap-4">
        <h1>Logo</h1>
      </NavLink>
      <nav className="flex items-center justify-center gap-8">
        <ul className="hidden md:flex items-center justify-center gap-16">
          <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
            to={"/"}
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
            to={"/about"}
          >
            Menu
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
            to={"/services"}
          >
            Services
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
            to={"/aboutus"}
          >
            About Us
          </NavLink>
        </ul>

        <motion.div
          {...buttonClick}
          onClick={() => dispatch(setCartOn())}
          className="relative cursor-pointer"
        >
          <MdShoppingCart className="text-3xl text-textColor" />
          {cart?.length > 0 && (
            <div className="w-5 h-5 rounded-full  bg-red-500 flex items-center justify-center absolute -top-3 -right-1">
              <p className=" text-primary text-base font-semibold">
                {cart?.length}
              </p>
            </div>
          )}
        </motion.div>

        {user ? (
          <>
            <div
              onMouseEnter={() => setIsMenu(true)}
              className="relative cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full shadow-md cursor-pointer overflow-hidden flex items-center justify-center">
                <motion.img
                  className="w-full h-full  object-cover"
                  src={user?.picture ? user?.picture : Avatar}
                  whileHover={{ scale: 1.15 }}
                  referrerPolicy="no-referrer"
                />
              </div>

              {isMenu && (
                <motion.div
                  {...slideTop}
                  onMouseLeave={() => setIsMenu(false)}
                  className="px-6 py-4 w-48 bg-cardOverlay backdrop-blur-md rounded-md shadow-md absolute top-12  right-0 flex flex-col gap-4"
                >
                  {user?.user_id === import.meta.env.VITE_FIREBASE_USER_ID && (
                    <Link
                      to={"/dashboard/home"}
                      className="hover:text-red-500 text-xl text-textColor"
                    >
                      Dashboard
                    </Link>
                  )}
                  <Link
                    to={"/profile"}
                    className="hover:text-red-500 text-xl text-textColor"
                  >
                    My profile
                  </Link>
                  <Link
                    to={"/user-orders"}
                    className="hover:text-red-500 text-xl text-textColor"
                  >
                    Orders
                  </Link>
                  <hr />
                  <motion.div
                    {...buttonClick}
                    onClick={signOut}
                    className="group flex items-center justify-center px-4 py-2 rounded-md shadow-md bg-gray-100 hover:bg-gray-200 gap-3  "
                  >
                    <MdLogout className="text-2xl text-textColor group-hover:text-headingColor   " />
                    <p className="text-textColor  group-hover:text-headingColor ">
                      Sign Out
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </>
        ) : (
          <>
            <NavLink to={"/login"}>
              <motion.div
                {...buttonClick}
                className="px-4 py-2 rounded-md shadow-md bg-cardOverlay border border-red-300 cursor-pointer"
              >
                Login
              </motion.div>
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
