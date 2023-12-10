import Main from "./main";
import Basket from "./basket";
import useSelector from "../store/use-selector";
import { Routes, Route } from 'react-router-dom';
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
        <Route path='/article/:id' element={<Article />}/>
      </Routes>
    </>
  );
}

export default App;
