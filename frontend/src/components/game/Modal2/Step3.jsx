import manufacturer2 from "../../../assets/Game/manufacturer2.png";

const Step3 = ({ setCurrentStep}) => {
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
              Send an order
            </h3>
            <p className="text-sm text-gray-500  mt-2 w-[80%]">
              Each week you need to decide{" "}
              <span className="text-[#F53838]">quantity</span> to order for{" "}
              <span className="text-[#F53838]">production</span>
            </p>
          </div>

          <div className="p-5">
            <h2 className="text-base font-semibold">You are starting with</h2>
            <div className="flex items-center gap-10 mt-5">
              <img src={manufacturer2} className="w-[50%] h-[50%]" alt="" />
              <h2 className="text-sm">
                You can see your planned productions boxes in your role pannel
              </h2>
            </div>
          </div>

          <div className="flex items-center p-4 md:p-5 gap-5 rounded-b dark:border-gray-600">
            <button
              type="button"
              className="text-[#34B3F1] bg-white hover:bg-blue-500 hover:text-white border border-[#34B3F1] text-sm px-6 py-2 rounded-lg"
              onClick={() => setCurrentStep(2)} // Go back to Step 2
            >
              BACK
            </button>
            <button
              type="button"
              className="text-white bg-[#34B3F1] hover:bg-blue-500 text-sm px-6 py-2 rounded-lg"
              onClick={() => setCurrentStep(4)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3;
