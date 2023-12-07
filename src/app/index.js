import {useCallback, useContext, useEffect, useState} from 'react';
import Main from "./main";
import Basket from "./basket";
import useStore from "../store/use-store";
import useSelector from "../store/use-selector";
import { Routes, Route, Link } from 'react-router-dom';
import Article from './article';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      {activeModal === 'basket' && <Basket/>}
      <Routes>
        <Route path='/' element={<Main />}/>
        <Route path='/:id' element={<Article />}/>
      </Routes>
    </>
  );
}

export default App;
