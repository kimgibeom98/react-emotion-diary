import React from "react";

interface IteomInfo {
  emotion_id: number;
  emotion_img: string
  emotion_descript: String;
  onClick(emotion: number): void;
  isSelected: boolean;
}

const EmotionItem = ({ emotion_id, emotion_img, emotion_descript, onClick, isSelected }: IteomInfo) => {
  return (
    <div onClick={() => onClick(emotion_id)} className={["EmotionItem",
      isSelected ? `EmotionItem_on${emotion_id}` : `EmotionItem_off`].join(" ")}>
      <img src={emotion_img} alt="감정 이미지" />
      <span>{emotion_descript}</span>
    </div>
  )
};

export default React.memo(EmotionItem);