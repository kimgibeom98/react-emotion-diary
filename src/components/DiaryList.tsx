import React, { useCallback, useState } from "react"
import { useNavigate } from "react-router-dom";

import DiaryItem from "./DiaryItem";
import CustomButton from "./CustomButton";
import { DataInfo } from '../interfaces/Userinterface'

const sortOptionList = [
  { value: "lastest", name: "최신순" },
  { value: "oldest", name: "오래된 순" }
];

const filterOptionList = [
  { value: "all", name: "전부다" },
  { value: "good", name: "좋은 감정만" },
  { value: "bad", name: "안좋은 감정만" }
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
    <select className="ControlMenu" value={value} onChange={(e) => onChange(e.target.value)}>
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
  const [filter, setFilter] = useState('all');

  const copyList = diaryList;

  const filterCallBack = (item: DataInfo) => {
    if (filter === 'good') {
      return Number(item.emotion) <= 3;
    } else {
      return Number(item.emotion) > 3;
    }
  };

  const compare = (a: DataInfo, b: DataInfo) => {
    if (sortType === "lastest") {
      return Number(b.date) - Number(a.date);
    } else {
      return Number(a.date) - Number(b.date);
    }
  };

  const diaryListFilter = filter === 'all'
    ? copyList
    : copyList.filter((it) => filterCallBack(it))

  const listSort = diaryListFilter.sort(compare);

  return (
    <section className="DiaryList">
      <article className="munu_wrapper">
        <div className="left_col">
          <ControlMenu value={sortType} onChange={setSortType} optionList={sortOptionList} />
          <ControlMenu value={filter} onChange={setFilter} optionList={filterOptionList} />
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