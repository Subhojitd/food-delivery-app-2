import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../api";
import { setAllProducts } from "../context/actions/productAction";

import { CChart } from "@coreui/react-chartjs";

const DBHome = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const drinks = products?.filter((item) => item.product_category === "drinks");
  const deserts = products?.filter(
    (item) => item.product_category === "deserts"
  );
  const fruits = products?.filter((item) => item.product_category === "fruits");
  const rice = products?.filter((item) => item.product_category === "rice");
  const curry = products?.filter((item) => item.product_category === "curry");
  const chinese = products?.filter(
    (item) => item.product_category === "chinese"
  );
  const bread = products?.filter((item) => item.product_category === "bread");

  useEffect(() => {
    if (!products) {
      getAllProducts().then((data) => {
        console.log(data);
        dispatch(setAllProducts(data));
      });
    }
  }, []);

  return (
    <div className="flex items-center justify-center flex-col pt-6 w-full h-full">
      <div className="grid w-full grid-cols-2 gap-4 h-full">
        <div className="flex items-center justify-center">
          <div className="w-340 md:w-508">
            <CChart
              type="bar"
              data={{
                labels: [
                  "drinks",
                  "deserts",
                  "fruits",
                  "rice",
                  "curry",
                  "chinese",
                  "bread",
                ],
                datasets: [
                  {
                    label: "Category Count",
                    backgroundColor: "#f87979",
                    data: [
                      drinks?.length,
                      deserts?.length,
                      fruits?.length,
                      rice?.length,
                      curry?.length,
                      chinese?.length,
                      bread?.length,
                    ],
                  },
                ],
              }}
              labels="months"
            />
          </div>
        </div>
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-275 md:w-460">
            <CChart
              type="doughnut"
              data={{
                labels: [
                  "Orders",
                  "Cancelled",
                  "Delivered",
                  "Paid",
                  "Not Paid",
                ],
                datasets: [
                  {
                    backgroundColor: [
                      "#51FF00",
                      "#00b6ff",
                      "#008bff",
                      "#ffd100",
                      "#ff00f8",
                    ],
                    data: [40, 20, 80, 10, 74],
                  },
                ],
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DBHome;
