import React from "react";
import diamond from "../../assets/dashboard/diamondIcon.svg";
const Pro = ({ isExpanded, isLargeScreen }) => {
  return (
    <div className="   lg:h-[20rem] md:h-[30rem] cursor-pointer w-auto flex justify-center items-center">
      <div
        className={` ${
          isExpanded
            ? "lg:bg-[#2BA4D9] bg-[#2BA4D9] md:bg-[#2BA4D9]"
            : isLargeScreen
            ? "lg:bg-[#2BA4D9] bg-[#2BA4D9] md:bg-[#2BA4D9]"
            : "lg:bg-transparent bg-transparent md:bg-transparent"
        }   xl:w-[78%] lg:w-[80%] h-[10rem] w-[20rem] flex justify-around   items-center flex-col  rounded-2xl relative`}
      >
        <div className="absolute xl:top-[-40px] xl:left-[50%] lg:top-[-30px] lg:left-[50%] top-[-30px] left-[50%] transform -translate-x-1/2 xl:w-[6rem] xl:h-[6rem] lg:w-[4rem] lg:h-[4rem] w-[4rem] h-[4rem] bg-white border-4 border-[#0091D1] rounded-full flex justify-center items-center">
          <img src={diamond} alt="Diamond Icon" className="w-[75%] h-[75%]" />
        </div>
        <div
          className={`xl:mt-8 md:mt-4 ${
            isExpanded ? "block" : isLargeScreen ? "block" : "hidden"
          }`}
        >
          <p className="text-center  font-semibold text-white xl:mt-4 lg:mt-0  lg:text-[1.2rem] md:text-[1.5rem] text-[1.0rem]">
            Upgrade to PRO
          </p>
          <p className="text-center text-white  lg:text-[0.8rem] md:text-[1.0rem] text-[0.8rem]">
            to get access to all features!
          </p>
          <p className="text-center text-white  lg:text-[0.8rem] md:text-[1.0rem] text-[0.8rem]">
            Connect with Venus World!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pro;
