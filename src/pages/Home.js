import { useContext, useEffect, useState } from "react";

import MyHeader from "../components/MyHeader";
import CustomButton from "../components/CustomButton";
import { DiaryStateContext } from "../App";
import DiaryList from "../components/DiaryList";

const Home = () => {

  const diarylist = useContext(DiaryStateContext);
  const [data, setData] = useState([]);
  const [curDate, setCurDate] = useState(new Date());
  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1} 월`

  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `감정 일기장`;
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
  }, [diarylist, curDate])

  const increaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())
    );
  }

  const decreaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())
    )
  }

  return (
    <>
      <MyHeader headText={headText} leftChild={<CustomButton onClick={decreaseMonth}>{'<'}</CustomButton>}
        rightChild={<CustomButton onClick={increaseMonth}>{'>'}</CustomButton>} />
      <DiaryList diaryList={data} />
    </>
  )
};

export default Home;