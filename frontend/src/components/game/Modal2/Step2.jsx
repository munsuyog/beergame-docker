import { useSelector } from "react-redux";
import manufacturer from "../../../assets/Game/manufacturer.png";

const Step2 = ({ setCurrentStep }) => {
  const {playScreenInfo} = useSelector((state) => state.game);
  console.log(playScreenInfo)
  return (
    <div
      id="default-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
    >
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow ">
          <div className="p-4 md:p-5">
            <h3 className="text-xl font-bold text-gray-900 ">
              Objective of the Game
            </h3>
            <p className="text-sm text-[#23BB86]  mt-4 w-[80%]">
              Fullfill your client’s orders while keeping your costs to minimum.
            </p>
          </div>

          <div className="flex items-center flex-wrap justify-between w-[70%] px-5">
            <h2 className="text-sm ">
              Stock Cost : <span className="text-[#EB5757]">${playScreenInfo.game_info.holding_cost}</span>
              <span className="text-[#C4C4C4]">/unit/week</span>
            </h2>
            <h2 className="text-sm">
              Backorder Cost : <span className="text-[#EB5757]">${playScreenInfo.game_info.backorder_cost}</span>
              <span className="text-[#C4C4C4]">/unit/week</span>
            </h2>
            <h2 className="text-sm ">
              Order Delay : <span className="text-[#EB5757]">{playScreenInfo.game_info.delay_ordering}</span>
            </h2>
            <h2 className="text-sm">
              Shipping Delay : <span className="text-[#EB5757]">{playScreenInfo.game_info.delay_shipping}</span>
            </h2>
          </div>
          <div className="flex items-center p-4 md:p-5 gap-5 rounded-b ">
            <button
              type="button"
              className="text-[#34B3F1] bg-white hover:bg-blue-500 hover:text-white border border-[#34B3F1] text-sm px-6 py-2 rounded-lg"
              onClick={() =>setCurrentStep(1)}
            >
              BACK
            </button>
            <button
              type="button"
              className="text-white bg-[#34B3F1] hover:bg-blue-500 text-sm px-6 py-2 rounded-lg"
              onClick={() =>setCurrentStep(3)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2;
