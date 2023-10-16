import React from "react";
import { motion } from "framer-motion";
import { Delivery, HeroBg } from "../assets/img";
import { buttonClick, staggerFadeInOut } from "../animations";
import { randomData } from "../utils/styles";
import { fruit } from "../assets/img";
const Home = () => {
  return (
    <motion.div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex flex-col items-start justify-start gap-6 ">
        <div className="px-4 py-1 flex items-center justify-center gap-2 bg-orange-100 rounded-full">
          <p className="text-lg font-semibold text-orange-500">Free Delivery</p>
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary shadow-md">
            <img
              src={Delivery}
              alt=""
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <p className="text-[40px] text-headingColor md:text-[65px] font-sans font-extrabold tracking-wider">
          You will get the best quality food in{" "}
          <span className="text-orange-600 font-logo">FoodyBong</span>
        </p>

        <p className="text-textColor text-lg">
          {" "}
          In the fast-paced, ever-evolving landscape of food delivery, we
          proudly present to you "FoodyBong Eats," a game-changing food delivery
          app, effortlessly. In this brief, we will outline the core features,
          the target audience, and the unique selling points that set Lorem
          Ipsum Eats apart in the competitive world of food delivery.
        </p>
        <motion.button
          {...buttonClick}
          className="bg-gradient-to-bl from-orange-400 to-orange-600 px-4 py-2 rounded-xl
         text-black text-base font-semibold"
        >
          Order Now
        </motion.button>
      </div>

      <div className="py-[50px] flex-1 flex items-center justify-end relative">
        <img
          src={HeroBg}
          className="absolute top-0 right-0 md:-right-12 w-full h-420 md:w-auto md:h-650 opacity-25"
        />

        <div className="w-full   md:w-460 ml-0 flex flex-wrap items-center justify-center gap-4 gap-y-12">
          {randomData &&
            randomData.map((data, i) => (
              <motion.div
                key={i}
                {...staggerFadeInOut(i)}
                className="w-32 h-36 md:h-150 md:w-190 p-4 bg-textColor backdrop-blur-md rounded-3xl flex flex-col inset-x-0 justify-center drop-shadow-lg"
              >
                <img
                  src={data.imageURL}
                  className="w-28 h-28 md:w-36 md:-mt-16  object-contain
                "
                  alt=""
                />

                <p className="text-sm lg:text-xl font-semibold text-black ">
                  {data.product_name.slice(0, 14)}
                </p>

                <p className="text-sm  font-semibold text-red-600 ">
                  {data.product_price}
                </p>
              </motion.div>
            ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
