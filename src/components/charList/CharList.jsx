import './charList.scss';
import {useEffect, useState} from "react";
import {MarvelService} from "../../services/MarvelService";
import CharItem from "./charItem";
import ErrorMessage from "../errorMessage";
import Spinner from "../spiner";

const CharList = (props) => {
  const [chars, setChars] = useState(new Array(9).fill(undefined));
  const [firstBoot, setFirstBoot] = useState(true);
  const [loaded, setLoaded] = useState(true);
  const [error, setError] = useState(false);
  const [offset, setOffset] = useState(210);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [ending, setEnding] = useState(false);

  const marvelService = new MarvelService();

  const onError = () => {
    setLoaded(false);
    setError(true);
  }

  const updateChars = () => {
    onLoadingChars();
  }

  const onLoadingChars = (offset) => {
    if (offset > 1556) {
      setEnding(true);
    }
    marvelService
      .getAllCharacters(offset)
      .then(onLoadedChars)
      .catch(onError);
  }

  const onChangeLoadingBtn = () => {
    setLoadingBtn(true);
  }

  const onLoadedChars = (newChars) => {
    // при первой загрузке переписываем array chars
    if(firstBoot) {
      setChars(newChars);
      setLoaded(false);
      setError(false);
      setFirstBoot(false);
    } else {
      setChars(chars => [...chars, ...newChars]);
      setOffset(offset => offset + 9);
      setLoaded(false);
      setLoadingBtn(false);
    }
  }

  useEffect(() => {
    updateChars();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const charItem = chars.map((char, index) => {
    if(char) {
      return (
        <CharItem name={char.name}
                  thumbnail={char.thumbnail}
                  key={char.id}
                  id={char.id}
                  onChangeId={props.onChangeId}
        />
      )
    } else {
      return (
        <ViewAlt loaded={loaded} error={error} key={index}/>
      )
    }
  });

  return (
    <div className="char__list">
      <ul className="char__grid">
        {charItem}
      </ul>
      <button className="button button__main button__long"
      onClick={() => {
        onLoadingChars(offset + 9);
        onChangeLoadingBtn();
      }}
      disabled={loadingBtn}
      style={ending ? {display: 'none'} : {display: 'block'}}>
        <div className="inner">{loadingBtn ? 'loading ...' : 'load more'}</div>
      </button>
    </div>
  )

}

const ViewAlt = ({error, loaded}) => {
  const errorMessage = error ? <ErrorChar/> : null;
  const spiner = loaded ? <SpinnerChar/> : null;

  return (
    <>
      {errorMessage}
      {spiner}
    </>
  )
};

const ErrorChar = () => {
  return (
    <li className="char__item" style={{backgroundColor: 'white'}}>
      <ErrorMessage style={{height: '100%', objectFit: 'cover', margin: '0 auto'}}/>
    </li>
  )
}

const SpinnerChar = () => {
  return (
    <Spinner/>
  )
}

export default CharList;
