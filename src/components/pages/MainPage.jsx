import ErrorBoundary from "../errorBoundary";
import RandomChar from "../randomChar";
import CharList from "../charList";
import CharInfo from "../charInfo";
import decoration from "../../resources/img/vision.png";
import {useState} from "react";
import FindCharacterForm from "../findCharacterForm/FindCharacterForm";

const MainPage = () => {
  const [charId, setCharId] = useState(null);
  const onChangeId = (id) => {
    setCharId(id);
  }

  return (
    <>
      <ErrorBoundary>
        <RandomChar/>
      </ErrorBoundary>
      <div className="char__content">
        <ErrorBoundary>
          <CharList onChangeId={onChangeId}/>
        </ErrorBoundary>
        <ErrorBoundary>
          <div>
            <CharInfo charId={charId}/>
            <FindCharacterForm/>
          </div>
        </ErrorBoundary>
      </div>
      <img className="bg-decoration" src={decoration} alt="vision"/>
    </>
  )
}

export default MainPage;
