import { Swiper, SwiperSlide } from "swiper/react";
import "../../../../node_modules/swiper/swiper-bundle.min.css";
import { Typewriter } from "react-simple-typewriter";
import { Navigation } from "swiper/modules";

import slider1 from "../../../assets/images/banner2.jpg";
import slider2 from "../../../assets/images/banner5.jpg";
import slider3 from "../../../assets/images/banner3.jpeg";
import slider4 from "../../../assets/images/banner4.jpg";

const Banner = () => {
  return (
    <Swiper
      navigation={true}
      speed={1300}
      loop={true}
      className="mySwiper"
      modules={[Navigation]}
    >
      <SwiperSlide>
        <div
          className="bg-no-repeat w-10/12 mt-16 mx-auto rounded-2xl bg-center bg-cover h-[400px] flex justify-center items-center"
          style={{
            backgroundImage: `url(${slider1})`,
          }}
        >
          <div className="text-center h-full w-full flex justify-center items-center">
            <div className="mt-12 space-y-14">
              <h1 className="text-[39px] font-extrabold text-white">
                Your Destination for{" "}
                <Typewriter
                  words={["Cutting", "Edge", "Tech"]}
                  loop={true}
                  cursor
                  cursorStyle="_"
                  typeSpeed={80}
                  deleteSpeed={50}
                  delaySpeed={1200}
                ></Typewriter>{" "}
              </h1>

              <button
                type="button"
                className="text-slate-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center  bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl"
              >
                Discover More
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div
          className="bg-no-repeat rounded-2xl  w-10/12 mt-16 mx-auto bg-center bg-cover h-[400px] flex justify-center items-center"
          style={{
            backgroundImage: `url(${slider2})`,
          }}
        >
          <div className="text-center bg-gray-700 h-full w-full bg-opacity-30 flex justify-center items-center">
            <div className="mt-12 space-y-6">
              <h1 className="text-[39px] font-bold text-white">
                Nestle Into the{" "}
                <Typewriter
                  words={["World", "Of", "Technology"]}
                  loop={true}
                  cursor
                  cursorStyle="_"
                  typeSpeed={80}
                  deleteSpeed={50}
                  delaySpeed={1200}
                ></Typewriter>{" "}
              </h1>

              <button
                type="button"
                className="text-slate-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center  bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl"
              >
                Discover More
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div
          className="bg-no-repeat  w-10/12 mt-16 mx-auto rounded-2xl  bg-center bg-cover h-[400px] flex justify-center items-center"
          style={{
            backgroundImage: `url(${slider4})`,
          }}
        >
          <div className="text-center bg-gray-700 h-full w-full bg-opacity-30 flex justify-center items-center">
            <div className="mt-12 space-y-6">
              <h1 className="text-[39px] font-bold text-white">
                Buzzing with the{" "}
                <Typewriter
                  words={["Latest", "Tech", "Trends"]}
                  loop={true}
                  cursor
                  cursorStyle="_"
                  typeSpeed={80}
                  deleteSpeed={50}
                  delaySpeed={1200}
                ></Typewriter>{" "}
              </h1>

              <button
                type="button"
                className="text-slate-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center  bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl"
              >
                Discover More
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div
          className="bg-no-repeat rounded-2xl  w-10/12 mt-16 mx-auto bg-center bg-cover h-[400px] flex justify-center items-center"
          style={{
            backgroundImage: `url(${slider3})`,
          }}
        >
          <div className="text-center bg-gray-700 h-full w-full bg-opacity-30 flex justify-center items-center">
            <div className="mt-12 space-y-6">
              <h1 className="text-[39px] font-bold text-white">
                Elevate Your{" "}
                <Typewriter
                  words={["Tech", "Experience", "...!"]}
                  loop={true}
                  cursor
                  cursorStyle="_"
                  typeSpeed={80}
                  deleteSpeed={50}
                  delaySpeed={1200}
                ></Typewriter>{" "}
              </h1>

              <button
                type="button"
                className="text-slate-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center  bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl"
              >
                Discover More
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Banner;
