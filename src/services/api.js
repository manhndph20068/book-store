import axios from "../utils/axiosCustomize";

const callRegister = (fullName, email, password, phone) => {
  return axios.post(
    "/api/v1/user/register",
    {
      fullName,
      email,
      password,
      phone,
    },
    setTimeout(1000)
  );
};

const callLogin = (username, password) => {
  return axios.post("/api/v1/auth/login", {
    username,
    password,
  });
};

const callFetchAccount = () => {
  return axios.get("/api/v1/auth/account");
};

export { callRegister, callLogin, callFetchAccount };
