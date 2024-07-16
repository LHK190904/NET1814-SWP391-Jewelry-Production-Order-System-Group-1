import React from "react";
import { Steps } from "antd";
import { CheckOutlined } from "@ant-design/icons";

const { Step } = Steps;

const Stepper = ({ currentStep }) => {
  const steps = ["25%", "50%", "75%", "100%"];

  return (
    <Steps current={currentStep - 1} size="default">
      {steps.map((step, index) => (
        <Step
          key={index}
          title={step}
          icon={
            index + 1 < currentStep || currentStep === steps.length ? (
              <CheckOutlined />
            ) : (
              index + 1
            )
          }
        />
      ))}
    </Steps>
  );
};

export default Stepper;
