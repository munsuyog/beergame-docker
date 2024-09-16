import { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";

const Modal2 = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);

  // const setShowStep2 = () => setCurrentStep(2);
  // const setShowStep3 = () => setCurrentStep(3);
  // const setShowStep4 = () => setCurrentStep(4);

  console.log(currentStep)

  return (
    <div>
      {currentStep === 1 && (
        <Step1 setCurrentStep={setCurrentStep} onClose={onClose} />
      )}
      {currentStep === 2 && (
        <Step2
          // setShowStep2={() => setCurrentStep(1)}
          setCurrentStep={setCurrentStep}
        />
      )}
      {currentStep === 3 && (
        <Step3
          setShowStep3={() => setCurrentStep(2)}
          setCurrentStep={setCurrentStep}
        />
      )}
      {currentStep === 4 && (
        <Step4 setCurrentStep={setCurrentStep} onClose={onClose} />
      )}
    </div>
  );
};

export default Modal2;
