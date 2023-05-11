import { useEffect } from "react";
import DiaryEditor from "../components/DiaryEditor";

const New = () => {
  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.textContent = `Simple Diary - 새 일기`;
  }, []);

  return (
    <>
      <DiaryEditor isEdit={undefined} originData={undefined} />
    </>
  )
};

export default New;