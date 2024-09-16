import { IoIosLock } from "react-icons/io";
import { MdOutlineZoomInMap } from "react-icons/md";

const Round2 = () => {
  return (
    <div className="border-2 md:w-[80%] lg:w-[50%] mx-auto mt-[-0.8rem] rounded-xl">
      <div className="flex items-center justify-between p-5">
        <div className="flex flex-col lg:flex-row items-center gap-2">
          <IoIosLock className="text-3xl" />
          <h2 className="text-2xl lg:text-3xl font-semibold ">Round 2</h2>
          <h2 className="font-semibold text-sm lg:text-xl">Short Beer Game ?</h2>
        </div>
        <MdOutlineZoomInMap className="text-3xl text-blue-500" />
      </div>
    </div>
  );
};

export default Round2;
