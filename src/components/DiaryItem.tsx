import React from "react";
import { useNavigate } from "react-router-dom";

import CustomButton from "./CustomButton";

const DiaryItem = ({ id, emotion, content, date }) => {
  // 이미지가 안나올경우 아래코드 2줄 추가
  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || "";

  const navigate = useNavigate();

  const goDetail = () => {
    navigate(`/diary/${id}`);
  };

  const goEdit = () => {
    navigate(`/edit/${id}`);
  };

  const strDate = new Date(parseInt(date)).toLocaleDateString();

  return (
    <article className="DiaryItem">
      <div onClick={goDetail} className={["emotion_img_wrapper", `emotion_img_wrapper_${emotion}`].join(" ")}>
        <img src={`${process.env.PUBLIC_URL}assets/emotion${emotion}.png`} alt="감정 이미지" />
      </div>
      <div className="info_wrapper" onClick={goDetail}>
        <div className="diary_date">{strDate}</div>
        <div className="diary_content_preview">{content.slice(0, 25)}</div>
      </div>
      <div>
        <CustomButton onClick={goEdit}>{'수정하기'}</CustomButton>
      </div>
    </article>
  );
};

export default React.memo(DiaryItem);