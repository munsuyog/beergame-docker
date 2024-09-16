import React, { useState } from "react";
import user from "../../assets/dashboard/user.png";

const GameNav = ({ isExpanded }) => {
  const [openPopUp, setOpenPopUp] = useState(false);
  const [value, setValue] = useState("English");
  return (
    <div
      className={`fixed bg-white lg:w-[80%] md:w-[90%] w-[80%] lg:h-[10vh] md:h-[6vh] h-[12vh] b-2 z-20   transition-all duration-300 ease-in-out `}
    >
      <section className="w-full pb-2 border-b-2 border-gray-200 h-full  flex justify-between items-center md:px-4 px-0  ">
        <button className="font-semibold ml-2 bg-[#FFBF1A] p-2 lg:px-5 lg:py-2 text-white rounded-xl lg:text-base  md:text-[1.2rem] text-[0.8rem]">
          Demo Video
        </button>
      </section>
    </div>
  );
};

export default GameNav;
