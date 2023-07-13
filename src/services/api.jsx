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

const callLogout = () => {
  return axios.post("/api/v1/auth/logout");
};

const callGetAllUserWithPaginate = (query) => {
  return axios.get(`/api/v1/user?${query}`);
};

const callCreateUser = (fullName, password, email, phone) => {
  return axios.post(`/api/v1/user`, {
    fullName,
    password,
    email,
    phone,
  });
};

const callImportUser = (data) => {
  return axios.post(`/api/v1/user/bulk-create`, data);
};

export {
  callRegister,
  callLogin,
  callFetchAccount,
  callLogout,
  callGetAllUserWithPaginate,
  callCreateUser,
  callImportUser,
};
