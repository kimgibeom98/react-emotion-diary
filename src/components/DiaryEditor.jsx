import React from "react";
import { useNavigate } from "react-router-dom";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { DiaryDisaptchContext } from "../App";

import EmotionItem from "./EmotionItem";
import CustomButton from "./CustomButton";

import { getStringDate } from "../util/date";
import { emotionList } from "../util/emotion";
import CustomHeader from "./CustomHeader";

const DiaryEditor = ({ isEdit, originData }) => {

  const navigate = useNavigate();

  const contentRef = useRef();
  const [content, setContent] = useState('');
  const [emotion, setEmotion] = useState(3);

  const { onCreate, onEdit, onRemove } = useContext(DiaryDisaptchContext);

  const [date, setDate] = useState(getStringDate(new Date()));

  const handleClickEmote = useCallback((emotion) => {
    setEmotion(emotion);
  }, []);

  const handelSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }
    if (window.confirm(isEdit ? "일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까?")) {
      if (!isEdit) {
        onCreate(emotion, content, date);
      } else {
        onEdit(originData.id, date, content, emotion);
      }
    }

    navigate('/', { replace: true })
  };

  const handelRemove = useCallback(() => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      onRemove(originData.id)
      navigate('/', { replace: true })
    }
  }, []);

  useEffect(() => {
    if (isEdit) {
      setDate(getStringDate(new Date(parseInt(originData.date))))
      setEmotion(originData.emotion);
      setContent(originData.content)
    }
  }, [isEdit, originData]);


  return (
    <>
      <CustomHeader headText={isEdit ? "일기 수정하기" : "새 일기쓰기"}
        leftChild={<CustomButton onClick={useCallback(() => navigate(-1), [navigate])}>{'< 뒤로가기'}</CustomButton>}
        rightChild={isEdit && (
          <CustomButton type={'negative'} onClick={handelRemove}>{'삭제하기'}</CustomButton>
        )} />
      <section className="DiaryEditor">
        <article>
          <h4>오늘은 언제인가요?</h4>
          <div className="input_box">
            <input className="input_date" value={date} onChange={(e) => setDate(e.target.value)} type='date' />
          </div>
        </article>
        <article>
          <h4>오늘의 감정</h4>
          <div className="input_box emotion_list_wrapper">
            {emotionList.map((it) => <EmotionItem key={it.emotion_id} {...it} onClick={handleClickEmote} isSelected={it.emotion_id === emotion} />)}
          </div>
        </article>
        <article>
          <h4>오늘의 일기</h4>
          <div className="input_box text_wrapper">
            <textarea placeholder="오늘은 어땠나요" ref={contentRef} value={content} onChange={(e) => setContent(e.target.value)}></textarea>
          </div>
        </article>
        <article>
          <div className="control_box">
            <CustomButton onClick={useCallback(() => navigate(-1), [navigate])}>{'취소하기'}</CustomButton>
            <CustomButton type={"positive"} onClick={handelSubmit}>{'작성완료'}</CustomButton>
          </div>
        </article>
      </section>
    </>
  );
};

export default DiaryEditor;