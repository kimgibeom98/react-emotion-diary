import React, { useCallback, useState } from "react"
import { useNavigate } from "react-router-dom";

import DiaryItem from "./DiaryItem";
import CustomButton from "./CustomButton";
import { DataInfo } from '../interfaces/Userinterface'

const sortOptionList = [
  { value: "lastest", name: "최신순" },
  { value: "oldest", name: "오래된 순" }
];

interface OptionType {
  value: string;
  name: string;
}

interface SelectType {
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  optionList: Array<OptionType>
}

const ControlMenu = React.memo(({ value, onChange, optionList }: SelectType) => {
  return (
    <select className="control_menu" value={value} onChange={(e) => onChange(e.target.value)}>
      {optionList.map((it, idx) =>
        <option key={idx} value={it.value}>{it.name}</option>)}
    </select>
  );
});

interface ListData {
  diaryList: DataInfo[];
}

const DiaryList = ({ diaryList }: ListData) => {
  const navigate = useNavigate();
  const [sortType, setSortType] = useState('lastest');
  const [searchValue, setSearchvalue] = useState('');
  const copyList = diaryList;


  const compare = (a: DataInfo, b: DataInfo) => {
    if (sortType === "lastest") {
      return Number(b.date) - Number(a.date);
    } else {
      return Number(a.date) - Number(b.date);
    }
  };

  const diaryListFilter = searchValue.length === 0
    ? copyList
    : copyList.filter((it: DataInfo) => it.title.includes(searchValue))

  let listSort = diaryListFilter.sort(compare);

  return (
    <section className="DiaryList">
      <article className="munu_wrapper">
        <div className="left_col">
          <ControlMenu value={sortType} onChange={setSortType} optionList={sortOptionList} />
          <input className="search_input" placeholder="검색" onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => { setSearchvalue(e.currentTarget.value); }} />
        </div>
        <div className="right_col">
          <CustomButton type={'positive'} onClick={useCallback(() => navigate('/new'), [navigate])}>{'새 일기 쓰기'}</CustomButton>
        </div>
      </article>
      {listSort.map((it) => (
        <DiaryItem key={it.id} {...it} />
      ))}
    </section>
  )
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;