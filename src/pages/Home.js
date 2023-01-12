import { useContext, useEffect, useState } from "react";

import CustomHeader from "../components/CustomHeader";
import CustomButton from "../components/CustomButton";
import DiaryList from "../components/DiaryList";

import { DiaryStateContext } from "../App";

const Home = () => {

  const diarylist = useContext(DiaryStateContext);
  const [data, setData] = useState([]);
  const [curDate, setCurDate] = useState(new Date());
  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1} 월`

  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.textContent = `감정 일기장`;
  }, []);

  useEffect(() => {
    if (diarylist.length >= 1) {
      const firstDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1
      ).getTime();

      const lastDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0,
        23,
        59,
        59
      ).getTime();
      setData(diarylist.filter((it) => firstDay <= it.date && it.date <= lastDay));
    }
  }, [diarylist, curDate]);

  const increaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())
    );
  };

  const decreaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())
    );
  };

  return (
    <>
      <CustomHeader headText={headText} leftChild={<CustomButton onClick={decreaseMonth}>{'<'}</CustomButton>}
        rightChild={<CustomButton onClick={increaseMonth}>{'>'}</CustomButton>} />
      <DiaryList diaryList={data} />
    </>
  )
};

export default Home;