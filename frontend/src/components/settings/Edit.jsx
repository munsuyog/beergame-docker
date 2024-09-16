import { MdEdit, MdGroup } from "react-icons/md";
import homes from "../../assets/Game/homes.png";
import { Link } from "react-router-dom";
import FinalConsumer from "./FinalConsumer";

const Edit = () => {
  return (
    <div className="w-[95%] lg:w-[90%] mx-auto my-20 border rounded-md shadow-md  bg-gray-200">
      <div className="bg-white p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MdGroup className="text-2xl" />
            <h1 className="text-xl font-semibold">Supply Chain Roles</h1>
          </div>
          <Link
            to="/edit"
            className="flex items-center gap-2 bg-yellow-400 px-4 py-1"
          >
            <MdEdit /> Edit
          </Link>
        </div>
        <div className="flex justify-center mt-5">
          <img src={homes} alt="" className="w-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 items-center justify-center gap-3 mt-5">
          <div className="">
            <h2>
              <span className="font-semibold">For all roles:</span> Stock:{" "}
              <span className="font-semibold">8</span>,
            </h2>
          </div>
          <div className="">
            <h2>
              <span className="font-semibold">Initial Orders:</span> Stock:{" "}
              <span className="font-semibold">4</span>,
            </h2>
          </div>
          <div className="">
            <h2>
              <span className="font-semibold">Lead Time:</span> Stock:{" "}
              <span className="font-semibold">2 weeks</span>,
            </h2>
          </div>
          <div className="">
            <h2>
              <span className="font-semibold">Stock Cost:</span> Stock:{" "}
              <span className="font-semibold text-blue-500">0.5 $</span>,
            </h2>
          </div>
          <div className="">
            <h2>
              <span className="font-semibold">Backorder Cost:</span> Stock:{" "}
              <span className="font-semibold text-red-600">1 $</span>,
            </h2>
          </div>
        </div>
      </div>
      <div className="bg-white p-5 mt-5">
      <FinalConsumer />
      </div>
    </div>
  );
};

export default Edit;
