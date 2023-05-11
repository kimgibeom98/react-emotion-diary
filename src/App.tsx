import React, { useEffect, useReducer, useRef } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';

import { DataInfo, DataType, DataTarget, FunType } from './interfaces/Userinterface';

const reduce = (state: any, action: DataType | DataTarget) => {

  let newState = [];
  const targetType = (action as DataType);

  switch (action.type) {
    case 'INIT': {
      return targetType.data;
    }
    case 'CREATE': {
      newState = [targetType.data, ...state];
      break;
    }
    case 'REMOVE': {
      newState = state.filter((it: DataInfo) => it.id !== (action as DataTarget).targetId);
      break;
    }
    case "EDIT": {
      newState = state.map((it: DataInfo, index: number) =>
        it.id === targetType.data.id ? { ...targetType.data } : it
      );
      break;
    }
    default:
      return state
  }
  localStorage.setItem('diary', JSON.stringify(newState));
  return newState;
}

export const DiaryStateContext = React.createContext<Array<DataInfo> | null>(null);
export const DiaryDisaptchContext = React.createContext<FunType | null>(null);

function App() {

  const [data, dispatch] = useReducer(reduce, []);
  useEffect(() => {
    const localData = localStorage.getItem('diary')
    if (localData) {
      const diaryList = JSON.parse(localData).sort((a: DataInfo, b: DataInfo) => Number(b.id) - Number(a.id));
      if (diaryList.length >= 1) {
        dataId.current = parseInt(diaryList[0].id) + 1;
        dispatch({ type: 'INIT', data: diaryList });
      }
    }
  }, []);

  const dataId = useRef<number>(1);

  // CREATE
  const onCreate = (content: string, date: string, title: string) => {
    dispatch({
      type: "CREATE", data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        title
      }
    })
    dataId.current += 1;
  };
  // REMOVE
  const onRemove = (targetId: number) => {
    dispatch({ type: "REMOVE", targetId });
  }
  // EDIT
  const onEdit = (targetId: number, date: string, content: string, title: string) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        title
      }
    });
  }

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDisaptchContext.Provider value={{
        onCreate,
        onEdit,
        onRemove,
      }}>
        <BrowserRouter>
          <main className='App'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/new' element={<New />} />
              <Route path='/edit/:id' element={<Edit />} />
              <Route path='/diary/:id' element={<Diary />} />
            </Routes>
          </main>
        </BrowserRouter>
      </DiaryDisaptchContext.Provider>
    </DiaryStateContext.Provider>
  )
};

export default App;
