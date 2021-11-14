import {Route, Routes} from "react-router-dom";
import AppHeader from "../appHeader";
import {Comics, MainPage, Page404, SingleComicPage} from "../pages";

const App = () => {



  return (
    <div className="app">
      <AppHeader/>
      <main>
        <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path="/comics" element={<Comics/>}/>
          <Route path="/comics/:comicId" element={<SingleComicPage/>}/>
          <Route path="*" element={<Page404/>}/>
        </Routes>
      </main>
    </div>
  )

}

export default App;
