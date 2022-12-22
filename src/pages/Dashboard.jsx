/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { BASE_URL } from "../api/api";
import { Loading } from "../components/Templates/Loading";
import { Navigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/product_types`, {
        method: "GET",
      });
      const data = await response.json();
      console.log(JSON.stringify(data));
      if (data.messages === "success") {
        setCategory(data.product_types);
      }
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="my-5">
          <div className="w-full h-[600px] rounded-lg mb-5">
            <Swiper
              // install Swiper modules
              modules={[Navigation, Autoplay]}
              loopedSlides={3}
              spaceBetween={5}
              slidesPerView={1}
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
            >
              <SwiperSlide>
                <div>
                  <img
                    src="https://www.rumahweb.com/journal/wp-content/uploads/2006/02/Banner-Pengertian-Web-Hosting-Fitur-dan-Cara-Dapat-Gratisannya-740x389.png"
                    alt="img_banner"
                    className="w-full rounded-xl"
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div>
                  <img
                    src="https://www.rumahweb.com/journal/wp-content/uploads/2006/02/Banner-Pengertian-Web-Hosting-Fitur-dan-Cara-Dapat-Gratisannya-740x389.png"
                    alt="img_banner"
                    className="w-full rounded-xl"
                  />
                </div>
              </SwiperSlide>
            </Swiper>
          </div>

          <div className="my-20">
            <h1 className="text-center font-bold text-3xl mb-5">
              Product Category
            </h1>
            <div>
              <Swiper
                // install Swiper modules
                modules={[Navigation, Autoplay]}
                loopedSlides={3}
                spaceBetween={20}
                slidesPerView={category.length > 3 ? 3 : category.length}
                loop={category.length > 3 ? true : false}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
              >
                {category.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div
                      className="rounded-xl p-5 cursor-pointer font-semibold bg-primary hover:bg-secondary"
                      onClick={() => navigate(`/product?=${item.name}`)}
                    >
                      <h1 className="text-white text-center">{item.name}</h1>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// code_product
// :
// "P51010103"
// created_at
// :
// "2022-07-17T17:58:06.272Z"
// id
// :
// 103
// name
// :
// "Token PLN 655.500"
// operator
// :
// created_at
// :
// "2022-07-03T12:48:52.768Z"
// id
// :
// 1
// name
// :
// "Gopay"
// [[Prototype]]
// :
// Object
// operator_id
// :
// 1
// price
// :
// 655500
// product_type
// :
// {id: 51, name: 'Token PKN', created_at: '2022-07-03T12:40:53.936Z'}
// product_type_id
// :
// 51
// qty
// :
// 20
// status
// :
// true
