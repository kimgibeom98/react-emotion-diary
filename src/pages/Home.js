import { useContext, useEffect, useState } from "react";

import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import { DiaryStateContext } from "../App";

const Home = () => {

  const diarylist = useContext(DiaryStateContext);

  const [data, setData] = useState();
  const [curDate, setCurDate] = useState(new Date());
  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1} 월`
  

  useEffect(()=>{
    const firstDay = new Date(
      curDate.getFullYear(),
      curDate.getMonth(),
      1
    ).getTime();
    
    const lastDay = new Date(
      curDate.getFullYear(),
      curDate.getMonth() + 1,
      0
    ).getTime();

    setData(diarylist.filter((it) => firstDay <= it.data && it.data <= lastDay));
  },[diarylist,curDate])
  
  
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
    <div>
      <MyHeader
        headText={headText}
        leftChild={<MyButton text={'<'} onClick={decreaseMonth} />}
        rightChild={<MyButton text={'>'} onClick={increaseMonth} />} />
    </div>
  )
};

export default Home;