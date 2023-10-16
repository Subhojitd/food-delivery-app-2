import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../api";
import { setAllProducts } from "../context/actions/productAction";

import { CChart } from "@coreui/react-chartjs";

const DBHome = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const biriyani = products?.filter(
    (item) => item.product_category === "biriyani"
  );
  const deserts = products?.filter(
    (item) => item.product_category === "deserts"
  );
  const pizza = products?.filter((item) => item.product_category === "pizza");
  const burger = products?.filter((item) => item.product_category === "burger");
  const kababs = products?.filter((item) => item.product_category === "kababs");
  const chinese = products?.filter(
    (item) => item.product_category === "chinese"
  );
  const veg = products?.filter((item) => item.product_category === "veg");

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
                  "biriyani",
                  "deserts",
                  "pizza",
                  "burger",
                  "kababs",
                  "chinese",
                  "veg",
                ],
                datasets: [
                  {
                    label: "Category Count",
                    backgroundColor: "#f87979",
                    data: [
                      biriyani?.length,
                      deserts?.length,
                      pizza?.length,
                      burger?.length,
                      kababs?.length,
                      chinese?.length,
                      veg?.length,
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
