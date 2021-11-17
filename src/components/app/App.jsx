import {Route, Routes} from "react-router-dom";
import AppHeader from "../appHeader";
import {Suspense, lazy} from "react";
import Spinner from "../spiner";

const Page404 = lazy(() => import('../pages/404'));
const Comics = lazy(() => import('../pages/Comics'));
const MainPage = lazy(() => import('../pages/MainPage'));
const SingleComicPage = lazy(() => import('../pages/singleComicPage'));

const App = () => {

  return (
    <div className="app">
      <AppHeader/>
      <main>
        <Suspense fallback={<Spinner/>}>
          <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="/comics" element={<Comics/>}/>
            <Route path="/comics/:comicId" element={<SingleComicPage/>}/>
            <Route path="*" element={<Page404/>}/>
          </Routes>
        </Suspense>
      </main>
    </div>
  )
}

export default App;
