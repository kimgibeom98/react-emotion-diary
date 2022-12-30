import React, { useReducer, useRef } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';


const reduce = (state, action) => {
  let newState = [];
  switch (action.type) {
    case 'INIT': {
      return action.data;
    }
    case 'CREATE': {
      newState = [action.data, ...state]
      break;
    }
    case 'REMOVE': {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case "EDIT": {
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      );
      break;
    }
    default:
      return state
  }
  return newState;
}


export const DiaryStateContext = React.createContext();
export const DiaryDisaptchContext = React.createContext();

const dummyData = [
  {
    id : 1,
    emotion : 1,
    content: "오늘의 일기 1번",
    date : 1671542805931
  },
  {
    id : 2,
    emotion : 2,
    content: "오늘의 일기 2번",
    date : 1671542805932
  },
  {
    id : 3,
    emotion : 3,
    content: "오늘의 일기 3번",
    date : 1671542805933
  }
  ,
  {
    id : 4,
    emotion : 4,
    content: "오늘의 일기4번",
    date : 1671542805934
  }
  ,
  {
    id : 5,
    emotion : 5,
    content: "오늘의 일기 5번",
    date : 1671542805935
  }
]



function App() {
  const [data, dispatch] = useReducer(reduce, dummyData);

  const dataId = useRef(0);
  // CREATE
  const onCreate = (emotion, content, date) => {
    dispatch({
      type: "CREATE", data: {
        id: dataId.current,
        emotion,
        content,
        date: new Date(date).getTime()
      }
    })
    dataId.current += 1;
  };
  // REMOVE
  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  }
  // EDIT
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion
      }
    })
  }

  console.log(data)

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDisaptchContext.Provider value={{
        onCreate,
        onEdit,
        onRemove,
      }}>
        <BrowserRouter>
          <div className='App'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/new' element={<New />} />
              <Route path='/edit/:id' element={<Edit />} />
              <Route path='/diary/:id' element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDisaptchContext.Provider>
    </DiaryStateContext.Provider>
  )
}

export default App;
