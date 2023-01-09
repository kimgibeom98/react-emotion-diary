import React from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";
import MyHeader from "./MyHeader";

const TitleCreateandEdit = ({ isEdit, onDel }) => {
  const navigate = useNavigate();
  return (
    <MyHeader
      headText={isEdit ? "일기 수정하기" : "새 일기쓰기"}
      leftChild={<MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />}
      rightChild={isEdit && (
        <MyButton text={"삭제하기"} type={'negative'} onClick={onDel} />
      )} />
  )
};

export default React.memo(TitleCreateandEdit);