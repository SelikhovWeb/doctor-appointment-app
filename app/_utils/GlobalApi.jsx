const { default: axios } = require("axios");

const API_KEY = process.env.NEXT_PUBLIC_STRAPI_API_KEY;
const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

const getAllCategories = async () => {
  const { data } = await axiosClient.get("/categories?populate=*");
  return data;
};

const getDoctorList = async () => {
  const { data } = await axiosClient.get("/doctors?populate=*");
  return data;
};

const getDoctorsByCategory = async (category) => {
  const { data } = await axiosClient.get(
    `/doctors?filters[categories] [name] [$in]=${category}&populate=*`
  );
  return data;
};

const getDoctorById = async (id) => {
  const { data } = await axiosClient.get(`/doctors/${id}?populate=*`);
  return data;
};

const createAppointment = async (data) => {
  const { data: appointment } = await axiosClient.post("/appointments", data);
  return appointment;
};

const sendEmail = async (data) => {
  axios.post("/api/sendEmail", data);
};

const getUserBookings = async (userEmail) => {
  const { data } = await axiosClient.get(
    `/appointments?[filters] [email] [$eq]=${userEmail}&populate[doctor][populate][0]=image`
  );
  return data;
};

const deleteBooking = async (id) => {
  await axiosClient.delete(`/appointments/${id}`);
};

export default {
  getAllCategories,
  getDoctorList,
  getDoctorsByCategory,
  getDoctorById,
  createAppointment,
  sendEmail,
  getUserBookings,
  deleteBooking,
};
