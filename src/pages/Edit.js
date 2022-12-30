import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";

const Edit = () => {
  const [originData, setOriginData] = useState();
  const navigate = useNavigate();
  const { id } = useParams();
  const diaryList = useContext(DiaryStateContext);

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find((it) => parseInt(it.id) === parseInt(id))
      
      if(targetDiary){

      }else{
        navigate("/",{replace:true})
      }
    }
  }, [id, diaryList])

  return (
    <div>
      <h2>sdf</h2>
    </div>
  )
};

export default Edit;