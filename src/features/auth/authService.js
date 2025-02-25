import axios from "axios";

const register = async (formData) => {
  const response = await axios.post(
    "https://chrono-watch-care-2.onrender.com/api/user",
    formData
  );
  localStorage.setItem("user", JSON.stringify(response.data));
  return response.data;
};

const login = async (formData) => {
  const response = await axios.post(
    "https://chrono-watch-care-2.onrender.com/api/user/login",
    formData
  );
  localStorage.setItem("user", JSON.stringify(response.data));
  return response.data;
};

const verification = async (formData) => {
  const response = await axios.post(
    "https://chrono-watch-care-2.onrender.com/api/user",
    formData
  );
  localStorage.setItem("user", JSON.stringify(response.data));
  return response.data;
};
const authService = {
  register,
  login,
  verification,
};

export default authService;
