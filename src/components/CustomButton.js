
const CustomButton = ({type, onClick,children}) => {
  const btnType = ['positive', 'negative'].includes(type) ? type : 'default';
  return (
    <button className={["CustomButton", `CustomButton_${btnType}`].join(" ")} onClick={onClick}>
      {children}
    </button>
  )
}

CustomButton.defaultProps = {
  type: "default",
}

export default CustomButton;