import React, { useEffect, useState } from "react";
import { LoginInput } from "../components";
import { buttonClick } from "../animations";
import { FaEnvelope, FaLock, FcGoogle } from "../assets/icons";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithPopup,
} from "firebase/auth";
import { app } from "../config/firebase.config";
import { validateUserJWTToken } from "../api";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../context/actions/userActions";
import { alertInfo } from "../context/actions/alertActions";
import { alertWarning } from "../context/actions/alertActions";

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const fireBaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const alert = useSelector((state) => state.alert);

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user]);

  const loginWithGoogle = async () => {
    await signInWithPopup(fireBaseAuth, provider).then((userCred) => {
      fireBaseAuth.onAuthStateChanged((cred) => {
        if (cred) {
          cred.getIdToken().then((token) => {
            validateUserJWTToken(token).then((data) => {
              dispatch(setUserDetails(data));
            });
            navigate("/", { replace: true });
          });
        }
      });
    });
  };

  const signUpWithEmailPass = async () => {
    if (userEmail === "" || password === "" || confirmPassword === "") {
      dispatch(alertInfo("Please fill all the fields"));
    } else {
      if (password === confirmPassword) {
        setPassword("");
        setConfirmPassword("");
        setUserEmail("");
        await createUserWithEmailAndPassword(
          fireBaseAuth,
          userEmail,
          password
        ).then((userCred) => {
          fireBaseAuth.onAuthStateChanged((cred) => {
            if (cred) {
              cred.getIdToken().then((token) => {
                validateUserJWTToken(token).then((data) => {
                  dispatch(setUserDetails(data));
                });
                navigate("/", { replace: true });
              });
            }
          });
        });
      } else {
        dispatch(alertWarning("Passwords doesn't match"));
      }
    }
  };

  const signInWithEmailPass = async () => {
    if (userEmail !== "" && password !== "") {
      await signInWithEmailAndPassword(fireBaseAuth, userEmail, password).then(
        (userCred) => {
          fireBaseAuth.onAuthStateChanged((cred) => {
            if (cred) {
              cred.getIdToken().then((token) => {
                validateUserJWTToken(token).then((data) => {
                  dispatch(setUserDetails(data));
                });
                navigate("/", { replace: true });
              });
            }
          });
        }
      );
    } else {
      dispatch(alertWarning("Passwords doesn't match"));
    }
  };
  return (
    <div className=" w-screen h-screen  overflow-hidden bg-gradient-to-br from-black to-gray-900 flex items-center justify-center">
      {/* Content Box */}
      <div className="flex flex-col items-center justify-center md:w-460  w-350 border-2 border-gray-600 rounded-2xl   h-[620px]   p-4 px-4 py-8 gap-3">
        {/* logo */}

        <p className="text-center text-white  text-2xl">
          Welcome to{" "}
          <span className="font-logo text-orange-500 ">FoodyBong</span>
        </p>

        {/* welcome tetxt  */}
        <p className="text-xl text-gray-400 -mt-3">
          {isSignUp ? "Sign Up" : "Log In"} here
        </p>

        {/* Input Section */}
        <div className="w-full flex flex-col items-center justify-center gap-6 px-4 md:px-12 py-4">
          <LoginInput
            placeholder={"Enter your Email"}
            icon={<FaEnvelope className="text-xl text-orange-500" />}
            inputState={userEmail}
            inputStateFunc={setUserEmail}
            type="email"
            isSignUp={isSignUp}
          />
          <LoginInput
            placeholder={"Enter your Password"}
            icon={<FaLock className="text-xl text-orange-500" />}
            inputState={password}
            inputStateFunc={setPassword}
            type="password"
            isSignUp={isSignUp}
          />
          {isSignUp && (
            <LoginInput
              placeholder={"Confirm Password"}
              icon={<FaLock className="text-xl text-orange-500" />}
              inputState={confirmPassword}
              inputStateFunc={setConfirmPassword}
              type="password"
              isSignUp={isSignUp}
            />
          )}

          {!isSignUp ? (
            <p className="text-gray-300">
              Doesn't have an account ?{" "}
              <motion.button
                className="text-orange-400 underline cursor-pointer bg-transparent"
                {...buttonClick}
                onClick={() => setIsSignUp(true)}
              >
                {" "}
                Create One{" "}
              </motion.button>
            </p>
          ) : (
            <p className="text-gray-300">
              Already have an account ?{" "}
              <motion.button
                className="text-orange-400 underline cursor-pointer bg-transparent"
                {...buttonClick}
                onClick={() => setIsSignUp(false)}
              >
                {" "}
                Log in{" "}
              </motion.button>
            </p>
          )}

          {/* Button Section */}
          {isSignUp ? (
            <motion.button
              {...buttonClick}
              onClick={signUpWithEmailPass}
              className="w-full px-4 py-2 rounded-md bg-orange-500 cursor-pointer text-white text-xl capitalize hover:bg-orange-700 transition-all duration-150"
            >
              Sign Up
            </motion.button>
          ) : (
            <motion.button
              {...buttonClick}
              onClick={signInWithEmailPass}
              className="w-full px-4 py-2 rounded-md bg-orange-500 cursor-pointer text-white text-xl capitalize hover:bg-orange-700 transition-all duration-150"
            >
              Sign In
            </motion.button>
          )}
        </div>
        {/* divider */}

        <div className="flex items-center justify-between gap-16">
          <div className="w-24 h-[1px] rounded-md bg-white"></div>
          <p className="text-white">or</p>
          <div className="w-24 h-[1px] rounded-md bg-white"></div>
        </div>

        {/* Google login */}
        <motion.div
          {...buttonClick}
          onClick={loginWithGoogle}
          className="flex items-center justify-center px-20 py-2 bg-cardOverlay backdrop-blur-md cursor-pointer rounded-3xl gap-4"
        >
          <FcGoogle className="text-3xl" />
          <p className=" capitalize text-base text-textColor ">
            {" "}
            Sign in with Google
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
