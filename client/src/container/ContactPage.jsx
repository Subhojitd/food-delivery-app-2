import React from "react";
import { Header } from "../components";

const ContactPage = () => {
  return (
    <>
      <div className="pt-[80px] bg-gradient-to-br from-black to-gray-900 w-full  min-h-screen flex items-center justify-center flex-col">
        <Header />
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center flex flex-col items-center justify-center">
              <h2 className="text-4xl bg-white p-1 rounded-md px-2  bg font-bold text-gray-800">
                Contact Us
              </h2>
              <p className="mt-4 text-lg text-white">
                Have questions or need assistance? Feel free to get in touch
                with us. Our team is here to help you.
              </p>
            </div>

            <div className="mt-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold bg-gray-400 w-[240px] p-1 rounded-md  text-slate-800">
                    Contact Form
                  </h3>
                  <form>
                    <div className="mt-4">
                      <label
                        htmlFor="name"
                        className="block text-white font-medium mb-2"
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="border rounded-md py-2 px-3 w-full focus:outline-none focus:ring focus:border-blue-300"
                        required
                      />
                    </div>
                    <div className="mt-4">
                      <label
                        htmlFor="email"
                        className="block text-white font-medium mb-2"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="border rounded-md py-2 px-3 w-full focus:outline-none focus:ring focus:border-blue-300"
                        required
                      />
                    </div>
                    <div className="mt-4">
                      <label
                        htmlFor="message"
                        className="block text-white font-medium mb-2"
                      >
                        Message
                      </label>
                      <textarea
                        name="message"
                        id="message"
                        rows="4"
                        className="border rounded-md py-2 px-3 w-full focus:outline-none focus:ring focus:border-blue-300"
                        required
                      ></textarea>
                    </div>
                    <div className="mt-6">
                      <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
                      >
                        Send Message
                      </button>
                    </div>
                  </form>
                </div>
                <div className="flex flex-col items-end justify-start">
                  <h3 className="text-xl bg-white p-1 rounded-md px-2  bg font-bold text-gray-800">
                    Contact Information
                  </h3>
                  <p className="mt-2 text-white">
                    Address: Taki Road, Basirhat
                    <br />
                    Phone: +91 7872732198 <br />
                    Email: Subhajit@college.edu
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ContactPage;
