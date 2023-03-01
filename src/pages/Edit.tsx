import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";

import DiaryEditor from "../components/DiaryEditor";
import {DataInfo} from '../interfaces/Userinterface' 


const Edit = () => {

  const [originData, setOriginData] = useState<DataInfo>();
  const navigate = useNavigate();
  const { id } = useParams();
  const diaryList = useContext(DiaryStateContext) as DataInfo[] | undefined;

  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.textContent = `감정 일기장 - ${id}번 일기 수정`;
  }, [id]);


  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find((it) => it.id.toString() === id) ;
      if (targetDiary) {
        setOriginData(targetDiary);
      } else {
        alert('없는 일기입니다.');
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList, navigate]);

  return (
    <>
      {originData && <DiaryEditor isEdit={true} originData={originData} />}
    </>
  )
};

export default Edit;