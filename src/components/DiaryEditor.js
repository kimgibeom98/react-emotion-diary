import React from "react";
import { useNavigate } from "react-router-dom";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { DiaryDisaptchContext } from "../App";

import MyButton from "./MyButton";
import MyHeader from "./MyHeader";
import EmotionItem from "./EmotionItem";

import { getStringDate } from "../util/date";
import { emotionList } from "../util/emotion";

const TitleHeader = React.memo(({isEdit, onClick, onDel}) => {
  console.log("타면안대")
  return (
    <MyHeader
      headText={isEdit ? "일기 수정하기" : "새 일기쓰기"}
      leftChild={<MyButton text={"< 뒤로가기"} onClick={onClick} />}
      rightChild={isEdit && (
        <MyButton text={"삭제하기"} type={'negative'} onClick={onDel} />
      )} />
  )
})


const DiaryEditor = ({ isEdit, originData }) => {

  const contentRef = useRef();
  const [content, setContent] = useState('');
  const [emotion, setEmotion] = useState(3);
  const navigate = useNavigate();

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
  }



  const BtnCancel = () => {
    return (
      <MyButton text={"취소하기"} onClick={() => navigate(-1)} />
    )
  }

  const BtnComplete = () => {
    return (
      <MyButton text={"작성완료"} type={"positive"} onClick={handelSubmit} />
    )
  }


  const handelRemove = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      onRemove(originData.id)
      navigate('/', { replace: true })
    }
  };

  // const TitleHeader = memo(() => {
  //   console.log('TitleHeader')
  //   return (
  //     <MyHeader
  //       headText={true ? "일기 수정하기" : "새 일기쓰기"}
  //       leftChild={<MyButton text={"< 뒤로가기"} onClick={() => console.log(-1)} />}
  //       rightChild={true && (
  //         <MyButton text={"삭제하기"} type={'negative'} onClick={() => console.log(1)} />
  //       )} />
  //   )
  // })

  useEffect(() => {
    // 수정하기
    if (isEdit) {
      setDate(getStringDate(new Date(parseInt(originData.date))))
      setEmotion(originData.emotion);
      setContent(originData.content)
    }
  }, [isEdit, originData])

  return (
    <div className="DiaryEditor">
     <TitleHeader isEdit={isEdit} onClick={() => navigate(-1)} onDel={handelRemove}/>
      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className="input_box">
            <input className="input_date" value={date} onChange={(e) => setDate(e.target.value)} type='date' />
          </div>
        </section>
        <section>
          <h4>오늘의 감정</h4>
          <div className="input_box emotion_list_wrapper">
            {emotionList.map((it) => <EmotionItem key={it.emotion_id} {...it} onClick={handleClickEmote} isSelected={it.emotion_id === emotion} />)}
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className="input_box text_wrapper">
            <textarea placeholder="오늘은 어땠나요" ref={contentRef} value={content} onChange={(e) => setContent(e.target.value)}></textarea>
          </div>
        </section>
        <section>
          <div className="control_box">
            <BtnCancel />
            <BtnComplete />
          </div>
        </section>
      </div>
    </div>
  )
}

export default DiaryEditor;