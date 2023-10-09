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
    <div className=" w-screen h-screen relative overflow-hidden flex">
      {/* Bg- Image */}
      <img
        className="w-full h-full object-cover absolute top-0 left-0 opacity-90 "
        src="https://things2.do/blogs/wp-content/uploads/2023/03/Bengali-cuisine-cover.jpeg"
        alt=""
      />
      {/* Content Box */}
      <div className="flex flex-col items-center bg-cardOverlay w-[80%]  md:w-508 h-full z-10 backdrop-blur-md p-4 px-4 py-12 gap-6">
        {/* logo */}
        <div className="flex items-center justify-start gap-4 w-full">
          <h1>Logo</h1>
          <p className=" text-headingColor font-semibold  text-2xl">
            FoodyBong
          </p>
        </div>

        {/* welcome tetxt  */}
        <p className="text-3xl font-semibold text-headingColor">
          Welcomne Back
        </p>
        <p className="text-xl text-textColor -mt-6">
          {isSignUp ? "Sign Up" : "Sign In"}the following
        </p>

        {/* Input Section */}
        <div className="w-full flex flex-col items-center justify-center gap-6 px-4 md:px-12 py-4">
          <LoginInput
            placeholder={"Enter your Email"}
            icon={<FaEnvelope className="text-xl text-textColor" />}
            inputState={userEmail}
            inputStateFunc={setUserEmail}
            type="email"
            isSignUp={isSignUp}
          />
          <LoginInput
            placeholder={"Enter your Password"}
            icon={<FaLock className="text-xl text-textColor" />}
            inputState={password}
            inputStateFunc={setPassword}
            type="password"
            isSignUp={isSignUp}
          />
          {isSignUp && (
            <LoginInput
              placeholder={"Confirm Password"}
              icon={<FaLock className="text-xl text-textColor" />}
              inputState={confirmPassword}
              inputStateFunc={setConfirmPassword}
              type="password"
              isSignUp={isSignUp}
            />
          )}

          {!isSignUp ? (
            <p>
              Doesn't have an account ?{" "}
              <motion.button
                className="text-red-400 underline cursor-pointer bg-transparent"
                {...buttonClick}
                onClick={() => setIsSignUp(true)}
              >
                {" "}
                Create One{" "}
              </motion.button>
            </p>
          ) : (
            <p>
              Already have an account ?{" "}
              <motion.button
                className="text-red-400 underline cursor-pointer bg-transparent"
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
              className="w-full px-4 py-2 rounded-md bg-red-400 cursor-pointer text-white text-xl capitalize hover:bg-red-500 transition-all duration-150"
            >
              Sign Up
            </motion.button>
          ) : (
            <motion.button
              {...buttonClick}
              onClick={signInWithEmailPass}
              className="w-full px-4 py-2 rounded-md bg-red-400 cursor-pointer text-white text-xl capitalize hover:bg-red-500 transition-all duration-150"
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
          <p className=" capitalize text-base text-headingColor ">
            {" "}
            Sign In using Google
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
