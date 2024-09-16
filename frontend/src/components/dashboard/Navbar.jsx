import React, { useState } from "react";
import user from "../../assets/dashboard/user.png";
import { useSelector } from "react-redux";

const Navbar = ({ isExpanded }) => {
  return (
    <div
      className={`fixed lg:w-[80%] md:w-[90%] w-[80%] lg:h-[10vh] md:h-[6vh] h-[12vh] b-2 z-20 bg-white  transition-all duration-300 ease-in-out `}
    >
      <section className="w-full  pb-2 border-b-2 border-gray-200 h-full  flex justify-between items-center md:px-4 px-0  ">
        <div className="flex md:flex-row flex-col h-full md:justify-start justify-end items-center gap-x-4 md:w-[50%] w-[40%]">
          <div className="w-[20%]">
          </div>
        </div>

        {/* user-icon */}
        <div className="md:w-[50%] w-[60%] h-full md:px-0 px-2 flex   justify-end items-center md:gap-x-2 gap-x-0">

          {/* <div className="w-fit   h-full flex flex-col justify-center ps-2">
            <p className="xl:text-[1rem] lg:text-[0.8rem] md:text-[0.8rem] text-[0.6rem] font-semibold">
              {user.name}
            </p>
            <p className="xl:text-[1rem] lg:text-[0.8rem] md:text-[0.8rem] text-[0.6rem]">
              {user.email}
            </p>
          </div> */}
        </div>
      </section>
    </div>
  );
};

export default Navbar;
