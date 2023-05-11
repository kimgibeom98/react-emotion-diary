import React from "react";
import { useNavigate } from "react-router-dom";

import { DataInfo } from '../interfaces/Userinterface'

const DiaryItem = ({ id, content, date, title }: DataInfo) => {
  const navigate = useNavigate();
  const goDetail = () => {
    navigate(`/diary/${id}`);
  };

  const goEdit = () => {
    navigate(`/edit/${id}`);
  };

  const strDate = new Date(Number(date)).toLocaleDateString();

  return (
    <article className="DiaryItem">
      <div className="info_wrapper" onClick={goDetail}>
        <strong className="diary_title">{title}</strong>
        <span className="diary_date">{strDate}</span>
        <p className="diary_content_preview">{content.slice(0, 25)}</p>
      </div>
      <div>
        <button className="edit_btn" onClick={goEdit}>{'수정하기'}</button>
      </div>
    </article>
  );
};

export default React.memo(DiaryItem);