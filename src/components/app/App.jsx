import {Route, Routes} from "react-router-dom";
import AppHeader from "../appHeader";
import {Suspense, lazy} from "react";
import Spinner from "../spiner";

const Page404 = lazy(() => import('../pages/404'));
const Comics = lazy(() => import('../pages/Comics'));
const MainPage = lazy(() => import('../pages/MainPage'));
const SingleComicPage = lazy(() => import('../pages/singleComicPage'));
const SinglePage = lazy(() => import('../pages/SinglePage'));
const SingleCharacterPage = lazy(() => import('../pages/singleCharacterPage'));

const App = () => {

  return (
    <div className="app">
      <AppHeader/>
      <main>
        <Suspense fallback={<Spinner/>}>
          <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="/comics" element={<Comics/>}/>
            <Route path="/comics/:id" element={<SinglePage Component={SingleComicPage} dataPach="comic"/>}/>
            <Route path="/character/:id" element={<SinglePage Component={SingleCharacterPage} dataPach="character"/>}/>
            <Route path="*" element={<Page404/>}/>
          </Routes>
        </Suspense>
      </main>
    </div>
  )
}

export default App;
