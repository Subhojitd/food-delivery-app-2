import axios from "axios";

export const baseURL =
  "http://127.0.0.1:5001/food-delivery-app-2-f4d86/us-central1/app";

export const validateUserJWTToken = async (token) => {
  try {
    const res = await axios.get(`${baseURL}/api/users/jwtVerification`, {
      headers: { Authorization: "Bearer " + token },
    });
    return res.data.data;
  } catch (error) {
    return null;
  }
};

//ad new product

export const addNewProduct = async (data) => {
  try {
    const res = await axios.post(`${baseURL}/api/products/create`, { ...data });
    console.log(res);
    return res.data.data;
  } catch (error) {
    return null;
  }
};
