import { useNavigate } from "react-router-dom";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { DiaryDisaptchContext } from "../App";

import CustomButton from "./CustomButton";

import { getStringDate } from "../util/date";
import CustomHeader from "./CustomHeader";
import { EditDitail } from "../interfaces/Userinterface";

const DiaryEditor = ({ isEdit, originData }: EditDitail) => {

  const navigate = useNavigate();
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const [content, setContent] = useState('');
  const [emotion, setEmotion] = useState(3);
  const [date, setDate] = useState(getStringDate(new Date()));
  const [title, setTitle] = useState('');

  const { onCreate, onEdit, onRemove } = useContext(DiaryDisaptchContext);

  const handelSubmit = () => {
    if (title.length < 1) {
      titleRef.current.focus();
      return;
    } else if (content.length < 1) {
      contentRef.current.focus();
      return;
    }
    if (window.confirm(isEdit ? "일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까?")) {
      !isEdit ? onCreate(emotion, content, date, title) : onEdit(originData.id, date, content, emotion, title);
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
      setDate(getStringDate(new Date(Number(originData.date))))
      setEmotion(originData.emotion);
      setContent(originData.content)
      setTitle(originData.title)
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
          <h4>일기 제목</h4>
          <div className="input_box text_wrapper">
            <input placeholder="제목을 입력해 주세요" ref={titleRef} value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
        </article>
        <article>
          <h4>오늘은 언제인가요?</h4>
          <div className="input_box">
            <input className="input_date" value={date} onChange={(e) => setDate(e.target.value)} type='date' />
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