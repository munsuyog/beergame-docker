import { FaArrowRight } from "react-icons/fa";
import { IoIosLock } from "react-icons/io";
import { MdDelete, MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";

const RoundSettings = () => {
  return (
    <div className="">
      <h1 className="font-bold text-xl mt-10">Roundes settings:</h1>

      <div className="flex flex-col lg:flex-row justify-center items-center gap-5 mt-10">
        <div className="border p-2 w-full lg:w-[40%] rounded-lg">
          <div className="flex justify-between items-center">
            <IoIosLock />
            <div className="flex items-center gap-2">
              <FaArrowRight />
              <MdDelete />
            </div>
          </div>
          <div className="p-2 mt-5">
            <h2 className="text-blue-500 text-lg font-semibold">Round 1</h2>
            <h1 className="text-2xl font-semibold">Short Beer Game</h1>
            <p className="text-sm mt-1 text-gray-400">
              12 weeks duration, lead times of 2 weeks
            </p>
          </div>

          <div className="flex justify-center mt-5 ">
            <Link to='/edit' className="flex items-center gap-2 bg-yellow-400 px-4 py-1 rounded-2xl">
              <MdEdit /> Edit
            </Link>
          </div>
        </div>

        <div className="border p-2 w-full lg:w-[40%] rounded-lg">
          <div className="flex justify-between items-center">
            <IoIosLock />
            <div className="flex items-center gap-2">
              <FaArrowRight />
              <MdDelete />
            </div>
          </div>
          <div className="p-2 mt-5">
            <h2 className="text-blue-500 text-lg font-semibold">Round 2</h2>
            <h1 className="text-2xl font-semibold">Improved Supply Chain</h1>
            <p className="text-sm mt-1 text-gray-400">
              Players have full visibility and can discuss the chat
            </p>
          </div>

          <div className="flex justify-center mt-5 ">
            <Link to='/edit' className="flex items-center gap-2 bg-yellow-400 px-4 py-1 rounded-2xl">
              <MdEdit /> Edit
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoundSettings;
