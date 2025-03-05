import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { Box, Button, IconButton, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Image1 from "../../assets/walkover/rafiki.png";
import Image2 from "../../assets/walkover/cuate.png";
import Image3 from "../../assets/walkover/pana.png";
import Image4 from "../../assets/walkover/thumbsup.png";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

let walkover = [
  {
    image: Image1,
    title: "Effortless application Management",
    descriptions:
      "Track the progress of job applications from the issuance of offer letters to interview invitations ensuring a streamlined and organized hiring process",
    width: 500,
  },

  {
    image: Image2,
    title: "Precise Attendance Tracking",
    descriptions:
      "Clikkle HR allows you to effortlessly record daily attendance with detailed notes providing a comprehensive overview of employee activities",
    width: 500,
  },
  {
    image: Image3,
    title: "Dynamic Job List Creation and Editing",
    descriptions:
      "Create and edit job details effortlessly, ensuring that your team has access to the most up-to-date information for effective collaboration",
    width: 600,
  },
  {
    image: Image4,
    title: "  Recognition and Rewards",
    descriptions:
      " Recognize outstanding contributions and motivate your Workforce with a dedicated platform for acknowledging accomplishments",
    width: 600,
  },
];

const WalkoverHeader = () => {
  const navigate = useNavigate();
  const swiperRef = useRef(null);

  let logoSrc = "https://cdn.clikkle.com/images/hr/logo/2023/hr.png",
    name = "Clikkle",
    smallerText = false;

  const [currentIndex, setCurrentIndex] = useState(0);
  
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
    if (swiperRef?.current) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
    if (swiperRef?.current) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const handleSlideChange = (swiper) => {
    setCurrentIndex(swiper?.activeIndex ?? 0);
  };

  const handleGoToCheckout = () => {
    navigate("/createOrganization");
  };

  const skip = (
    <button
      onClick={handleGoToCheckout}
      className="h-fit w-fit mt-8 mr-4 py-2 px-6 text-right block text-blue-500 rounded z-10"
    >
      Skip
    </button>
  );

  const slides = (
    <Box className="flex">
      {[0, 1, 2, 3].map((_, index) => (
        <Box
          key={index}
          className={`mx-1 transition-all h-3 duration-300 ${
            currentIndex === index ? "w-8  bg-blue-500" : "w-3  bg-gray-300"
          } rounded-full`}
        ></Box>
      ))}
    </Box>
  );

  const navbuttons = (
    <div className="flex gap-4">
      <div className="p-px w-fit h-fit rounded-full bg-gray-300">
        <IconButton
          onClick={handlePrev}
          disabled={currentIndex === 0}
          color="primary"
          className="rounded-full"
        >
          <ArrowBackIos
            color={currentIndex === 0 ? "action" : ""}
            className="translate-x-1"
          />
        </IconButton>
      </div>
      <div className="p-px w-fit h-fit rounded-full bg-gray-300">
        <IconButton
          disabled={currentIndex === 3}
          onClick={handleNext}
          color="primary"
          className="rounded-full"
        >
          <ArrowForwardIos color={currentIndex === 3 ? "action" : ""} />
        </IconButton>
      </div>
    </div>
  );

  return (
    <Box
      sx={{ backgroundColor: "background.main" }}
      className="w-full h-full flex flex-col items-center justify-center relative"
    >
      <Box className="hidden md:flex absolute w-full h-full items-center justify-center z-0">
        <div className="fixed right-0 w-full h-full md:scale-125 scale-100  rounded-full transform md:translate-x-[76%] translate-x-[50%]"></div>
      </Box>
      <div className="z-10 hidden md:flex sm:flex-row-reverse flex-col w-full h-full sm:justify-between md:items-start items-end">
        {skip}
        <div className="w-full h-1/3 sm:h-full sm:w-1/2 flex items-center justify-center">
          <div className="w-4/6 sm:w-auto">
            <img
              className="origin-center"
              style={{ width: walkover[currentIndex].width }}
              src={ walkover[currentIndex].image}
              alt={name}
            />
          </div>
        </div>
        <div className=" w-full h-1/2 flex flex-col gap-1 sm:h-full sm:w-1/2 sm:pl-16 py-10">
          {/* <div className="hidden sm:flex items-center">
            <img className={`w-14 `} src={logoSrc} alt={name} />
            <h1
              className={`text-gray-400 mx-2 dark:text-white text-center align-middle sm:text-xl md:text-xl lg:text-xl font-normal text-sm`}
            >
              <span className="text-gray-500 font-medium"> Clikkle </span> Hr
            </h1>
          </div> */}
          <div className="h-[65%] sm:mt-0 mt-3 w-4/6 sm:w-full sm:text-left sm:pr-2 m-auto text-center flex flex-col sm:justify-end justify-center">
            <div className="text-2xl sm:text-5xl">
              {walkover[currentIndex].title}
            </div>
            <div className="my-5">
              <div className="font-medium text-gray-500 text-xs sm:text-xl">
                {walkover[currentIndex].descriptions}
              </div>
            </div>
            {currentIndex === 3 &&  (
              <div className="hidden sm:block">
                <Button
                  className="mb-2 w-2/6"
                  onClick={handleGoToCheckout}
                  variant="contained"
                  sx={{ borderRadius: 3, px: 3, py: 1.5 }}
                >
                  Get Started
                </Button>
              </div>
            )}
          </div>
          {currentIndex === 3 &&  (
            <div className=" flex justify-center mb-4 sm:hidden">
              <Button
                className=" w-5/6  sm:w-2/6"
                onClick={handleGoToCheckout}
                variant="contained"
                sx={{ borderRadius: 3, px: 3, py: 1.5 }}
              >
                Get Started
              </Button>
            </div>
          )}

          <div className="h-[30%] flex flex-row-reverse sm:flex-col justify-between ">
            {navbuttons}
            {slides}
          </div>
        </div>
      </div>
      <div className="md:hidden flex flex-col items-end w-full h-full mb-20">
        {skip}
        <Swiper
          className="w-full h-full"
          onSlideChange={handleSlideChange}
          ref={swiperRef}
        >
          {walkover.map((item, index) => (
            <SwiperSlide
              key={`${item?.title}_${index}`}
              className="w-full h-full !flex flex-col justify-center text-center"
            >
              <div className="w-[80vmin] h-fit m-auto">
                <div className="w-full sm:h-full flex items-center justify-center">
                  <img
                    className="origin-center w-[50vmin] h-auto max-w-full"
                    src={item.image}
                    alt={item.title}
                  />
                </div>
                <div className="w-full flex flex-col gap-1 py-10 sm:pl-16">
                  <div className="text-2xl sm:text-5xl">{item.title}</div>
                  <div className="my-5">
                    <Typography variant="body1" className="text-gray-500">
                      {item.descriptions}
                    </Typography>
                  </div>
                  {index === 3 &&  (
                    <Button
                      onClick={handleGoToCheckout}
                      variant="contained"
                      className="hidden sm:block"
                      sx={{ borderRadius: 3, px: 3, py: 1.5 }}
                    >
                      Get Started
                    </Button>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="w-full px-8 flex items-center justify-between">
          {slides}
          {navbuttons}
        </div>
      </div>
    </Box>
  );
};

export default WalkoverHeader;
