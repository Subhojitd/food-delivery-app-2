import React from "react";
import { Header } from "../components";
import {
  MdOutlineDeliveryDining,
  MdOutlineMenuBook,
  MdRestaurant,
} from "react-icons/md";
import { FcCustomerSupport } from "react-icons/fc";
import { FaTruck } from "react-icons/fa";

const ServicePage = () => {
  return (
    <div className="pt-[80px] bg-gradient-to-br from-black to-gray-900 w-full  min-h-screen flex items-center justify-center flex-col">
      {/* Navigation Bar */}
      <Header />

      {/* Service Section */}
      <section className="pt-16 flex-1">
        <div className="container mx-auto text-center text-white">
          <h2 className="text-4xl font-extrabold mb-6">Our Services</h2>
          <p className="text-gray-300 text-lg mb-8">
            We offer a variety of services to make your dining experience
            exceptional.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service Item 1 */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center justify-center">
              <h1 className="text-3xl text-orange-500">
                <MdRestaurant />
              </h1>
              <h3 className="text-xl font-semibold text-white mb-2">
                Restaurant Delivery
              </h3>
              <p className="text-gray-300">
                Order from your favorite restaurants and have it delivered to
                your doorstep.
              </p>
            </div>

            {/* Service Item 2 */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center justify-center">
              <h1 className="text-3xl text-orange-500">
                <MdOutlineDeliveryDining />
              </h1>
              <h3 className="text-xl font-semibold text-white mb-2">
                Fast Delivery
              </h3>
              <p className="text-gray-300">
                We guarantee quick and reliable food delivery to satisfy your
                cravings.
              </p>
            </div>

            {/* Service Item 3 */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center justify-center">
              <h1 className="text-3xl text-orange-500">
                <FcCustomerSupport />
              </h1>
              <h3 className="text-xl font-semibold text-white mb-2">
                Custom Orders
              </h3>
              <p className="text-gray-300">
                Special requests? We accommodate custom orders to meet your
                unique preferences.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className=" text-white py-12 rounded-md">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6">Why Choose Us?</h2>
          <p className="text-gray-300 text-lg mb-8">
            Discover the reasons why we are the best choice for your food
            delivery needs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col items-center justify-center">
              <h1 className="text-3xl text-orange-500">
                <MdOutlineMenuBook />
              </h1>
              <h3 className="text-xl font-semibold mb-2">
                Wide Menu Selection
              </h3>
              <p className="text-gray-300">
                We partner with a diverse range of restaurants, offering a wide
                menu selection for every taste.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col items-center justify-center">
              <h1 className="text-3xl text-orange-500">
                <FaTruck />
              </h1>
              <h3 className="text-xl font-semibold mb-2">Fast and Reliable</h3>
              <p className="text-gray-300">
                Our delivery service is known for its speed and reliability,
                ensuring your food arrives hot and fresh.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicePage;
