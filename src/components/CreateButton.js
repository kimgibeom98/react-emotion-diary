import React from "react";
import { useNavigate } from "react-router-dom";

import CustomButton from "./CustomButton";

const CreateButton = () => {
  const navigate = useNavigate();

  return (
    <CustomButton type={'positive'} onClick={() => navigate('/new')}>{'새 일기 쓰기'}</CustomButton>
  )
}

export default React.memo(CreateButton);