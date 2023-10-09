import React, { useState } from "react";
import { motion } from "framer-motion";
import { fadeInOut } from "../animations";

const LoginInput = ({
  placeholder,
  icon,
  inputState,
  inputStateFunc,
  type,
  isSignUp,
}) => {
  const [isFocus, setisFocus] = useState(false);
  return (
    <motion.div
      {...fadeInOut}
      className={`${
        isFocus ? "shadow-md shadow-red-400" : "shadow-none"
      } flex items-center justify-center gap-4 bg-cardOverlay backdrop-blur-md rounded-md w-full  px-4 py-2`}
    >
      {icon}
      <input
        type={type}
        placeholder={placeholder}
        value={inputState}
        onFocus={() => setisFocus(true)}
        onBlur={() => setisFocus(false)}
        onChange={(e) => inputStateFunc(e.target.value)}
        className="w-full h-full bg-transparent text-headingColor text-lg font-semibold border-none outline-none"
      />
    </motion.div>
  );
};

export default LoginInput;
