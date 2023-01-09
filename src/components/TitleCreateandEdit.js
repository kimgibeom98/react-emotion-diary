import React from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "./CustomButton";
import MyHeader from "./MyHeader";

const TitleCreateandEdit = ({ isEdit, onDel }) => {
  const navigate = useNavigate();
  return (
    <MyHeader
      headText={isEdit ? "일기 수정하기" : "새 일기쓰기"}
      leftChild={<CustomButton onClick={() => navigate(-1)}>{'< 뒤로가기'}</CustomButton>}
      rightChild={isEdit && (
        <CustomButton type={'negative'} onClick={onDel}>{'삭제하기'}</CustomButton>
      )} />
  )
};

export default React.memo(TitleCreateandEdit);