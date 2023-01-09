import React from "react";

import MyButton from "./MyButton";

const CancelButton = ({ handelSubmit }) => {
  return (
    <MyButton text={"작성완료"} type={"positive"} onClick={handelSubmit} />
  );
}

export default React.memo(CancelButton);