import React, { MouseEventHandler, ReactNode } from "react";

interface CustomButtonType {
  type: String;
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
}

const CustomButton = ({ type, onClick, children }: CustomButtonType) => {
  const btnType = type || 'default';

  return (
    <button className={["CustomButton", `CustomButton_${btnType}`].join(" ")} onClick={onClick}>
      {children}
    </button>
  )
};

CustomButton.defaultProps = {
  type: "default",
};

export default React.memo(CustomButton);