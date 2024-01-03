import axiosConfig from "./apiConfig";

export const getAllProduct = async (param) => {
  const response = await axiosConfig.get(`breeds/list`);
  return response.data;
};
export const getImageDog = async (param) => {
  const response = await axiosConfig.get(`breeds/hound/images`);
  return response.data;
};
