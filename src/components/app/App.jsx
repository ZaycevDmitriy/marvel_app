import AppHeader from "../appHeader";
import RandomChar from "../randomChar";
import CharList from "../charList";
import CharInfo from "../charInfo";
import decoration from '../../resources/img/vision.png';
import {useState} from "react";
import ErrorBoundary from "../errorBoundary";

const App = () => {
  const [charId, setCharId] = useState(null);

  const onChangeId = (id) => {
    setCharId(id);
  }


  return (
    <div className="app">
      <AppHeader/>
      <main>
        <ErrorBoundary>
          <RandomChar/>
        </ErrorBoundary>
        <div className="char__content">
          <ErrorBoundary>
            <CharList onChangeId={onChangeId}/>
          </ErrorBoundary>
          <ErrorBoundary>
            <CharInfo charId={charId}/>
          </ErrorBoundary>
        </div>
        <img className="bg-decoration" src={decoration} alt="vision"/>
      </main>
    </div>
  )

}

export default App;
