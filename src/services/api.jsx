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

const callListBookAdmin = (query) => {
  return axios.get(`/api/v1/book?${query}`);
};

const callImportUser = (data) => {
  return axios.post(`/api/v1/user/bulk-create`, data);
};

const callUpdateUser = (_id, fullName, phone) => {
  return axios.put(`/api/v1/user`, {
    _id,
    fullName,
    phone,
  });
};

const callGetListCategory = () => {
  return axios.get(`/api/v1/database/category`);
};

const callDeletetUser = (_id) => {
  return axios.delete(`/api/v1/user/${_id}`);
};

const callUploadBookImg = (fileImg) => {
  const bodyFormData = new FormData();
  bodyFormData.append("fileImg", fileImg);
  return axios({
    method: "post",
    url: "/api/v1/file/upload",
    data: bodyFormData,
    headers: {
      "Content-Type": "multipart/form-data",
      "upload-type": "book",
    },
  });
};

const callCreateBook = (
  thumbnail,
  slider,
  mainText,
  author,
  price,
  sold,
  quantity,
  category
) => {
  return axios.post(`/api/v1/book`, {
    thumbnail: thumbnail,
    slider: slider,
    mainText: mainText,
    author: author,
    price: price,
    sold: sold,
    quantity: quantity,
    category: category,
  });
};

const callUpdateBook = (
  id,
  thumbnail,
  slider,
  mainText,
  author,
  price,
  sold,
  quantity,
  category
) => {
  return axios.put(`/api/v1/book/${id}`, {
    thumbnail: thumbnail,
    slider: slider,
    mainText: mainText,
    author: author,
    price: price,
    sold: sold,
    quantity: quantity,
    category: category,
  });
};

const callDeletetBook = (_id) => {
  return axios.delete(`/api/v1/book/${_id}`);
};

const callGetBookById = (_id) => {
  return axios.get(`/api/v1/book/${_id}`);
};

export {
  callRegister,
  callLogin,
  callFetchAccount,
  callLogout,
  callGetAllUserWithPaginate,
  callCreateUser,
  callImportUser,
  callUpdateUser,
  callDeletetUser,
  callListBookAdmin,
  callGetListCategory,
  callUploadBookImg,
  callCreateBook,
  callUpdateBook,
  callDeletetBook,
  callGetBookById,
};
