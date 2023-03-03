import React from "react";

interface HeaderType {
  headText: string;
  leftChild: JSX.Element;
  rightChild: JSX.Element;
}

const CustomHeader = ({ headText, leftChild, rightChild }: HeaderType) => {
  return (
    <header>
      <div className="head_btn_left">{leftChild}</div>
      <div className="head_text">{headText}</div>
      <div className="head_btn_right">{rightChild}</div>
    </header>
  )
};

export default React.memo(CustomHeader);