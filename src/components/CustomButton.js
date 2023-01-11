import React from "react";

const CustomButton = ({type, onClick,children}) => {
  console.log('타지망')
  const btnType = type || 'default';

  return (
    <button className={["CustomButton", `CustomButton_${btnType}`].join(" ")} onClick={onClick}>
      {children}
    </button>
  )
}

CustomButton.defaultProps = {
  type: "default",
}

export default React.memo(CustomButton);