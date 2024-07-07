import React from "react";
import "./style.css";
import { TiTick } from "react-icons/ti";

const Stepper = ({ currentStep }) => {
  const steps = ["25%", "50%", "75%", "100%"];

  return (
    <div className="flex justify-between">
      {steps.map((step, i) => (
        <div
          key={i}
          className={`step-item ${currentStep === i + 1 ? "active" : ""} ${
            i + 1 < currentStep ? "complete" : ""
          }`}
        >
          <div className="step">
            {i + 1 < currentStep || currentStep === steps.length ? (
              <TiTick size={24} />
            ) : (
              i + 1
            )}
          </div>
          <p className="text-gray-500">{step}</p>
        </div>
      ))}
    </div>
  );
};

export default Stepper;
