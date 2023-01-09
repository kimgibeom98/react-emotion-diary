import React from "react";
import { useNavigate } from "react-router-dom";

import MyButton from "./MyButton";

const CancelButton = () => {

  const navigate = useNavigate();

  return (
    <MyButton text={"취소하기"} onClick={() => navigate(-1)} />
  );
}

export default React.memo(CancelButton);