import React from "react";
import { useNavigate } from "react-router-dom";

import CustomButton from "./CustomButton";

const CancelButton = () => {

  const navigate = useNavigate();

  return (
    <CustomButton onClick={() => navigate(-1)}>{'취소하기'}</CustomButton>
  );
}

export default React.memo(CancelButton);