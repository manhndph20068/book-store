import { useLocation } from "react-router-dom";
import ViewDetail from "../../components/Book/ViewDetail";
import { callGetBookById } from "../../services/api";
import { useEffect, useState } from "react";
const BookPage = (props) => {
  let location = useLocation();
  const [bookData, setBookData] = useState({});
  let param = new URLSearchParams(location.search);
  const id = param.get("id");

  const getBookById = async () => {
    const res = await callGetBookById(id);
    if (res && res?.data) {
      let raw = res.data;
      raw.items = getImage(raw);
      setTimeout(() => {
        setBookData(raw);
      }, 800);
    }
  };

  const getImage = (raw) => {
    const image = [];
    if (raw.thumbnail) {
      image.push({
        original: `${import.meta.env.VITE_BACKEND_URL}/images/book/${
          raw.thumbnail
        }`,
        thumbnail: `${import.meta.env.VITE_BACKEND_URL}/images/book/${
          raw.thumbnail
        }`,
      });
    }
    if (raw.slider) {
      raw.slider?.map((item) => {
        image.push({
          original: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`,
          thumbnail: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`,
        });
      });
    }
    return image;
  };

  useEffect(() => {
    getBookById();
  }, [id]);

  return (
    <>
      <ViewDetail bookData={bookData} />
    </>
  );
};
export default BookPage;
