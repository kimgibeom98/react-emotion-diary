import React, { useCallback, useState } from "react"
import { useNavigate } from "react-router-dom";

import DiaryItem from "./DiaryItem";
import CustomButton from "./CustomButton";

const sortOptionList = [
  { value: "lastest", name: "최신순" },
  { value: "oldest", name: "오래된 순" }
];

const filterOptionList = [
  { value: "all", name: "전부다" },
  { value: "good", name: "좋은 감정만" },
  { value: "bad", name: "안좋은 감정만" }
]

const ControlMenu = React.memo(({ value, onChange, optionList }) => {
  return (
    <select className="ControlMenu" value={value} onChange={(e) => onChange(e.target.value)}>
      {optionList.map((it, idx) =>
        <option key={idx} value={it.value}>{it.name}</option>)}
    </select>
  );
});

const DiaryList = ({ diaryList }) => {
  const navigate = useNavigate();
  const [sortType, setSortType] = useState('lastest');
  const [filter, setFilter] = useState('all');

  const copyList = diaryList;

  const filterCallBack = (item) => {
    if (filter === 'good') {
      return parseInt(item.emotion) <= 3;
    } else {
      return parseInt(item.emotion) > 3;
    }
  };

  const compare = (a, b) => {
    if (sortType === "lastest") {
      return parseInt(b.date) - parseInt(a.date);
    } else {
      return parseInt(a.date) - parseInt(b.date);
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