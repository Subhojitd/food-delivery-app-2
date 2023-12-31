import React, { useEffect } from "react";
import { Cart, FilterSection, Header, Home, HomeSlider } from "../components";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllProducts } from "../api";
import { setAllProducts } from "../context/actions/productAction";
import Footer from "../components/Footer";

const Main = () => {
  const products = useSelector((state) => state.products);
  const isCart = useSelector((state) => state.isCart);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!products) {
      getAllProducts().then((data) => {
        dispatch(setAllProducts(data));
      });
    }
  }, []);
  return (
    <main className=" w-screen min-h-screen flex items-center justify-start flex-col  bg-gradient-to-br from-black to-gray-900 ">
      <Header />
      <div className="w-full flex flex-col  items-start justify-center mt-40 px-6 md:px-24 2xl:px-96 gap-12 pb-24">
        <Home />
        <HomeSlider />
        <FilterSection />
      </div>

      {isCart && <Cart />}
      <Footer />
    </main>
  );
};

export default Main;
